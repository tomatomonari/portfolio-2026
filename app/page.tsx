"use client";

import { useRef, useState, useEffect } from "react";
import { Star, Briefcase, Rocket, GraduationCap } from "lucide-react";
import { ExperienceCard, EducationCard } from "@/components/cards";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection, LogoRow, ProjectSection, FeaturedSection, WorkHistorySection, EducationSection, AboutSection, PreFooterSection } from "@/components/sections";

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
    <div className={`min-h-dvh overflow-x-clip md:overflow-y-visible transition-colors duration-500 ${isDarkBg ? "bg-violet-300" : "bg-bg-main"}`}>
      {/* Sticky Navigation */}
      <Navbar isDarkBg={isDarkBg} />

      {/* Hero Section */}
      <HeroSection />

      {/* Content Sections */}
      <div className="pb-20 md:overflow-visible">
        {/* Featured Section */}
        <FeaturedSection title="Featured" icon={<Star className="w-8 h-8" />}>
          <ExperienceCard
            title="Technical Product Manager"
            role="Ox - SaaS Startup in Supply Chain"
            date="2022 - 2025"
            description={"• Led infrastructure overhaul -> enabled 3x customer scale and 70% faster B2B integration while reducing infra cost and app wide latency by 20%.\n• Built analytics product 0-to-1 and evolved it into warehouse management tool.\n• Drove cross-functional ceremonies, roadmap planning, and strategic prioritization across engineering, design and product teams."}
            link="/work/ox"
            color="blue"
          />
          <ExperienceCard
            title="Founder & Product Lead"
            role="Bento @ McMillon Innovation Studio"
            date="2021 - 2022"
            description={"• Built digital menu platform for restaurants from scratch.\n• Won 2nd place and $10k at Arkansas Governor's Cup as the only undergrad team."}
            link="/project/bento"
            color="green"
          />
          <ExperienceCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            date="2025"
            description={"• 3 days of intensive design thinking bootcamp - diverging and converging on problems and solutions.\n• Ran a 90 minute Design Thinking Workshop to paid participants at d.school."}
            link="/program/stanford-dschool"
            color="orange"
          />
          <ExperienceCard
            title="JStarX @ Stanford"
            role="Stanford University"
            date="2025"
            description={"• Selected as 1 of 20 entrepreneurs from Japan for a pre-idea accelerator.\n• Learned core startup principles from seasoned serial entrepreneur mentors."}
            link="/program/jstarx"
            color="purple"
          />
          <ExperienceCard
            title="Product Manager -> Graduate Assistant"
            role="McMillon Innovation Studio"
            date="2020-2022, 2025-2026"
            description={"• As student: Solved business challenges with Fortune 500 companies including Walmart, P&G, and J&J.\n• As GA: Facilitating design thinking workshops, mentoring student leaders help solve problems."}
            link="/work/mcmillon"
            color="cyan"
          />
        </FeaturedSection>

        {/* Work History Section */}
        <WorkHistorySection title="Work History" icon={<Briefcase className="w-8 h-8" />}>
          <ExperienceCard
            title="Technical Product Manager"
            role="Ox - SaaS Startup in Supply Chain"
            date="2022 - 2025"
            description={"• Led infrastructure overhaul -> enabled 3x customer scale and 70% faster B2B integration while reducing infra cost and app wide latency by 20%.\n• Built analytics product 0-to-1 and evolved it into warehouse management tool.\n• Drove cross-functional ceremonies, roadmap planning, and strategic prioritization across engineering, design and product teams."}
            link="/work/ox"
            color="blue"
          />
          <ExperienceCard
            title="Founder & Product Lead"
            role="Bento @ McMillon Innovation Studio"
            date="2021 - 2022"
            description={"• Built digital menu platform for restaurants from scratch.\n• Won 2nd place and $10k at Arkansas Governor's Cup as the only undergrad team."}
            link="/project/bento"
            color="green"
          />
          <ExperienceCard
            title="Product Manager -> Graduate Assistant"
            role="McMillon Innovation Studio"
            date="2020-2022, 2025-2026"
            description={"• As student: Solved business challenges with Fortune 500 companies including Walmart, P&G, and J&J.\n• As GA: Facilitating design thinking workshops, mentoring student leaders help solve problems."}
            link="/work/mcmillon"
            color="cyan"
          />
        </WorkHistorySection>

        {/* Social Proof / Credibility Row */}
        <LogoRow />

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

        {/* Projects Section */}
        <ProjectSection title="Projects" icon={<Rocket className="w-8 h-8" />}>
          <ExperienceCard
            title="Portfolio 2026"
            role="Next.js + Framer Motion"
            date="2026"
            description="A portfolio site built like a product — vibecoded end-to-end with Claude Code."
            link="/project/portfolio-2026"
            color="gray"
          />
        </ProjectSection>

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
