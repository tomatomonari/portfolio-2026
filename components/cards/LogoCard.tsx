"use client";

import { useRef, useState, useEffect } from "react";
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

interface LogoCardProps {
  title: string;
  school: string;
  year: string;
  logo?: string;
  invertLogo?: boolean;
  logoLarge?: boolean;
  className?: string;
  color?: CardColor;
}

// Color configurations for each variant
const colorConfig: Record<CardColor, { bg: string; text: string; textSecondary: string; badge: string }> = {
  white: {
    bg: "bg-white",
    text: "text-slate-900",
    textSecondary: "text-slate-600",
    badge: "bg-slate-100 text-slate-600",
  },
  arkansas: {
    bg: "bg-[#9D2235]",
    text: "text-white",
    textSecondary: "text-red-100",
    badge: "bg-red-800 text-red-100",
  },
  dschool: {
    bg: "bg-[#E85D25]",
    text: "text-white",
    textSecondary: "text-orange-100",
    badge: "bg-orange-700 text-orange-100",
  },
  blue: {
    bg: "bg-blue-500",
    text: "text-white",
    textSecondary: "text-blue-100",
    badge: "bg-blue-400 text-blue-950",
  },
  green: {
    bg: "bg-emerald-500",
    text: "text-emerald-950",
    textSecondary: "text-emerald-800",
    badge: "bg-emerald-400 text-emerald-950",
  },
  purple: {
    bg: "bg-purple-600",
    text: "text-white",
    textSecondary: "text-purple-200",
    badge: "bg-purple-400 text-purple-950",
  },
  cyan: {
    bg: "bg-cyan-300",
    text: "text-cyan-950",
    textSecondary: "text-cyan-800",
    badge: "bg-cyan-200 text-cyan-900",
  },
  gray: {
    bg: "bg-[#1a1a1a]",
    text: "text-white",
    textSecondary: "text-slate-300",
    badge: "bg-slate-600 text-slate-200",
  },
};

// "Under-Damped" Spring Config - allows triple-bounce (Push -> Snap Back -> Mini-Rebound)
const slideSpringConfig = {
  mass: 1,         // Standard weight
  stiffness: 120,  // High tension for speed
  damping: 8,      // Low friction allows 3rd oscillation (the mini-rebound)
};

export function LogoCard({
  title,
  school,
  year,
  logo,
  invertLogo = false,
  logoLarge = false,
  className,
  color = "white",
}: LogoCardProps) {
  const colors = colorConfig[color];
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Spring-smoothed position values for planar "slide" effect
  const x = useSpring(0, slideSpringConfig);
  const y = useSpring(0, slideSpringConfig);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const nudgeX = -((e.clientX - rect.left - rect.width / 2) / 16);
    const nudgeY = -((e.clientY - rect.top - rect.height / 2) / 16);

    x.set(nudgeX);
    y.set(nudgeY);

    setTimeout(() => {
      x.set(0);
      y.set(0);
    }, 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const motionStyle = { x, y };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative flex flex-col rounded-card overflow-hidden",
        "shadow-md",
        "w-[calc(100vw-38px)] aspect-[3/4]",
        "md:w-[430px] md:h-[573px]",
        colors.bg,
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={motionStyle}
    >
      {/* Top: Year badge, then Title */}
      <div className="p-6 md:p-8 lg:p-10 pt-5 md:pt-6 lg:pt-8 pb-0 md:pb-0 lg:pb-0">
        <span className="inline-block px-3 py-1.5 text-sm font-medium rounded-full mb-4 bg-white/20 text-white backdrop-blur-sm">
          {year}
        </span>
        <h3 className={cn("text-2xl md:text-3xl font-bold mb-1", colors.text)}>
          {title}
        </h3>
        <p className={cn("text-base md:text-lg font-medium", colors.textSecondary)}>
          {school}
        </p>
      </div>

      {/* Centered logo */}
      {logo && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className={cn(
            "relative",
            logoLarge ? "w-56 h-56 md:w-60 md:h-60" : "w-48 h-48 md:w-52 md:h-52"
          )}>
            <Image
              src={logo}
              alt={`${school} logo`}
              fill
              className={cn(
                "object-contain transition-all duration-300",
                isHovered || isMobile ? "opacity-100" : "opacity-25"
              )}
              style={{
                filter: invertLogo ? "brightness(0) invert(1)" : undefined,
              }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
