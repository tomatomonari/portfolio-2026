"use client";

import { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  icon?: ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  icon,
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("w-full px-[19px] lg:px-10 flex justify-between items-end mb-10 md:mb-4", className)}>
      {/* Left: Title Pill */}
      <div
        className={cn(
          "inline-flex items-center gap-2",
          "bg-white/80 backdrop-blur-sm",
          "px-4 py-2.5 md:px-5 md:py-2.5",
          "rounded-full",
          "border border-slate-100"
        )}
      >
        {/* Icon - smaller on mobile */}
        <span className="text-slate-600 [&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-8 md:[&>svg]:h-8">
          {icon || <Layers className="w-5 h-5 md:w-8 md:h-8" />}
        </span>
        {/* Title - not bold on mobile, smaller text */}
        <span className="text-base md:text-2xl font-medium md:font-bold text-slate-800 tracking-wide">
          {title}
        </span>
      </div>

      {/* Right: Nav Pill - Combined prev/next buttons in one container */}
      <div className="flex items-center bg-white/80 backdrop-blur-md rounded-full border border-slate-200/50 p-1 md:p-1.5 gap-2 md:gap-1">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          className={cn(
            "group flex items-center justify-center",
            "w-10 h-10 md:w-10 md:h-10 rounded-full",
            "bg-violet-100 hover:bg-[#8B5CF6]",
            "transition-all duration-300",
            canPrev ? "opacity-100" : "opacity-30 pointer-events-none"
          )}
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 md:w-5 md:h-5 text-slate-600 group-hover:text-white transition-colors duration-300" />
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          className={cn(
            "group flex items-center justify-center",
            "w-10 h-10 md:w-10 md:h-10 rounded-full",
            "bg-violet-100 hover:bg-[#8B5CF6]",
            "transition-all duration-300",
            canNext ? "opacity-100" : "opacity-30 pointer-events-none"
          )}
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 md:w-5 md:h-5 text-slate-600 group-hover:text-white transition-colors duration-300" />
        </button>
      </div>
    </div>
  );
}
