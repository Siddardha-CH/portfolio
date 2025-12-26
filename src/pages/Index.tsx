import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AchievementsSection } from '@/components/sections/AchievementsSection';
import { ResumeSection } from '@/components/sections/ResumeSection';
// import { DSASection } from '@/components/sections/DSASection';
import { ContactSection } from '@/components/sections/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main>
        <section id="about">
          <HeroSection />
        </section>
        
        <section id="education">
          <EducationSection />
        </section>
        
        <section id="skills">
          <SkillsSection />
        </section>
        
        <section id="projects">
          <ProjectsSection />
        </section>
        
        <section id="achievements">
          <AchievementsSection />
        </section>
        
        <section id="resume">
          <ResumeSection />
        </section>
        
        {/* <section id="dsa">
          <DSASection />
        </section> */}
        
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
