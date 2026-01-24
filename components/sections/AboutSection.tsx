"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface AboutSectionProps {
  className?: string;
}

const premiumSpring = {
  type: "spring" as const,
  stiffness: 90,
  damping: 14,
  mass: 1.0,
};

export function AboutSection({ className }: AboutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section
      id="about"
      ref={containerRef}
      className={cn("w-full py-12 md:py-20 scroll-mt-12", className)}
    >
      <SectionHeader
        title="About"
        icon={<User className="w-8 h-8" />}
        canPrev={false}
        canNext={false}
      />

      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={premiumSpring}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-100"
        >
          <div className="max-w-3xl">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-6">
              I&apos;m a product manager with 6+ years of experience shipping digital products
              that users love. From fintech to e-commerce, I&apos;ve led cross-functional teams
              to deliver solutions that drive real business impact.
            </p>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
              Currently exploring the intersection of AI and product development,
              building tools that make work more efficient and enjoyable.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
