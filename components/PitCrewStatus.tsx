"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PitCrewState } from "@/lib/types";

const stateConfig: Record<
  PitCrewState,
  { label: string; color: string; glow: string; animate: TargetAndTransition }
> = {
  Monitoring: {
    label: "Monitoring",
    color: "bg-williams-blue",
    glow: "shadow-glow",
    animate: { opacity: [1, 0.85, 1], transition: { duration: 2, repeat: Infinity } },
  },
  PreparePitStop: {
    label: "Prepare pit",
    color: "bg-status-warning",
    glow: "shadow-glow-warning",
    animate: {
      scale: [1, 1.08, 1],
      transition: { duration: 1.2, repeat: Infinity },
    },
  },
  CrewReady: {
    label: "Crew ready",
    color: "bg-status-success",
    glow: "shadow-glow-success",
    animate: {
      opacity: [1, 0.9, 1],
      transition: { duration: 1, repeat: Infinity },
    },
  },
};

interface PitCrewStatusProps {
  state: PitCrewState;
  className?: string;
}

export function PitCrewStatus({ state, className }: PitCrewStatusProps) {
  const config = stateConfig[state];

  return (
    <motion.div
      className={cn(
        "flex items-center gap-3 rounded-lg border border-williams-blue/20 bg-williams-navy/80 p-3",
        className
      )}
      layout
    >
      <motion.span
        className={cn("h-3 w-3 rounded-full", config.color, config.glow)}
        animate={config.animate}
      />
      <span className="text-sm font-inter text-white">{config.label}</span>
    </motion.div>
  );
}
