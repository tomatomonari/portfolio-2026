"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// Quick pop-up spring - high stiffness for super fast acceleration
const popUpSpring = {
  type: "spring" as const,
  stiffness: 500,
  damping: 25,
  mass: 0.8,
};

// Logo/credential items - all using image logos
interface Credential {
  label: string;
  src: string;
  width: number;
  height: number;
}

const credentials: Credential[] = [
  { label: "Stanford d.school", src: "/logos/sdschool.svg", width: 400, height: 128 },
  { label: "U of A Walton College", src: "/logos/uofawalton.svg", width: 400, height: 128 },
  { label: "McMillon Innovation Studio", src: "/logos/studiologoset.svg", width: 400, height: 128 },
];

export function LogoRow() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  return (
    <section ref={containerRef} className="w-full py-12 border-t border-slate-100">
      {/* Container with Phantom alignment */}
      <div className="w-full max-w-[1330px] mx-auto px-6 lg:px-0">
        {/* Logo Row - Responsive flex */}
        <div className="flex flex-row justify-between items-center gap-1 md:justify-center md:gap-20">
          {credentials.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 0.5, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ ...popUpSpring, delay: index * 0.1 }}
              whileHover={{ opacity: 1, filter: "grayscale(0)" }}
              className={cn(
                // Monochrome & Subtle by default
                "grayscale",
                // Hover transition handled by Framer Motion
                "cursor-default"
              )}
            >
              <Image
                src={item.src}
                alt={item.label}
                width={item.width}
                height={item.height}
                className="h-24 w-auto max-w-[45vw] md:h-32 md:w-auto md:max-w-none object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
