"use client";

import { useRef, ReactNode, Children, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { MobileFanSection } from "./MobileFanSection";
import { SectionHeader } from "./SectionHeader";

interface SectionLayoutProps {
  title: string;
  children: ReactNode;
  mobileFan?: boolean;
  icon?: ReactNode;
  className?: string;
}

// "Premium" Spring Config - fast, tight, responsive
const premiumSpring = {
  type: "spring" as const,
  stiffness: 90,   // Fast movement
  damping: 14,     // Less wobble, clean settle
  mass: 1.0,       // Responsive, not heavy
};

// Card dimensions for offset calculation
const CARD_WIDTH = 450; // Desktop card width
const STEP_OFFSET = 15; // Stepped peek effect
const SCROLL_AMOUNT = 400; // Pixels to scroll per click

// Calculate the "Anchor at Index 1" offset
function getStackedOffset(index: number) {
  const baseOffset = (1 - index) * CARD_WIDTH;
  const stepOffset = index * STEP_OFFSET;
  return baseOffset + stepOffset;
}

export function SectionLayout({
  title,
  children,
  mobileFan = false,
  icon,
  className,
}: SectionLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Late trigger: cards stay stacked until 70% of section is visible
  const isInView = useInView(containerRef, { once: true, amount: 0.7 });

  // Smart scroll state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position and update arrow visibility
  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  // Listen for scroll events and resize
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    checkScroll();
    scrollEl.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      scrollEl.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Scroll handlers
  const scrollPrev = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };

  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  // Use MobileFanSection for sections that want it (Experience, Projects)
  if (mobileFan) {
    return (
      <section className={cn("w-full py-12 md:py-20", className)}>
        <MobileFanSection title={title} icon={icon}>
          {children}
        </MobileFanSection>
      </section>
    );
  }

  // Standard layout with Stepped Stack -> Elastic Spread animation
  const childArray = Children.toArray(children);
  const total = childArray.length;

  return (
    <section
      ref={containerRef}
      className={cn("w-full py-12 md:py-20", className)}
    >
      {/* Control Bar Header with Smart Scroll */}
      <SectionHeader
        title={title}
        icon={icon}
        onPrev={scrollPrev}
        onNext={scrollNext}
        canPrev={canScrollLeft}
        canNext={canScrollRight}
      />

      {/* Cards container - Full-width "Breakout" carousel with aligned padding */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-hide py-12"
        style={{
          // Calculated padding to align cards with the centered header
          // Formula: max(24px, (100vw - 1440px) / 2 + 40px)
          paddingLeft: "max(24px, calc((100vw - 1440px) / 2 + 40px))",
          paddingRight: "max(24px, calc((100vw - 1440px) / 2 + 40px))",
        }}
      >
        <div
          className="flex items-start gap-8"
          style={{ width: "max-content" }}
        >
          {childArray.map((child, index) => {
            // Stacked state: all cards anchor at Index 1's position
            const stackedX = getStackedOffset(index);
            const stackedZIndex = 50 - index; // Index 0 is front (highest z)

            return (
              <motion.div
                key={index}
                className="flex-shrink-0"
                initial={{
                  x: stackedX,
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                }}
                animate={
                  isInView
                    ? {
                        x: 0,
                        rotate: 0,
                        scale: 1,
                        opacity: 1,
                      }
                    : {
                        x: stackedX,
                        rotate: 0,
                        scale: 1,
                        opacity: 1,
                      }
                }
                transition={{
                  ...premiumSpring,
                  delay: index * 0.08,
                }}
                style={{
                  zIndex: isInView ? total - index : stackedZIndex,
                  transformOrigin: "center bottom",
                }}
              >
                {child}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
