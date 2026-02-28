"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ACTIONS = ["Stay Out", "Pit This Lap", "Pit Next Lap"] as const;

interface InteractionPanelProps {
  /** When true, show the decision buttons (e.g. when scenario involves pit decision) */
  showActions: boolean;
  onAction: (action: string) => void;
  disabled?: boolean;
  className?: string;
}

export function InteractionPanel({
  showActions,
  onAction,
  disabled = false,
  className,
}: InteractionPanelProps) {
  if (!showActions) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 p-4 bg-williams-navy/60 border-t border-williams-blue/20",
        className
      )}
    >
      {ACTIONS.map((action) => (
        <motion.button
          key={action}
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAction(action)}
          disabled={disabled}
          className={cn(
            "rounded-lg border px-5 py-2.5 text-sm font-orbitron transition-colors",
            "border-williams-blue/40 bg-williams-navy/80 text-white",
            "hover:bg-williams-blue/20 hover:border-williams-blue/60",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
        >
          {action}
        </motion.button>
      ))}
    </motion.div>
  );
}
