"use client";

import { useRef, Children, ReactNode, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface ProjectSectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
}

// "Premium" Spring Config - fast, tight, responsive
const premiumSpring = {
  type: "spring" as const,
  stiffness: 90,
  damping: 14,
  mass: 1.0,
};

// Pop spring for mobile header animation
const popSpring = {
  type: "spring" as const,
  stiffness: 500,
  damping: 25,
  mass: 0.8,
};

// Entrance spring for slide-in animation
const entranceSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 14,
  mass: 1,
};

// Card dimensions for offset calculation
const CARD_WIDTH = 450;
const STEP_OFFSET = 15;
const SCROLL_AMOUNT = 400;
const SCROLL_DURATION = 450; // Animation duration in ms

// Ease-in-out cubic easing function
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Custom animated scroll function with easing
function animatedScrollBy(
  element: HTMLElement,
  amount: number,
  duration: number = SCROLL_DURATION
) {
  const startPosition = element.scrollLeft;
  const startTime = performance.now();

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    element.scrollLeft = startPosition + amount * easedProgress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

// Mobile card dimensions
const MOBILE_CARD_WIDTH = 330;
const MOBILE_GAP = 16;
const MOBILE_STEP_OFFSET = -3; // Negative offset - cards overlap more

// Calculate the "Anchor at Index 1" offset (desktop)
function getStackedOffset(index: number) {
  const baseOffset = (1 - index) * CARD_WIDTH;
  const stepOffset = index * STEP_OFFSET;
  return baseOffset + stepOffset;
}

// Calculate the "Anchor at Index 0" offset (mobile)
// Top card stays in place, others stack behind it
function getMobileStackedOffset(index: number) {
  return -index * (MOBILE_CARD_WIDTH + MOBILE_GAP - MOBILE_STEP_OFFSET);
}

export function ProjectSection({
  children,
  className,
  title,
  icon,
}: ProjectSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Late trigger: cards stay stacked until 70% of section is visible
  const isInView = useInView(containerRef, { once: true, amount: 0.7 });

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  // Large screen detection - for padding alignment with header (lg: breakpoint = 1024px)
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Entrance animation state
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Trigger entrance animation on mount (both mobile and desktop)
  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Smart scroll state
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
    if (!scrollRef.current) return;
    // Mobile: card width is (100vw - 38px), plus 16px gap = 100vw - 22px
    const scrollAmount = isMobile ? window.innerWidth - 22 : SCROLL_AMOUNT;
    animatedScrollBy(scrollRef.current, -scrollAmount);
  };

  const scrollNext = () => {
    if (!scrollRef.current) return;
    // Mobile: card width is (100vw - 38px), plus 16px gap = 100vw - 22px
    const scrollAmount = isMobile ? window.innerWidth - 22 : SCROLL_AMOUNT;
    animatedScrollBy(scrollRef.current, scrollAmount);
  };

  const childArray = Children.toArray(children);
  const total = childArray.length;

  // Visible state (final position)
  const visibleState = { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 };

  return (
    <section
      id="projects"
      ref={containerRef}
      className={cn("w-full py-12 md:py-20 scroll-mt-12", className)}
    >
      {/* Control Bar Header with Smart Scroll - Animates with cards */}
      {title && (
        <motion.div
          initial={isMobile ? { opacity: 0, scale: 0.9 } : { opacity: 0, y: 20 }}
          animate={isInView
            ? (isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 })
            : (isMobile ? { opacity: 0, scale: 0.9 } : { opacity: 0, y: 20 })
          }
          transition={isMobile ? popSpring : { ...premiumSpring, delay: 0 }}
        >
          <SectionHeader
            title={title}
            icon={icon}
            onPrev={scrollPrev}
            onNext={scrollNext}
            canPrev={canScrollLeft}
            canNext={canScrollRight}
          />
        </motion.div>
      )}

      {/* Cards container - Full-width "Breakout" carousel with aligned padding */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-hide overflow-y-visible"
        style={{
          paddingLeft: isLargeScreen ? "max(0px, calc((100vw - 1330px) / 2))" : "19px",
          paddingRight: isLargeScreen ? "max(0px, calc((100vw - 1330px) / 2))" : "19px",
          // Extra padding for bounce overflow
          paddingTop: "80px",
          marginTop: "-80px",
          paddingBottom: "24px",
        }}
      >
        <div
          className="flex items-start gap-4 md:gap-5"
          style={{ width: "max-content" }}
        >
          {childArray.map((child, index) => {
            // Desktop stacked state: all cards anchor at Index 1's position
            const stackedX = getStackedOffset(index);
            const stackedZIndex = 50 - index;

            // Mobile stacked state: all cards anchor at Index 0's position
            const mobileStackedX = getMobileStackedOffset(index);

            // Desktop entrance state (stacked position)
            const desktopEntranceState = { x: stackedX, y: 0, rotate: 0, scale: 1, opacity: 1 };
            // Mobile entrance state (off-screen with stacked x offset)
            const mobileEntranceState = { x: mobileStackedX, y: 600, rotate: 0, scale: 1, opacity: 0 };
            // Mobile stacked state (after entrance, waiting for fan-out)
            const mobileStackedState = { x: mobileStackedX, y: 0, rotate: 0, scale: 1, opacity: 1 };

            // Determine current animation state
            const getAnimateState = () => {
              if (isMobile) {
                if (!hasEntered) return mobileEntranceState;
                if (isInView) return visibleState;
                return mobileStackedState;
              }
              if (!hasEntered) return desktopEntranceState;
              if (isInView) return visibleState;
              return desktopEntranceState;
            };

            // Determine transition based on animation phase
            const getTransition = () => {
              if (!hasEntered) return { duration: 0 };
              if (isMobile) {
                if (isInView) {
                  return { ...premiumSpring, delay: 0 };
                }
                return { ...entranceSpring, delay: index * 0.1 };
              }
              return { ...premiumSpring, delay: 0 };
            };

            return (
              <motion.div
                key={index}
                className="flex-shrink-0"
                initial={isMobile ? mobileEntranceState : desktopEntranceState}
                animate={getAnimateState()}
                transition={getTransition()}
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
