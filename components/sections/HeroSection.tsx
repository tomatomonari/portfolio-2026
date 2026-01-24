"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Words to rotate through (English/Japanese pair)
const rotatingWords = ["Driven", "駆動"];

// The widest word - used for ghost element to maintain stable width
const GHOST_WORD = "Driven";

// Falling triple-bounce spring config
const fallingSpring = {
  type: "spring" as const,
  stiffness: 200,  // Fast drop
  damping: 10,     // Low friction = bounces when it lands
};

// Quick pop-up spring - same as LogoRow
const popUpSpring = {
  type: "spring" as const,
  stiffness: 500,
  damping: 25,
  mass: 0.8,
};

// Manifesto lines data
const manifestoLines = [
  "4+ years of experience building products, leading multidisciplinary teams and delivering outcomes.",
  "This includes driving product at early-stage startups and solving complex industry challenges for Fortune 500 companies to community institutions."
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate words every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full pt-28 md:pt-40 pb-2 overflow-visible">
      {/* Container with Phantom alignment - Centered */}
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 text-center">
        {/* Line 1: AI [Rotating] PM */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900">
          AI{" "}
          {/* Slot Machine Window - Stable Width Container */}
          <span className="inline-block relative overflow-hidden align-bottom h-[1.1em]">
            {/* Ghost Element - Forces width to match widest word */}
            <span className="opacity-0" aria-hidden="true">
              {GHOST_WORD}
            </span>

            {/* Animating Words - Absolutely positioned on top */}
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={currentIndex}
                className="absolute top-0 left-0 text-indigo-600 translate-y-[0.05em]"
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={fallingSpring}
              >
                {rotatingWords[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          PM
        </h1>

        {/* Line 2: Design Thinker */}
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mt-2">
          Design Thinker
        </h2>

        {/* Manifesto - Staggered pop-up animation (same as LogoRow) */}
        <div className="mt-16 max-w-[700px] mx-auto">
          {manifestoLines.map((line, index) => (
            <motion.p
              key={index}
              className="text-lg md:text-xl font-medium text-slate-500 text-center mb-4"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...popUpSpring, delay: 0.5 + index * 0.1 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
