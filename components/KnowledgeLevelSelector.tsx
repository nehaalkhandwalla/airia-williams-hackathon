"use client";

import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import type { FanKnowledgeLevel } from "@/lib/types";

const LEVELS: FanKnowledgeLevel[] = ["Beginner", "Intermediate", "Expert"];

interface KnowledgeLevelSelectorProps {
  value: FanKnowledgeLevel;
  onChange: (level: FanKnowledgeLevel) => void;
  className?: string;
}

export function KnowledgeLevelSelector({
  value,
  onChange,
  className,
}: KnowledgeLevelSelectorProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center justify-between gap-2 rounded-lg border border-williams-blue/30 bg-williams-navy/80 px-4 py-2 text-sm font-inter text-white hover:bg-williams-blue/10 transition-colors min-w-[160px]",
            className
          )}
        >
          <span>{value}</span>
          <svg
            className="w-4 h-4 text-williams-blue"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
            className="z-50 min-w-[160px] rounded-lg border border-williams-blue/20 bg-williams-navy/95 backdrop-blur-md shadow-xl shadow-black/30 p-1"
            sideOffset={6}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {LEVELS.map((level) => (
              <DropdownMenu.Item
                key={level}
                onSelect={() => {
                  onChange(level);
                  setOpen(false);
                }}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-inter cursor-pointer outline-none transition-colors",
                  value === level
                    ? "bg-williams-blue/20 text-williams-blue"
                    : "text-status-neutral hover:bg-williams-blue/10 hover:text-white"
                )}
              >
                {level}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
