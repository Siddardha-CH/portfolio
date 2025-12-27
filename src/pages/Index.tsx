import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { HeroSection } from "@/components/sections/HeroSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { ContactSection } from "@/components/sections/ContactSection";

/**
 * Global smooth scroll helper
 * Used by Navbar & Hero buttons
 */
export const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* Hero / About */}
        <section id="about">
          <HeroSection />
        </section>

        {/* Education */}
        <section id="education">
          <EducationSection />
        </section>

        {/* Skills */}
        <section id="skills">
          <SkillsSection />
        </section>

        {/* Projects */}
        <section id="projects">
          <ProjectsSection />
        </section>

        {/* Achievements */}
        <section id="achievements">
          <AchievementsSection />
        </section>

        {/* Resume */}
        <section id="resume">
          <ResumeSection />
        </section>

        {/* Contact */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
