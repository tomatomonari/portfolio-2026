"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Rocket, GraduationCap, FlaskConical } from "lucide-react";
import { ExperienceCard, EducationCard, TestCard } from "@/components/cards";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection, ProjectSection, FeaturedSection, EducationSection, AboutSection, PreFooterSection } from "@/components/sections";

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
        {/* Test Coloured Section */}
        <ProjectSection title="Test Coloured" icon={<FlaskConical className="w-8 h-8" />}>
          <TestCard
            title="Product Manager"
            role="Ox — Supply Chain Startup"
            description="Scaled product 3x and built analytics from zero."
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
          <TestCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            date="2025"
            image="/bootcamp.jpeg"
            imageScale={1.15}
            imagePosition="28% 15%"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            watermarkLogo="/logos/sdschool.svg"
            watermarkMobileBottom="2rem"
            invertWatermark
            link="/program/stanford-dschool"
            color="orange"
          />
          <TestCard
            title="JStarX @ Stanford"
            role="Stanford University"
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
          <TestCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            date="2025"
            image="/bootcamp.jpeg"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            link="/program/stanford-dschool"
            color="green"
          />
          <TestCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            date="2025"
            image="/bootcamp.jpeg"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            link="/program/stanford-dschool"
            color="cyan"
          />
          <TestCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            date="2025"
            image="/bootcamp.jpeg"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            link="/program/stanford-dschool"
            color="pink"
          />
        </ProjectSection>

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

        {/* Test Section */}
        <ProjectSection title="Test" icon={<FlaskConical className="w-8 h-8" />}>
          <TestCard
            title="Product Manager"
            role="Ox — Supply Chain Startup"
            description="Scaled product 3x and built analytics from zero."
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
            invertWatermark
            link="/work/ox"
            color="white"
          />
          <TestCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            date="2025"
            image="/bootcamp.jpeg"
            imageScale={1.15}
            imagePosition="28% 15%"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            watermarkLogo="/logos/sdschool.svg"
            watermarkMobileBottom="2rem"
            link="/program/stanford-dschool"
            color="white"
          />
          <TestCard
            title="JStarX @ Stanford"
            role="Stanford University"
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
            color="white"
          />
          <TestCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            date="2025"
            image="/bootcamp.jpeg"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            link="/program/stanford-dschool"
            color="white"
          />
          <TestCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            date="2025"
            image="/bootcamp.jpeg"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            link="/program/stanford-dschool"
            color="white"
          />
          <TestCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            date="2025"
            image="/bootcamp.jpeg"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            link="/program/stanford-dschool"
            color="white"
          />
        </ProjectSection>

        {/* Test Section 2 */}
        <ProjectSection title="Test 2" icon={<FlaskConical className="w-8 h-8" />}>
          <TestCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            date="2025"
            image="/bootcamp.jpeg"
            imageScale={1.15}
            imagePosition="28% 15%"
            imageHeight="50%"
            showWatermark={false}
            inlineHeader
            watermarkLogo="/logos/sdschool.svg"
            link="/program/stanford-dschool"
            color="white"
          />
          <TestCard
            title="JStarX @ Stanford"
            role="Stanford University"
            date="2025"
            image="/jstarx.jpeg"
            link="/program/jstarx"
            color="white"
          />
          <TestCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            date="2025"
            image="/bootcamp.jpeg"
            link="/program/stanford-dschool"
            color="white"
          />
          <TestCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            date="2025"
            image="/bootcamp.jpeg"
            link="/program/stanford-dschool"
            color="white"
          />
          <TestCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            date="2025"
            image="/bootcamp.jpeg"
            link="/program/stanford-dschool"
            color="white"
          />
          <TestCard
            title="Design Thinking Bootcamp"
            role="Stanford d.school"
            date="2025"
            image="/bootcamp.jpeg"
            link="/program/stanford-dschool"
            color="white"
          />
        </ProjectSection>

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
            <EducationCard
              title="MS in Product Innovation"
              school="University of Arkansas"
              year="2026"
              logo="/logos/uofawalton.svg"
              invertLogo
              color="arkansas"
            />
            <EducationCard
              title="Design Thinking Bootcamp"
              school="Stanford d.school"
              year="2025"
              logo="/logos/sdschoolwhite.svg"
              logoLarge
              color="gray"
            />
            <EducationCard
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
