"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PitCrewStatus } from "./PitCrewStatus";
import type { PitCrewState } from "@/lib/types";

interface TelemetryPanelProps {
  pitCrewState: PitCrewState;
  currentPhase?: string;
  tyreState?: string;
  strategyMode?: string;
  className?: string;
}

export function TelemetryPanel({
  pitCrewState,
  currentPhase = "Race",
  tyreState = "—",
  strategyMode = "Live",
  className,
}: TelemetryPanelProps) {
  const rows = [
    { label: "Phase", value: currentPhase },
    { label: "Tyre state", value: tyreState },
    { label: "Strategy mode", value: strategyMode },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn("glass-panel p-4 space-y-4", className)}
    >
      <p className="text-xs font-inter text-status-neutral uppercase tracking-wider">
        Telemetry
      </p>

      <PitCrewStatus state={pitCrewState} />

      <div className="space-y-2">
        {rows.map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between items-center text-sm border-b border-williams-blue/10 pb-2 last:border-0 last:pb-0"
          >
            <span className="font-inter text-status-neutral">{label}</span>
            <span className="font-orbitron text-williams-blue text-xs">
              {value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
