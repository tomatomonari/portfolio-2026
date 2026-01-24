"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { cn, springConfig } from "@/lib/utils";

type CardColor =
  | "white"
  | "pink"
  | "blue"
  | "green"
  | "orange"
  | "purple"
  | "cyan"
  | "gray"
  | "cream";

interface ExperienceCardProps {
  title: string;
  role: string;
  date: string;
  description: string;
  link?: string;
  color?: CardColor;
}

// Color configurations for each variant
const colorConfig: Record<CardColor, { bg: string; text: string; textSecondary: string; badge: string; button: string; buttonText: string }> = {
  white: {
    bg: "bg-white",
    text: "text-slate-900",
    textSecondary: "text-slate-600",
    badge: "bg-slate-100 text-slate-600",
    button: "bg-slate-900 text-white",
    buttonText: "text-white",
  },
  pink: {
    bg: "bg-pink-400",
    text: "text-pink-950",
    textSecondary: "text-pink-800",
    badge: "bg-pink-300 text-pink-900",
    button: "bg-pink-900 text-pink-100",
    buttonText: "text-pink-100",
  },
  blue: {
    bg: "bg-blue-500",
    text: "text-white",
    textSecondary: "text-blue-100",
    badge: "bg-blue-400 text-blue-950",
    button: "bg-white text-blue-900",
    buttonText: "text-blue-900",
  },
  green: {
    bg: "bg-emerald-500",
    text: "text-emerald-950",
    textSecondary: "text-emerald-800",
    badge: "bg-emerald-400 text-emerald-950",
    button: "bg-emerald-900 text-emerald-100",
    buttonText: "text-emerald-100",
  },
  orange: {
    bg: "bg-orange-500",
    text: "text-orange-950",
    textSecondary: "text-orange-900",
    badge: "bg-orange-300 text-orange-900",
    button: "bg-orange-900 text-orange-100",
    buttonText: "text-orange-100",
  },
  purple: {
    bg: "bg-purple-600",
    text: "text-white",
    textSecondary: "text-purple-200",
    badge: "bg-purple-400 text-purple-950",
    button: "bg-white text-purple-900",
    buttonText: "text-purple-900",
  },
  cyan: {
    bg: "bg-cyan-300",
    text: "text-cyan-950",
    textSecondary: "text-cyan-800",
    badge: "bg-cyan-200 text-cyan-900",
    button: "bg-cyan-900 text-cyan-100",
    buttonText: "text-cyan-100",
  },
  gray: {
    bg: "bg-slate-700",
    text: "text-white",
    textSecondary: "text-slate-300",
    badge: "bg-slate-600 text-slate-200",
    button: "bg-white text-slate-900",
    buttonText: "text-slate-900",
  },
  cream: {
    bg: "bg-amber-50",
    text: "text-amber-950",
    textSecondary: "text-amber-800",
    badge: "bg-amber-200 text-amber-900",
    button: "bg-amber-900 text-amber-100",
    buttonText: "text-amber-100",
  },
};

// "Under-Damped" Spring Config - allows triple-bounce (Push -> Snap Back -> Mini-Rebound)
const slideSpringConfig = {
  mass: 1,         // Standard weight
  stiffness: 120,  // High tension for speed
  damping: 8,      // Low friction allows 3rd oscillation (the mini-rebound)
};

export function ExperienceCard({
  title,
  role,
  date,
  description,
  link,
  color = "white",
}: ExperienceCardProps) {
  const colors = colorConfig[color];
  const cardRef = useRef<HTMLDivElement | HTMLAnchorElement>(null);

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

  const CardContent = (
    <>
      {/* Inner content wrapper - card moves as one solid unit */}
      <div className="flex flex-col h-full p-6 md:p-8 lg:p-10">
        {/* Date badge */}
        <span className={cn(
          "inline-block self-start px-3 py-1 mb-4 text-sm font-medium rounded-full",
          colors.badge
        )}>
          {date}
        </span>

        {/* Title */}
        <h3 className={cn("text-xl md:text-2xl font-bold mb-1", colors.text)}>
          {title}
        </h3>

        {/* Role */}
        <p className={cn("text-base md:text-lg font-medium mb-4", colors.textSecondary)}>
          {role}
        </p>

        {/* Description - flex-1 to push button to bottom */}
        <p className={cn("flex-1 text-sm md:text-base leading-relaxed", colors.textSecondary)}>
          {description}
        </p>
      </div>

      {/* Read More Button - Pinned bottom-right (outside zoom wrapper) */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20">
        <motion.div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2",
            "rounded-full text-sm font-medium",
            colors.button
          )}
        >
          <span>Read More</span>
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{
              type: "spring",
              ...springConfig,
            }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </>
  );

  // Common props for the card
  const cardClassName = cn(
    "relative flex flex-col rounded-card overflow-hidden",
    colors.bg,
    // Consistent shadow - no hover expansion (strict flatness)
    "shadow-md",
    // Fixed "Portrait" dimensions - Tuned for elegance
    "w-[88vw] h-[460px]", // Mobile
    "md:w-[430px] md:h-[580px]", // Desktop - balanced width & height
    link && "cursor-pointer"
  );

  // Planar movement only - no scale (strict 2D)
  const motionStyle = { x, y };

  if (link) {
    return (
      <motion.a
        ref={cardRef as unknown as React.RefObject<HTMLAnchorElement>}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={motionStyle}
      >
        {CardContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className={cardClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={motionStyle}
    >
      {CardContent}
    </motion.div>
  );
}
