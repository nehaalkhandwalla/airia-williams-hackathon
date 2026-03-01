import { create } from "zustand";
import type {
  StrategyScenario,
  FanKnowledgeLevel,
  PitCrewState,
  ConnectionStatus,
} from "@/lib/types";
import { fetchStrategy } from "@/lib/api";
import { getMockStrategy, resetMockSimulation } from "@/lib/mockApi";

const POLL_INTERVAL_MS = 5000;
const USE_MOCK =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_USE_MOCK === "true"
    : true;

interface RaceState {
  scenarios: StrategyScenario[];
  currentScenario: StrategyScenario | null;
  connectionStatus: ConnectionStatus;
  fanKnowledgeLevel: FanKnowledgeLevel;
  pitCrewState: PitCrewState;
  isLoading: boolean;
  simulationInterval: ReturnType<typeof setInterval> | null;
}

interface RaceActions {
  fetchNextScenario: (decision?: string) => Promise<void>;
  startSimulation: () => Promise<void>;
  stopSimulation: () => void;
  setKnowledgeLevel: (level: FanKnowledgeLevel) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
}

export const useRaceStore = create<RaceState & RaceActions>((set, get) => ({
  scenarios: [],
  currentScenario: null,
  connectionStatus: "offline",
  fanKnowledgeLevel: "Beginner",
  pitCrewState: "Monitoring",
  isLoading: false,
  simulationInterval: null,

  setKnowledgeLevel: (level) => set({ fanKnowledgeLevel: level }),

  setConnectionStatus: (status) => set({ connectionStatus: status }),

  fetchNextScenario: async (decision?: string) => {
    const { fanKnowledgeLevel } = get();
    set({ isLoading: true });
    try {
      const response = USE_MOCK
        ? await getMockStrategy()
        : await fetchStrategy(fanKnowledgeLevel, decision);

      const scenario: StrategyScenario = {
        scenario_id: response.scenario_id,
        lap: response.lap,
        event: response.event,
        strategy_recommendation: response.strategy_recommendation,
        reasoning: response.reasoning,
        radio_message: response.radio_message,
        pit_crew_state: response.pit_crew_state,
      };

      set((state) => ({
        scenarios: [...state.scenarios, scenario],
        currentScenario: scenario,
        pitCrewState: response.pit_crew_state,
        isLoading: false,
      }));
    } catch {
      set({ isLoading: false });
    }
  },

  startSimulation: async () => {
    const { simulationInterval, fetchNextScenario } = get();
    if (simulationInterval) clearInterval(simulationInterval);

    if (USE_MOCK) resetMockSimulation();

    set({ connectionStatus: "connecting" });
    await fetchNextScenario();
    set({ connectionStatus: "connected" });

    const interval = setInterval(async () => {
      await get().fetchNextScenario();
    }, POLL_INTERVAL_MS);
    set({ simulationInterval: interval });
  },

  stopSimulation: () => {
    const interval = get().simulationInterval;
    if (interval) {
      clearInterval(interval);
      set({ simulationInterval: null });
    }
    set({ connectionStatus: "offline" });
  },
}));
