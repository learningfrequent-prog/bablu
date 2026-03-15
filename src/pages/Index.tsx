import { useState, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Linkedin, MapPin, Phone } from 'lucide-react';
import AvatarScene from '@/components/AvatarScene';
import Timeline from '@/components/Timeline';
import ContactFAB from '@/components/ContactFAB';

const skills = [
  'Java', 'Spring Boot', 'Microservices', 'Kafka', 'Kubernetes',
  'React', 'TypeScript', 'Docker', 'AWS', 'PostgreSQL',
  'CI/CD', 'LangChain', 'REST APIs', 'MongoDB',
];

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
      {/* Desktop: dual pane / Mobile: stacked */}
      <div className="lg:grid lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_500px] min-h-screen">
        {/* Left Pane — Sticky Avatar + Hero */}
        <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col">
          {/* 3D Scene */}
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

          {/* Hero Info */}
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

              {/* Contact chips */}
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

              {/* CTAs */}
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

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mt-8">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs rounded-full bg-secondary text-muted-foreground border border-border font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Pane — Timeline */}
        <div className="border-l border-border px-6 lg:px-8 py-12 lg:py-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display text-2xl font-extrabold text-foreground mb-8"
          >
            Career Timeline
          </motion.h2>
          <Timeline />
        </div>
      </div>

      <ContactFAB />
    </div>
  );
}
