"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRaceStore } from "@/store/useRaceStore";
import { ConnectionIndicator } from "./ConnectionIndicator";
import { KnowledgeLevelSelector } from "./KnowledgeLevelSelector";
import { StrategyCard } from "./StrategyCard";
import { ScenarioTimeline } from "./ScenarioTimeline";
import { TelemetryPanel } from "./TelemetryPanel";
import { InteractionPanel } from "./InteractionPanel";

/** Whether the current scenario typically shows pit decision buttons */
function shouldShowPitActions(
  recommendation: string | undefined
): boolean {
  if (!recommendation) return false;
  const r = recommendation.toLowerCase();
  return (
    r.includes("pit") ||
    r.includes("box") ||
    r.includes("stay out")
  );
}

export function DashboardLayout() {
  const {
    scenarios,
    currentScenario,
    connectionStatus,
    fanKnowledgeLevel,
    pitCrewState,
    isLoading,
    fetchNextScenario,
    startSimulation,
    stopSimulation,
    setKnowledgeLevel,
    setConnectionStatus,
  } = useRaceStore();

  useEffect(() => {
    setConnectionStatus("offline");
  }, [setConnectionStatus]);

  const showPitActions = shouldShowPitActions(
    currentScenario?.strategy_recommendation
  );

  const handleAction = (action: string) => {
    fetchNextScenario(action);
  };

  return (
    <div className="min-h-screen flex flex-col telemetry-bg">
      {/* Top bar */}
      <header className="shrink-0 flex items-center justify-between gap-4 px-4 py-3 border-b border-williams-blue/20 bg-williams-navy/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-williams-blue/20 flex items-center justify-center">
              <span className="font-orbitron text-williams-blue text-sm font-bold">
                W
              </span>
            </div>
            <span className="font-orbitron text-white text-lg md:text-xl">
              Williams Race Strategist
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <KnowledgeLevelSelector
            value={fanKnowledgeLevel}
            onChange={setKnowledgeLevel}
          />
          <ConnectionIndicator status={connectionStatus} />
          {connectionStatus === "offline" ? (
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startSimulation}
              className="rounded-lg bg-williams-blue px-4 py-2 text-sm font-orbitron text-williams-navy hover:bg-williams-light-blue transition-colors"
            >
              Start simulation
            </motion.button>
          ) : (
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={stopSimulation}
              className="rounded-lg border border-status-warning/50 px-4 py-2 text-sm font-orbitron text-status-warning hover:bg-status-warning/10 transition-colors"
            >
              Stop
            </motion.button>
          )}
        </div>
      </header>

      {/* Main content: 3 panels */}
      <main className="flex-1 flex flex-col lg:flex-row gap-4 p-4 min-h-0 overflow-hidden">
        {/* Left: Timeline */}
        <aside className="w-full lg:w-72 shrink-0 glass-panel p-4 overflow-hidden flex flex-col min-h-[200px] lg:min-h-0">
          <ScenarioTimeline
            scenarios={scenarios}
            currentScenarioId={currentScenario?.scenario_id ?? null}
          />
        </aside>

        {/* Center: Strategy card */}
        <section className="flex-1 min-w-0 flex flex-col overflow-auto">
          <StrategyCard scenario={currentScenario} className="flex-1 min-h-0" />
        </section>

        {/* Right: Telemetry */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-4 min-h-0">
          <TelemetryPanel
            pitCrewState={pitCrewState}
            currentPhase="Race"
            tyreState={currentScenario?.event ?? "—"}
            strategyMode="Live"
          />
        </aside>
      </main>

      {/* Bottom: Interaction buttons */}
      <InteractionPanel
        showActions={showPitActions}
        onAction={handleAction}
        disabled={isLoading}
      />

      {/* Loading overlay when fetching */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-williams-dark/40 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="font-orbitron text-williams-blue text-sm">
            Updating strategy…
          </div>
        </motion.div>
      )}
    </div>
  );
}
