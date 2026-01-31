"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Rocket, GraduationCap, FlaskConical } from "lucide-react";
import { ExperienceCard, LogoCard, MediaCard } from "@/components/cards";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection, ProjectSection, EducationSection, AboutSection, PreFooterSection } from "@/components/sections";

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
        <ProjectSection title="Featured" icon={<Star className="w-8 h-8" />}>
          <MediaCard
            title="Product Manager"
            role="Ox — Supply Chain Startup"
            description="Built warehouse automation platform reducing operator onboarding from days to 15 minutes."
            date="2022 - 2025"
            image="/oxproductimage.png"
            imageScale={1.04}
            imagePosition="32% center"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            watermarkLogo="/ox-logo.png"
            watermarkSize={170}
            watermarkMobileSize={140}
            watermarkBottom="1.5rem"
            watermarkMobileBottom="1.5rem"
            watermarkRight="-0.5rem"
            watermarkMobileRight="0rem"
            link="/work/ox"
            color="dark"
          />
          <MediaCard
            title="Founder"
            role="Bento @ McMillon Innovation Studio"
            description="Built digital menu platform and won $10k at Governor's Cup."
            date="2021 - 2022"
            image="/bootcamp.jpeg"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            link="/project/bento"
            color="green"
          />
          <MediaCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            description={"Trained under seasoned d.school coaches.\nLed a paid workshop for external attendees."}
            date="2025"
            image="/bootcamp.jpeg"
            imageScale={1.15}
            imagePosition="28% 15%"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            watermarkLogo="/logos/sdschool.svg"
            watermarkBottom="2rem"
            watermarkMobileBottom="2rem"
            invertWatermark
            link="/program/stanford-dschool"
            color="orange"
          />
          <MediaCard
            title="JStarX @ Stanford"
            role="Stanford University"
            description={"Selected 1 of 20 from Japan.\nTrained under serial entrepreneur mentors."}
            date="2025"
            image="/jstarx.jpeg"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            watermarkLogo={["/jstarxlogo.png", "/stanfordlogo.svg"]}
            watermarkSize={135}
            watermarkGap="-space-x-10"
            watermarkBottom="2.5rem"
            watermarkRight="-0.5rem"
            link="/program/jstarx"
            color="cream"
          />
          <MediaCard
            title="Product Manager Graduate Assistant"
            role="McMillon Innovation Studio"
            description="Solved challenges with Walmart, P&G, J&J. Now mentoring students."
            date={"2020-2022\n2025-2026"}
            image="/bootcamp.jpeg"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            watermarkLogo="/logos/studiologoset.svg"
            watermarkBottom="2rem"
            invertWatermark
            link="/work/mcmillon"
            color="cyan"
          />
        </ProjectSection>

        {/* Projects Section */}
        <ProjectSection title="Projects" icon={<Rocket className="w-8 h-8" />}>
          <MediaCard
            title="Portfolio 2026"
            role="Next.js + Framer Motion"
            description="A portfolio site built like a product — vibecoded end-to-end with Claude Code."
            date="2026"
            video="/pf-shortvid.mp4"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            watermarkLogo="/tt-logo.png"
            invertWatermark
            watermarkSize={180}
            watermarkBottom="1rem"
            link="/project/portfolio-2026"
            color="gray"
          />
        </ProjectSection>

        {/* Interstitial */}
        <div className="w-full max-w-[1330px] mx-auto px-[19px] lg:px-0 py-16 md:py-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.8 }}
            className="text-4xl md:text-6xl font-semibold text-[#3d3a50] leading-tight tracking-tight"
          >
            The formal stuff,
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-semibold text-slate-400 leading-tight tracking-tight"
          >
            for those who care.
          </motion.p>
        </div>

        {/* Education Section */}
        <div ref={educationRef}>
          <EducationSection title="Education" icon={<GraduationCap className="w-8 h-8" />}>
            <LogoCard
              title="MS in Product Innovation"
              school="University of Arkansas"
              year="2026"
              logo="/logos/uofawalton.svg"
              invertLogo
              color="arkansas"
            />
            <LogoCard
              title="Design Thinking Bootcamp"
              school="Stanford d.school"
              year="2025"
              logo="/logos/sdschoolwhite.svg"
              logoLarge
              color="gray"
            />
            <LogoCard
              title="BS in Computer Science"
              school="University of Arkansas"
              year="2022"
              logo="/logos/uofawalton.svg"
              invertLogo
              color="arkansas"
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
