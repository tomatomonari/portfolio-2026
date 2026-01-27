"use client";

import { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiGit,
  SiGithub,
  SiVercel,
  SiClaude,
} from "react-icons/si";

const techMap: Record<string, { icon: IconType; label: string }> = {
  nextjs: { icon: SiNextdotjs, label: "Next.js" },
  typescript: { icon: SiTypescript, label: "TypeScript" },
  tailwind: { icon: SiTailwindcss, label: "Tailwind CSS" },
  framer: { icon: SiFramer, label: "Framer Motion" },
  claude: { icon: SiClaude, label: "Claude Code" },
  git: { icon: SiGit, label: "Git" },
  github: { icon: SiGithub, label: "GitHub" },
  vercel: { icon: SiVercel, label: "Vercel" },
};

interface TechIconsProps {
  tech: string[];
}

export function TechIcons({ tech }: TechIconsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mt-6">
      {tech.map((key) => {
        const entry = techMap[key];
        if (!entry) return null;

        const Icon = entry.icon;
        return (
          <div
            key={key}
            className="flex items-center gap-1.5 text-slate-500"
            title={entry.label}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium text-slate-600">{entry.label}</span>
          </div>
        );
      })}
    </div>
  );
}
