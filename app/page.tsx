"use client";

import { useRef, useState, useEffect } from "react";
import { Briefcase, Rocket, GraduationCap } from "lucide-react";
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
        {/* Experience Section */}
        <ExperienceSection title="Experience" icon={<Briefcase className="w-8 h-8" />}>
          <ExperienceCard
            title="Product Consultant"
            role="Startups & Korean Gov"
            date="2024 - Present"
            description="Led go-to-market pitching projects for government-backed startups."
            link="#"
            color="blue"
          />
          <ExperienceCard
            title="Product Manager"
            role="Tech Startups"
            date="2021 - 2024"
            description="3 years of shipping SaaS products."
            link="#"
            color="green"
          />
          <ExperienceCard
            title="Senior PM"
            role="Google"
            date="2020 - 2021"
            description="Led the search team on discovery features and personalization."
            link="#"
            color="cyan"
          />
          <ExperienceCard
            title="Product Lead"
            role="Fintech Startup"
            date="2019 - 2020"
            description="Launched mobile banking features serving 500K+ users."
            link="#"
            color="purple"
          />
          <ExperienceCard
            title="Associate PM"
            role="E-commerce Platform"
            date="2018 - 2019"
            description="Optimized checkout flow increasing conversion by 15%."
            link="#"
            color="orange"
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
