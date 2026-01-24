"use client";

import { useRef, Children, ReactNode, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";

interface StackToSpreadSectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
}

// "Premium" Spring Config - fast, tight, responsive
const premiumSpring = {
  type: "spring" as const,
  stiffness: 90,   // Fast movement
  damping: 14,     // Less wobble, clean settle
  mass: 1.0,       // Responsive, not heavy
};

// Card dimensions for offset calculation (Desktop)
const CARD_WIDTH = 450; // Desktop card width
const STEP_OFFSET = 15; // Stepped peek effect
const SCROLL_AMOUNT = 400; // Pixels to scroll per click

// Mobile vertical offset for "Z-Index Stack & Fan" effect
const MOBILE_Y_OFFSET = 120; // How far stack cards start above (behind anchor)

// Spring for mobile fan animation - smooth deck deal
const mobileFanSpring = {
  type: "spring" as const,
  stiffness: 60,   // Smooth reveal
  damping: 15,
};

// Calculate the "Anchor at Index 1" offset (Desktop)
function getStackedOffset(index: number) {
  const baseOffset = (1 - index) * CARD_WIDTH;
  const stepOffset = index * STEP_OFFSET;
  return baseOffset + stepOffset;
}

export function MobileFanSection({
  children,
  className,
  title,
  icon,
}: StackToSpreadSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smart scroll state (Desktop only)
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

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

  const scrollPrev = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };

  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  const childArray = Children.toArray(children);
  const total = childArray.length;

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full py-8 overflow-hidden",
        className
      )}
    >
      {/* Control Bar Header with Smart Scroll */}
      {title && (
        <SectionHeader
          title={title}
          icon={icon}
          onPrev={scrollPrev}
          onNext={scrollNext}
          canPrev={canScrollLeft}
          canNext={canScrollRight}
        />
      )}

      {/* Cards container - Full-width "Breakout" carousel with aligned padding */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-hide py-12"
        style={{
          paddingLeft: "max(24px, calc((100vw - 1440px) / 2 + 40px))",
          paddingRight: "max(24px, calc((100vw - 1440px) / 2 + 40px))",
        }}
      >
        <div
          className="flex items-start gap-8"
          style={{ width: "max-content" }}
        >
          {childArray.map((child, index) => {
            // Desktop: Horizontal stack-to-spread (X offset)
            const stackedX = getStackedOffset(index);
            const stackedZIndex = 50 - index;

            // Mobile: "Phantom Anchor & Fan" effect
            // Index 0 (Anchor): ALWAYS visible and static - never moves or fades
            // Index > 0 (Stack): Start tucked behind anchor, slide DOWN when triggered
            const isAnchor = index === 0;

            // Mobile states - Anchor is ALWAYS visible
            const mobileHidden = isAnchor
              ? { opacity: 1, y: 0, scale: 1 } // Anchor: always visible, stays put
              : { opacity: 0, y: -MOBILE_Y_OFFSET, scale: 1 }; // Stack: tucked behind

            const mobileVisible = { opacity: 1, y: 0, scale: 1 };

            // Mobile transition - staggered delay for stack cards
            const mobileTransition = isAnchor
              ? {} // Anchor: no transition needed (already in place)
              : { ...mobileFanSpring, delay: index * 0.15 };

            // Z-index: Card 0 = z-10 (top), Card 1 = z-9, etc.
            // This ensures cards slide out from UNDERNEATH the anchor
            const mobileZIndex = 10 - index;

            return (
              <motion.div
                key={index}
                className="flex-shrink-0"
                initial={
                  isMobile
                    ? mobileHidden
                    : {
                        x: stackedX,
                        rotate: 0,
                        scale: 1,
                        opacity: 1,
                      }
                }
                animate={
                  isInView
                    ? isMobile
                      ? mobileVisible
                      : {
                          x: 0,
                          rotate: 0,
                          scale: 1,
                          opacity: 1,
                        }
                    : isMobile
                      ? mobileHidden
                      : {
                          x: stackedX,
                          rotate: 0,
                          scale: 1,
                          opacity: 1,
                        }
                }
                transition={
                  isMobile
                    ? mobileTransition
                    : { ...premiumSpring, delay: index * 0.08 }
                }
                style={{
                  zIndex: isMobile ? mobileZIndex : (isInView ? total - index : stackedZIndex),
                  transformOrigin: "center bottom",
                }}
              >
                {child}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scroll hint - fades in after spread animation */}
      <motion.div
        className="flex justify-center gap-2 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        {childArray.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-text-secondary/20"
          />
        ))}
      </motion.div>
    </section>
  );
}
