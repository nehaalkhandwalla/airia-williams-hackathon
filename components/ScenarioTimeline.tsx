"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { StrategyScenario } from "@/lib/types";

interface ScenarioTimelineProps {
  scenarios: StrategyScenario[];
  currentScenarioId: string | null;
  className?: string;
}

export function ScenarioTimeline({
  scenarios,
  currentScenarioId,
  className,
}: ScenarioTimelineProps) {
  const listRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to bottom when new scenario added
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [scenarios.length]);

  return (
    <div
      ref={listRef}
      className={cn(
        "flex flex-col gap-2 overflow-y-auto max-h-full pr-1",
        className
      )}
    >
      <p className="text-xs font-inter text-status-neutral uppercase tracking-wider mb-2 sticky top-0 bg-williams-dark/90 backdrop-blur-sm py-1 z-10">
        Race timeline
      </p>
      <AnimatePresence mode="popLayout">
        {scenarios.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-inter text-status-neutral/80"
          >
            No scenarios yet. Start simulation.
          </motion.p>
        ) : (
          scenarios.map((s) => {
            const isCurrent = s.scenario_id === currentScenarioId;
            return (
              <motion.div
                key={s.scenario_id}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "rounded-lg border p-3 transition-colors",
                  isCurrent
                    ? "border-williams-blue/50 bg-williams-blue/10"
                    : "border-williams-blue/20 bg-williams-navy/40"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-orbitron text-williams-blue text-xs">
                    LAP {s.lap}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] font-inter text-williams-blue uppercase">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs font-inter text-white/90 line-clamp-2">
                  {s.event}
                </p>
                <p className="text-[11px] font-inter text-status-neutral mt-1">
                  {s.strategy_recommendation}
                </p>
              </motion.div>
            );
          })
        )}
      </AnimatePresence>
    </div>
  );
}
