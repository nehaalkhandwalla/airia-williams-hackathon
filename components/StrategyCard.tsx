"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RadioMessage } from "./RadioMessage";
import { PitCrewStatus } from "./PitCrewStatus";
import type { StrategyScenario } from "@/lib/types";

interface StrategyCardProps {
  scenario: StrategyScenario | null;
  className?: string;
}

export function StrategyCard({ scenario, className }: StrategyCardProps) {
  if (!scenario) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "glass-panel p-6 md:p-8 flex flex-col items-center justify-center min-h-[320px] text-status-neutral",
          className
        )}
      >
        <p className="font-inter text-sm">Waiting for strategy update…</p>
        <p className="font-inter text-xs mt-2">Start the simulation to see live scenarios.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={scenario.scenario_id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn("glass-panel p-6 md:p-8 space-y-5", className)}
    >
      {/* Lap & event */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="font-orbitron text-williams-blue text-lg md:text-xl">
          LAP {scenario.lap}
        </span>
        <span className="font-inter text-sm text-status-neutral">
          {scenario.event}
        </span>
      </div>

      {/* Recommendation */}
      <div>
        <p className="text-xs font-inter text-status-neutral uppercase tracking-wider mb-1">
          Strategy recommendation
        </p>
        <p className="font-orbitron text-white text-xl md:text-2xl">
          {scenario.strategy_recommendation}
        </p>
      </div>

      {/* Reasoning */}
      <div>
        <p className="text-xs font-inter text-status-neutral uppercase tracking-wider mb-1">
          Reasoning
        </p>
        <p className="font-inter text-sm text-white/90 leading-relaxed">
          {scenario.reasoning}
        </p>
      </div>

      {/* Radio message */}
      <RadioMessage message={scenario.radio_message} />

      {/* Pit crew state */}
      <PitCrewStatus state={scenario.pit_crew_state} />
    </motion.div>
  );
}
