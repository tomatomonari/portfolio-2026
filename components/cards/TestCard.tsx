"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
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
  | "cream"
  | "dark"
  | "indigo";

interface TestCardProps {
  title: string;
  role: string;
  date: string;
  description?: string;
  image?: string;
  imageScale?: number;
  imagePosition?: string;
  imageHeight?: string;
  showWatermark?: boolean;
  yearAlign?: "left" | "right";
  inlineHeader?: boolean;
  watermarkLogo?: string | string[];
  watermarkSize?: number;
  watermarkGap?: string;
  invertWatermark?: boolean;
  watermarkBottom?: string;
  watermarkMobileBottom?: string;
  watermarkRight?: string;
  watermarkMobileSize?: number;
  watermarkMobileRight?: string;
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
    bg: "bg-purple-400",
    text: "text-purple-950",
    textSecondary: "text-purple-800",
    badge: "bg-purple-300 text-purple-900",
    button: "bg-purple-900 text-purple-100",
    buttonText: "text-purple-100",
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
  dark: {
    bg: "bg-[#1c1c1e]",
    text: "text-white",
    textSecondary: "text-neutral-400",
    badge: "bg-neutral-800 text-neutral-300",
    button: "bg-white text-neutral-900",
    buttonText: "text-neutral-900",
  },
  indigo: {
    bg: "bg-indigo-600",
    text: "text-white",
    textSecondary: "text-indigo-100",
    badge: "bg-indigo-400 text-indigo-950",
    button: "bg-white text-indigo-900",
    buttonText: "text-indigo-900",
  },
};

// "Under-Damped" Spring Config - allows triple-bounce (Push -> Snap Back -> Mini-Rebound)
const slideSpringConfig = {
  mass: 1,         // Standard weight
  stiffness: 120,  // High tension for speed
  damping: 8,      // Low friction allows 3rd oscillation (the mini-rebound)
};

export function TestCard({
  title,
  role,
  date,
  description,
  image,
  imageScale,
  imagePosition,
  imageHeight,
  showWatermark = true,
  yearAlign = "left",
  inlineHeader = false,
  watermarkLogo,
  watermarkSize = 150,
  watermarkGap = "-space-x-6",
  invertWatermark = false,
  watermarkBottom,
  watermarkMobileBottom,
  watermarkRight,
  watermarkMobileSize,
  watermarkMobileRight,
  link,
  color = "white",
}: TestCardProps) {
  const colors = colorConfig[color];
  const cardRef = useRef<HTMLDivElement | HTMLAnchorElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const nudgeX = -((e.clientX - rect.left - rect.width / 2) / 16);
    const nudgeY = -((e.clientY - rect.top - rect.height / 2) / 16);

    x.set(nudgeX);
    y.set(nudgeY);
    setIsHovered(true);

    setTimeout(() => {
      x.set(0);
      y.set(0);
    }, 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Extract last 2 digits of year for watermark
  const yearWatermark = date.slice(-2);

  const CardContent = image ? (
    <>
      {/* Image top half — inset with fully rounded corners, anchor top to crop bottom */}
      <div className="relative overflow-hidden m-2" style={{ height: imageHeight || "55%", borderRadius: "10px 10px 40px 40px" }}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          style={{
            objectPosition: imagePosition || "center top",
            transform: imageScale ? `scale(${imageScale})` : undefined,
          }}
        />
      </div>

      {/* Content bottom half */}
      <div className="relative flex flex-col flex-1 px-6 pt-5 pb-6 md:px-8 md:pt-6 md:pb-8">
        {/* Large watermark year */}
        {showWatermark && (
          <span className={cn("absolute top-3 right-6 md:right-8 text-7xl md:text-8xl font-bold leading-none select-none pointer-events-none", color === "white" ? "text-slate-100" : "opacity-15 " + colors.text)}>
            {yearWatermark}
          </span>
        )}

        {/* Watermark logo(s) */}
        {watermarkLogo && (
          <div className={cn("absolute opacity-10 pointer-events-none select-none flex items-center", watermarkGap)} style={{ bottom: (isMobile && watermarkMobileBottom) ? watermarkMobileBottom : (watermarkBottom || "3.5rem"), right: (isMobile && watermarkMobileRight) ? watermarkMobileRight : (watermarkRight || "0.5rem") }}>
            {(Array.isArray(watermarkLogo) ? watermarkLogo : [watermarkLogo]).map((logo, i) => (
              <Image
                key={i}
                src={logo}
                alt=""
                width={(isMobile && watermarkMobileSize) ? watermarkMobileSize : watermarkSize}
                height={(isMobile && watermarkMobileSize) ? watermarkMobileSize : watermarkSize}
                className="object-contain"
                style={invertWatermark ? { filter: "brightness(0)" } : undefined}
              />
            ))}
          </div>
        )}

        {inlineHeader ? (
          /* Inline layout: title+role on left, year on right */
          <div className="flex items-start justify-between mb-auto">
            <div>
              <h3 className={cn("text-2xl md:text-3xl font-bold leading-tight mb-1 relative z-10", colors.text)}>
                {title}
              </h3>
              <p className={cn("text-base", colors.textSecondary)}>
                {role}
              </p>
              {description && (
                <p className={cn("text-sm mt-1 opacity-70 whitespace-pre-line", colors.textSecondary)}>
                  {description}
                </p>
              )}
            </div>
            <span className={cn("text-sm mt-1 flex-shrink-0 ml-4 whitespace-pre-line text-right", colors.textSecondary)}>
              {date}
            </span>
          </div>
        ) : (
          /* Default stacked layout */
          <>
            <span className={cn("text-sm mb-2", colors.textSecondary, yearAlign === "right" && "self-end")}>
              {date}
            </span>
            <h3 className={cn("text-2xl md:text-3xl font-bold leading-tight mb-1 relative z-10", colors.text)}>
              {title}
            </h3>
            <p className={cn("text-base mb-auto", colors.textSecondary)}>
              {role}
            </p>
          </>
        )}

        {/* Read More Button - outlined pill, fills on hover */}
        <div className="mt-4">
          <span className={cn(
            "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all duration-200",
            color === "white"
              ? "border-slate-800 text-slate-800"
              : isHovered
                ? colors.button + " border-transparent"
                : "border-current " + colors.text
          )}>
            Read More
            <span>→</span>
          </span>
        </div>
      </div>
    </>
  ) : (
    <>
      {/* Original layout without image */}
      <div className="flex flex-col h-full p-6 md:p-8 lg:p-10">
        <span className={cn(
          "inline-block self-start px-3 py-1 mb-4 text-sm font-medium rounded-full",
          colors.badge
        )}>
          {date}
        </span>

        <h3 className={cn("text-xl md:text-2xl font-bold mb-1", colors.text)}>
          {title}
        </h3>

        <p className={cn("text-base md:text-lg font-medium mb-4", colors.textSecondary)}>
          {role}
        </p>

        {description && (
          <p className={cn("flex-1 text-sm md:text-base leading-relaxed whitespace-pre-line", colors.textSecondary)}>
            {description}
          </p>
        )}
      </div>

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

  const cardClassName = cn(
    "relative flex flex-col rounded-card overflow-hidden",
    colors.bg,
    "shadow-md",
    "w-[calc(100vw-38px)] aspect-[3/4]",
    "md:w-[430px] md:h-[573px]",
    link && "cursor-pointer"
  );

  const motionStyle = { x, y };

  if (link) {
    const isInternal = link.startsWith("/");
    return (
      <motion.a
        ref={cardRef as unknown as React.RefObject<HTMLAnchorElement>}
        href={link}
        target={isInternal ? undefined : "_blank"}
        rel={isInternal ? undefined : "noopener noreferrer"}
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
