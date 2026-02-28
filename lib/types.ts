/** Fan knowledge level for strategy explanations */
export type FanKnowledgeLevel = "Beginner" | "Intermediate" | "Expert";

/** Pit crew state for visual indicator */
export type PitCrewState = "Monitoring" | "PreparePitStop" | "CrewReady";

/** Connection status for the API/agent */
export type ConnectionStatus = "offline" | "connecting" | "connected";

/** Single strategy scenario from the API */
export interface StrategyScenario {
  scenario_id: string;
  lap: number;
  event: string;
  strategy_recommendation: string;
  reasoning: string;
  radio_message: string;
  pit_crew_state: PitCrewState;
}

/** Request body for POST /api/strategy */
export interface StrategyRequest {
  fan_level: FanKnowledgeLevel;
  /** Optional: user's decision when interacting (Stay Out, Pit This Lap, Pit Next Lap) */
  user_decision?: string;
}

/** Response from the Airia Agent API */
export interface StrategyResponse {
  scenario_id: string;
  lap: number;
  event: string;
  strategy_recommendation: string;
  reasoning: string;
  radio_message: string;
  pit_crew_state: PitCrewState;
}
