"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RadioMessageProps {
  message: string;
  className?: string;
  /** Optional: play sound when message appears (bonus) */
  withSound?: boolean;
}

export function RadioMessage({
  message,
  className,
  withSound = false,
}: RadioMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-lg border border-williams-blue/30 bg-williams-navy/80 p-4",
        "flex items-start gap-3",
        className
      )}
    >
      {/* Radio waveform visual (bonus) */}
      <div className="flex items-center gap-0.5 shrink-0 mt-0.5">
        {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8].map((h, i) => (
          <motion.span
            key={i}
            className="w-1 rounded-full bg-williams-blue"
            initial={{ height: 4 }}
            animate={{ height: 12 * h }}
            transition={{
              duration: 0.4,
              delay: i * 0.05,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ minHeight: 4 }}
          />
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-inter text-status-neutral uppercase tracking-wider mb-1">
          Team radio
        </p>
        <p className="text-sm font-inter text-white leading-relaxed">
          {message || "—"}
        </p>
      </div>
    </motion.div>
  );
}
