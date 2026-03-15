import { useState, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Linkedin, MapPin, Phone } from 'lucide-react';
import AvatarScene from '@/components/AvatarScene';
import WorkTimeline from '@/components/WorkTimeline';
import EducationTimeline from '@/components/EducationTimeline';
import ProjectsGrid from '@/components/ProjectsGrid';
import SkillsSection from '@/components/SkillsSection';
import ContactFAB from '@/components/ContactFAB';

const springConfig = { type: "spring" as const, stiffness: 300, damping: 30 };

export default function Index() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  }, []);

  return (
    <div className="min-h-screen bg-background" onMouseMove={handleMouseMove}>
      <div className="lg:grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] min-h-screen">
        {/* Left Pane — Sticky Avatar + Hero */}
        <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col">
          <div className="h-[40vh] lg:h-[55vh] relative">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 animate-pulse-glow" />
                </div>
              }
            >
              <AvatarScene mousePos={mousePos} />
            </Suspense>
          </div>

          <div className="flex-1 flex flex-col justify-center px-8 lg:px-12 pb-8 lg:pb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-foreground leading-[1.1]">
                Bablu Singh
              </h1>
              <p className="text-lg text-primary mt-2 font-display font-semibold">
                Senior Software Engineer
              </p>
              <p className="text-sm text-muted-foreground mt-3 max-w-md leading-relaxed">
                Building scalable cloud-native systems at Publicis Sapient. Previously Volkswagen & Capgemini. 6+ years shipping high-performance enterprise platforms.
              </p>

              <div className="flex flex-wrap gap-3 mt-5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} strokeWidth={1.5} className="text-primary" /> Bengaluru, India
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={14} strokeWidth={1.5} className="text-primary" /> bablu.singh.cs15@gmail.com
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone size={14} strokeWidth={1.5} className="text-primary" /> +91-7850870585
                </span>
              </div>

              <div className="flex gap-3 mt-6 flex-wrap">
                <motion.a
                  href="/Bablu_Singh_Resume.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springConfig}
                  className="h-12 px-6 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm inline-flex items-center gap-2"
                >
                  <Download size={16} strokeWidth={1.5} />
                  Download Resume
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/bablu-singh"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springConfig}
                  className="h-12 px-6 rounded-full bg-secondary text-secondary-foreground font-display font-bold text-sm inline-flex items-center gap-2 border border-border"
                >
                  <Linkedin size={16} strokeWidth={1.5} />
                  LinkedIn
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Pane — Sections */}
        <div className="border-l border-border overflow-y-auto">
          {/* Work Experience */}
          <div className="px-6 lg:px-8 pt-12 lg:pt-16 pb-12 border-b border-border">
            <WorkTimeline />
          </div>

          {/* Skills */}
          <div className="px-6 lg:px-8 py-12 border-b border-border">
            <SkillsSection />
          </div>

          {/* Projects */}
          <div className="px-6 lg:px-8 py-12 border-b border-border">
            <ProjectsGrid />
          </div>

          {/* Education */}
          <div className="px-6 lg:px-8 py-12">
            <EducationTimeline />
          </div>
        </div>
      </div>

      <ContactFAB />
    </div>
  );
}
