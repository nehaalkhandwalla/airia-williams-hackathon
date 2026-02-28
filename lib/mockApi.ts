import type { StrategyResponse, PitCrewState } from "./types";

/** Mock scenarios for demo when backend is unavailable */
const MOCK_SCENARIOS: StrategyResponse[] = [
  {
    scenario_id: "1",
    lap: 12,
    event: "Safety car deployed",
    strategy_recommendation: "Stay out – track position",
    reasoning: "We're in a strong position. Pitting now would lose places.",
    radio_message: "Safety car. Stay out. Maintain gap.",
    pit_crew_state: "Monitoring",
  },
  {
    scenario_id: "2",
    lap: 18,
    event: "Tyre degradation increasing",
    strategy_recommendation: "Box this lap",
    reasoning: "Undercut opportunity against car ahead.",
    radio_message: "Box box. Push in lap.",
    pit_crew_state: "PreparePitStop",
  },
  {
    scenario_id: "3",
    lap: 19,
    event: "Pit stop window open",
    strategy_recommendation: "Pit next lap",
    reasoning: "Clear air after stop. Optimal window.",
    radio_message: "Box next lap. Prepare tyres.",
    pit_crew_state: "CrewReady",
  },
  {
    scenario_id: "4",
    lap: 24,
    event: "Virtual safety car",
    strategy_recommendation: "Box this lap",
    reasoning: "VSC gives cheap pit stop. Take it.",
    radio_message: "VSC. Box box box.",
    pit_crew_state: "CrewReady",
  },
  {
    scenario_id: "5",
    lap: 31,
    event: "Stable stint – managing pace",
    strategy_recommendation: "Stay out",
    reasoning: "Tyres in good shape. No need to pit yet.",
    radio_message: "Staying out. Manage tyres.",
    pit_crew_state: "Monitoring",
  },
];

let mockIndex = 0;

/**
 * Returns the next mock scenario in sequence (cycles through MOCK_SCENARIOS).
 * Simulates API delay with a short timeout.
 */
export function getMockStrategy(): Promise<StrategyResponse> {
  return new Promise((resolve) => {
    const scenario = MOCK_SCENARIOS[mockIndex % MOCK_SCENARIOS.length];
    mockIndex += 1;
    setTimeout(() => resolve({ ...scenario }), 400);
  });
}

/**
 * Returns a mock scenario with a specific pit crew state (for testing UI).
 */
export function getMockStrategyWithState(
  pit_crew_state: PitCrewState
): Promise<StrategyResponse> {
  const base = MOCK_SCENARIOS[0];
  return Promise.resolve({
    ...base,
    scenario_id: `mock-${Date.now()}`,
    pit_crew_state,
  });
}

export { MOCK_SCENARIOS };
