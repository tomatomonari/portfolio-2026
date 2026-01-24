"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CardColor =
  | "white"
  | "arkansas"    // University of Arkansas cardinal red
  | "dschool"     // Stanford d.school orange
  | "blue"
  | "green"
  | "purple"
  | "cyan"
  | "gray";

interface EducationCardProps {
  school: string;
  degree: string;
  year: string;
  logo?: string;
  className?: string;
  color?: CardColor;
}

// Color configurations for each variant
const colorConfig: Record<CardColor, { bg: string; text: string; textSecondary: string; badge: string; logoBg: string }> = {
  white: {
    bg: "bg-white",
    text: "text-slate-900",
    textSecondary: "text-slate-600",
    badge: "bg-slate-100 text-slate-600",
    logoBg: "bg-slate-100",
  },
  arkansas: {
    bg: "bg-[#9D2235]",  // Arkansas Cardinal
    text: "text-white",
    textSecondary: "text-red-100",
    badge: "bg-red-800 text-red-100",
    logoBg: "bg-white",
  },
  dschool: {
    bg: "bg-[#E85D25]",  // d.school orange
    text: "text-white",
    textSecondary: "text-orange-100",
    badge: "bg-orange-700 text-orange-100",
    logoBg: "bg-white",
  },
  blue: {
    bg: "bg-blue-500",
    text: "text-white",
    textSecondary: "text-blue-100",
    badge: "bg-blue-400 text-blue-950",
    logoBg: "bg-white",
  },
  green: {
    bg: "bg-emerald-500",
    text: "text-emerald-950",
    textSecondary: "text-emerald-800",
    badge: "bg-emerald-400 text-emerald-950",
    logoBg: "bg-white",
  },
  purple: {
    bg: "bg-purple-600",
    text: "text-white",
    textSecondary: "text-purple-200",
    badge: "bg-purple-400 text-purple-950",
    logoBg: "bg-white",
  },
  cyan: {
    bg: "bg-cyan-300",
    text: "text-cyan-950",
    textSecondary: "text-cyan-800",
    badge: "bg-cyan-200 text-cyan-900",
    logoBg: "bg-white",
  },
  gray: {
    bg: "bg-slate-700",
    text: "text-white",
    textSecondary: "text-slate-300",
    badge: "bg-slate-600 text-slate-200",
    logoBg: "bg-white",
  },
};

// "Under-Damped" Spring Config - allows triple-bounce (Push -> Snap Back -> Mini-Rebound)
const slideSpringConfig = {
  mass: 1,         // Standard weight
  stiffness: 120,  // High tension for speed
  damping: 8,      // Low friction allows 3rd oscillation (the mini-rebound)
};

export function EducationCard({
  school,
  degree,
  year,
  logo,
  className,
  color = "white",
}: EducationCardProps) {
  const colors = colorConfig[color];
  const cardRef = useRef<HTMLDivElement>(null);

  // Spring-smoothed position values for planar "slide" effect
  const x = useSpring(0, slideSpringConfig);
  const y = useSpring(0, slideSpringConfig);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Calculate mouse position relative to card center
    // Divisor of 8 = larger movement range for visible effect
    const nudgeX = -((e.clientX - rect.left - rect.width / 2) / 8);
    const nudgeY = -((e.clientY - rect.top - rect.height / 2) / 8);

    // The "Push" - card slides away from mouse entry point
    x.set(nudgeX);
    y.set(nudgeY);

    // The "Snap Back" - spring physics handle the triple-bounce settle
    setTimeout(() => {
      x.set(0);
      y.set(0);
    }, 100);
  };

  const handleMouseLeave = () => {
    // Safety reset - ensure card returns to resting position
    x.set(0);
    y.set(0);
  };

  // Planar movement only - no scale (strict 2D)
  const motionStyle = { x, y };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "flex flex-col rounded-card p-6 md:p-8 lg:p-10",
        // Consistent shadow - no hover expansion (strict flatness)
        "shadow-md",
        // Fixed "Portrait" dimensions - Tuned for elegance
        "w-[89vw] aspect-[3/4]", // Mobile - 3:4 ratio
        "md:w-[430px] md:h-[573px]", // Desktop - 3:4 ratio (430 × 4/3)
        colors.bg,
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={motionStyle}
    >
      {/* Logo and Year row */}
      <div className="flex items-start justify-between mb-4">
        {logo ? (
          <div className={cn(
            "relative w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden shadow-sm",
            colors.logoBg
          )}>
            <Image
              src={logo}
              alt={`${school} logo`}
              fill
              className="object-contain p-1"
            />
          </div>
        ) : (
          <div className={cn(
            "w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center",
            colors.logoBg
          )}>
            <span className={cn("text-xl md:text-2xl font-bold", colors.textSecondary)}>
              {school.charAt(0)}
            </span>
          </div>
        )}

        {/* Year badge */}
        <span className={cn(
          "inline-block px-3 py-1 text-sm font-medium rounded-full",
          colors.badge
        )}>
          {year}
        </span>
      </div>

      {/* School name */}
      <h3 className={cn("text-lg md:text-xl font-bold mb-2", colors.text)}>
        {school}
      </h3>

      {/* Degree */}
      <p className={cn("text-sm md:text-base leading-relaxed", colors.textSecondary)}>
        {degree}
      </p>
    </motion.div>
  );
}
