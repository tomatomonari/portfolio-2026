"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface PreFooterSectionProps {
  className?: string;
}

const premiumSpring = {
  type: "spring" as const,
  stiffness: 90,
  damping: 14,
  mass: 1.0,
};

export function PreFooterSection({ className }: PreFooterSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={containerRef}
      className={cn(
        "w-full py-24 md:py-32",
        className
      )}
    >
      <div className="w-full max-w-[1330px] mx-auto px-4 md:px-6 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={premiumSpring}
          className="text-center"
        >
          {/* Big Text with Logo */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 leading-tight">
            <span className="whitespace-nowrap">Let&apos;s build something</span>
            <br />
            amazing together.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
