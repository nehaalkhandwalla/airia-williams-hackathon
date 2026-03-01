import { NextRequest, NextResponse } from "next/server";
import type { StrategyResponse, PitCrewState } from "@/lib/types";

// Prefer server-only env; fallback to legacy NEXT_PUBLIC_ for the URL only
const AIRIA_PIPELINE_URL =
  process.env.AIRIA_PIPELINE_URL ||
  process.env.NEXT_PUBLIC_STRATEGY_API_URL;
const AIRIA_API_KEY = process.env.AIRIA_API_KEY;

/** Persistent simulation state: first request begins scenarios, subsequent requests advance. */
let simulationStarted = false;

/** Possible shapes of Airia pipeline execution response */
interface AiriaRawResponse {
  output?: string;
  result?: string | Record<string, unknown>;
  message?: string;
  scenario_id?: string;
  lap?: number;
  event?: string;
  strategy_recommendation?: string;
  reasoning?: string;
  radio_message?: string;
  pit_crew_state?: string;
  [key: string]: unknown;
}

let scenarioCounter = 0;

function nextScenarioId(): string {
  scenarioCounter += 1;
  return `airia-${Date.now()}-${scenarioCounter}`;
}

/** Recursively extract payload from nested or stringified JSON. If output is a string, try JSON.parse. */
function extractPayload(raw: unknown): unknown {
  if (raw === null || raw === undefined) return raw;
  if (typeof raw === "string") {
    try {
      return extractPayload(JSON.parse(raw) as unknown);
    } catch {
      return raw;
    }
  }
  if (typeof raw === "object" && raw !== null && "output" in raw) {
    const o = (raw as { output: unknown }).output;
    if (o !== undefined) {
      if (typeof o === "string") {
        try {
          return extractPayload(JSON.parse(o) as unknown);
        } catch {
          return o;
        }
      }
      return extractPayload(o);
    }
  }
  if (typeof raw === "object" && raw !== null && "result" in raw) {
    const r = (raw as { result: unknown }).result;
    if (r !== undefined) return extractPayload(r);
  }
  if (typeof raw === "object" && raw !== null && "data" in raw) {
    const d = (raw as { data: unknown }).data;
    if (d !== undefined) return extractPayload(d);
  }
  return raw;
}

function mapAgentOutputToStrategyResponse(raw: unknown): StrategyResponse {
  const payload = extractPayload(raw);

  if (payload === null || payload === undefined) {
    return defaultScenario("No response from agent.");
  }

  if (typeof payload === "string") {
    return defaultScenario(payload);
  }

  if (typeof payload !== "object") {
    return defaultScenario(String(payload));
  }

  const obj = payload as AiriaRawResponse;

  const text =
    obj.strategy_recommendation ??
    obj.reasoning ??
    obj.output ??
    (typeof obj.result === "string" ? obj.result : null) ??
    obj.message ??
    (typeof obj.result === "object" &&
    obj.result !== null &&
    "output" in obj.result
      ? String((obj.result as { output?: string }).output)
      : null);

  const lap =
    typeof obj.lap === "number" && Number.isFinite(obj.lap) ? obj.lap : 1;
  const event =
    typeof obj.event === "string" && obj.event.trim()
      ? obj.event
      : "Strategy update";
  const scenarioId =
    typeof obj.scenario_id === "string" && obj.scenario_id.trim()
      ? obj.scenario_id
      : nextScenarioId();
  const recommendation =
    typeof obj.strategy_recommendation === "string" &&
    obj.strategy_recommendation.trim()
      ? obj.strategy_recommendation
      : text || "—";
  const reasoning =
    typeof obj.reasoning === "string" && obj.reasoning.trim()
      ? obj.reasoning
      : text && text !== recommendation
        ? text
        : "Agent analysis.";
  const radioMessage =
    typeof obj.radio_message === "string" && obj.radio_message.trim()
      ? obj.radio_message
      : recommendation;
  const pitState = normalizePitCrewState(obj.pit_crew_state);

  return {
    scenario_id: scenarioId,
    lap,
    event,
    strategy_recommendation: recommendation,
    reasoning,
    radio_message: radioMessage,
    pit_crew_state: pitState,
  };
}

function defaultScenario(mainText: string): StrategyResponse {
  return {
    scenario_id: nextScenarioId(),
    lap: 1,
    event: "Strategy update",
    strategy_recommendation: mainText || "—",
    reasoning: mainText || "Agent analysis.",
    radio_message: mainText || "—",
    pit_crew_state: "Monitoring",
  };
}

function normalizePitCrewState(value: unknown): PitCrewState {
  const s = typeof value === "string" && value.trim() ? value.trim() : "";
  if (s === "Monitoring" || s === "PreparePitStop" || s === "CrewReady") {
    return s;
  }
  const lower = s.toLowerCase();
  if (lower.includes("ready") || lower === "crewready") return "CrewReady";
  if (lower.includes("prepare") || lower === "preparepitstop")
    return "PreparePitStop";
  return "Monitoring";
}

export async function POST(request: NextRequest) {
  const missing: string[] = [];
  if (!AIRIA_PIPELINE_URL?.trim())
    missing.push("AIRIA_PIPELINE_URL (or NEXT_PUBLIC_STRATEGY_API_URL)");
  if (!AIRIA_API_KEY?.trim()) missing.push("AIRIA_API_KEY");
  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: "Server misconfiguration: missing env in .env.local",
        missing,
        hint:
          "Add the missing variable(s) to .env.local and restart the dev server. Get AIRIA_API_KEY from Airia Studio → Settings → Interfaces → View API Keys.",
      },
      { status: 500 }
    );
  }

  let body: { fanLevel?: string; decision?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const fanLevel =
    typeof body.fanLevel === "string" && body.fanLevel.trim()
      ? body.fanLevel.trim()
      : "Beginner";
  const decision =
    typeof body.decision === "string" && body.decision.trim()
      ? body.decision.trim()
      : null;

  let userInput: string;
  if (!simulationStarted) {
    userInput = `begin scenarios. Level: ${fanLevel}`;
    simulationStarted = true;
  } else if (decision) {
    userInput = `User decision: ${decision}`;
  } else {
    userInput = "next scenario";
  }

  const airiaBody = {
    userInput,
    asyncOutput: false,
  };

  const pipelineUrl = AIRIA_PIPELINE_URL!.trim();
  const apiKey = AIRIA_API_KEY!.trim();

  console.log("Sending to Airia:", userInput);

  try {
    const res = await fetch(pipelineUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(airiaBody),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `Airia API error: ${res.status}`, details: text },
        { status: 502 }
      );
    }

    const data = (await res.json()) as Record<string, unknown>;

    const tryParse = (val: unknown): unknown => {
      if (typeof val !== "string") return val;
      try {
        return JSON.parse(val) as unknown;
      } catch {
        return val;
      }
    };

    let parsedOutput: unknown;
    const executionOutput = data.executionOutput as Record<string, unknown> | null | undefined;
    if (executionOutput?.result !== undefined && executionOutput !== null) {
      parsedOutput = tryParse(executionOutput.result);
    } else if (data.output !== undefined) {
      parsedOutput = tryParse(data.output);
    } else if (data.result !== undefined) {
      parsedOutput = tryParse(data.result);
    } else {
      parsedOutput = data;
    }

    console.log("Airia raw response:", JSON.stringify(data, null, 2));
    console.log("Parsed output:", parsedOutput);
    return NextResponse.json(parsedOutput);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Failed to call Airia API", details: message },
      { status: 502 }
    );
  }
}
