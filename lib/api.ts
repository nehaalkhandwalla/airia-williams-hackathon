import type { StrategyResponse, FanKnowledgeLevel } from "./types";

/**
 * Fetches the next scenario from the Airia agent via the backend route.
 * Only sends fanLevel and optional decision; the backend builds userInput so the simulation progresses.
 */
export async function fetchStrategy(
  fanLevel: FanKnowledgeLevel,
  decision?: string
): Promise<StrategyResponse> {
  const body: { fanLevel: string; decision?: string } = {
    fanLevel,
  };
  if (decision && decision.trim()) {
    body.decision = decision.trim();
  }

  const res = await fetch("/api/airia", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(
      (err as { error?: string }).error ?? "Failed to fetch strategy"
    );
  }

  return res.json() as Promise<StrategyResponse>;
}
