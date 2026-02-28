import axios, { AxiosInstance } from "axios";
import type {
  StrategyRequest,
  StrategyResponse,
  FanKnowledgeLevel,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_STRATEGY_API_URL || "https://api.example.com";

/** Axios instance for strategy API */
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetches the next strategy scenario from the Airia Agent API.
 * POST /api/strategy
 */
export async function fetchStrategy(
  fanLevel: FanKnowledgeLevel,
  userDecision?: string
): Promise<StrategyResponse> {
  const body: StrategyRequest = { fan_level: fanLevel };
  if (userDecision) body.user_decision = userDecision;

  const { data } = await api.post<StrategyResponse>("/api/strategy", body);
  return data;
}

export { api };
