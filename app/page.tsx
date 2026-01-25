"use client";

import { useRef, useState, useEffect } from "react";
import { Star, Rocket, GraduationCap } from "lucide-react";
import { ExperienceCard, EducationCard } from "@/components/cards";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection, LogoRow, ProjectSection, ExperienceSection, EducationSection, AboutSection, PreFooterSection } from "@/components/sections";

export default function Home() {
  const educationRef = useRef<HTMLDivElement>(null);
  const [isDarkBg, setIsDarkBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!educationRef.current) return;

      const rect = educationRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(window.innerHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      // When less than 50% of the section is visible (scrolled past halfway)
      const isHalfwayPast = visibleHeight < sectionHeight * 0.5 && rect.top < 0;
      setIsDarkBg(isHalfwayPast);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen overflow-x-clip md:overflow-y-visible transition-colors duration-500 ${isDarkBg ? "bg-violet-300" : "bg-bg-main"}`}>
      {/* Sticky Navigation */}
      <Navbar isDarkBg={isDarkBg} />

      {/* Hero Section */}
      <HeroSection />

      {/* Content Sections */}
      <div className="pb-20 md:overflow-visible">
        {/* Featured Section */}
        <ExperienceSection title="Featured" icon={<Star className="w-8 h-8" />}>
          <ExperienceCard
            title="Technical Product Manager"
            role="Ox — Supply Chain Startup"
            date="2022 - 2025"
            description="Built platform infrastructure + 0-to-1 analytics product → 3x customer scale • 20% cost cut • 67% faster onboarding • NPS 70+"
            link="#"
            color="blue"
          />
          <ExperienceCard
            title="Co-founder & Product Lead"
            role="Bento @ McMillon Innovation Studio"
            date="2021 - 2022"
            description="Built digital menu platform for restaurants. Won $10k at Governor's Cup — only undergrad, 1 month prep vs competitors' 1+ year."
            link="#"
            color="green"
          />
          <ExperienceCard
            title="Design Thinking Boot Camp"
            role="Stanford d.school"
            date="2025"
            description="3-day intensive ($17k program). By day 3, taught a 90-min workshop to paid participants."
            link="#"
            color="orange"
          />
          <ExperienceCard
            title="Stanford Entrepreneurship Program"
            role="JETRO JRX"
            date="2025"
            description="Selected 1 of 20 from Japan. Government flagship program. Month at Stanford with entrepreneurs who've had multiple exits."
            link="#"
            color="purple"
          />
          <ExperienceCard
            title="Graduate Assistant"
            role="McMillon Innovation Studio"
            date="2020 - 2022, 2025 - Present"
            description="Facilitated design thinking workshops. Solved Fortune 500 challenges (Walmart, P&G). Doubled student engagement records."
            link="#"
            color="cyan"
          />
        </ExperienceSection>

        {/* Social Proof / Credibility Row */}
        <LogoRow />

        {/* Projects Section - Uses dedicated ProjectSection with mobile fan animation */}
        <ProjectSection title="Projects" icon={<Rocket className="w-8 h-8" />}>
          <ExperienceCard
            title="AI Meeting Prep"
            role="RAG Tool"
            date="2025"
            description="Built an AI agent to prep briefs before meetings."
            link="#"
            color="pink"
          />
          <ExperienceCard
            title="Portfolio 2026"
            role="Next.js + Framer"
            date="2026"
            description="High-performance vibecoded site."
            link="#"
            color="gray"
          />
          <ExperienceCard
            title="Design System"
            role="Component Library"
            date="2024"
            description="Built a scalable design system for rapid prototyping."
            link="#"
            color="cream"
          />
          <ExperienceCard
            title="Voice Assistant"
            role="LLM Integration"
            date="2024"
            description="Built a voice-controlled assistant for smart home automation."
            link="#"
            color="green"
          />
          <ExperienceCard
            title="Analytics Dashboard"
            role="Data Visualization"
            date="2023"
            description="Real-time metrics dashboard with interactive charts."
            link="#"
            color="blue"
          />
        </ProjectSection>

        {/* Education Section */}
        <div ref={educationRef}>
          <EducationSection title="Education" icon={<GraduationCap className="w-8 h-8" />}>
            <EducationCard
              school="Stanford d.school"
              degree="Design Thinking"
              year="2023"
              color="dschool"
            />
            <EducationCard
              school="Masters in PM"
              degree="Product Management"
              year="2022"
              color="arkansas"
            />
            <EducationCard
              school="AWS Certification"
              degree="Solutions Architect"
              year="2021"
              color="cyan"
            />
            <EducationCard
              school="Google UX"
              degree="Professional Certificate"
              year="2020"
              color="blue"
            />
          </EducationSection>
        </div>

      </div>

      {/* About Section */}
      <AboutSection />

      {/* Pre-Footer CTA */}
      <PreFooterSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
