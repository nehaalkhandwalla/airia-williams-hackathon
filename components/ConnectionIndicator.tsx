"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ConnectionStatus } from "@/lib/types";

const statusConfig: Record<
  ConnectionStatus,
  { label: string; color: string; pulse: boolean }
> = {
  connected: {
    label: "Connected",
    color: "bg-status-success",
    pulse: false,
  },
  connecting: {
    label: "Connecting",
    color: "bg-status-warning",
    pulse: true,
  },
  offline: {
    label: "Offline",
    color: "bg-status-neutral",
    pulse: false,
  },
};

interface ConnectionIndicatorProps {
  status: ConnectionStatus;
  className?: string;
}

export function ConnectionIndicator({ status, className }: ConnectionIndicatorProps) {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-1.5 bg-williams-navy/80 border border-williams-blue/20",
        className
      )}
    >
      <motion.span
        className={cn("h-2 w-2 rounded-full", config.color)}
        animate={config.pulse ? { opacity: [1, 0.4, 1] } : {}}
        transition={{ duration: 1.2, repeat: config.pulse ? Infinity : 0 }}
      />
      <span className="text-xs font-inter text-status-neutral">{config.label}</span>
    </div>
  );
}
