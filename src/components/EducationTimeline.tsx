import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';

export default function EducationTimeline() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-10 h-10 rounded-lg bg-education/15 flex items-center justify-center">
          <GraduationCap size={20} strokeWidth={1.5} className="text-education" />
        </div>
        <h2 className="font-display text-2xl font-extrabold text-foreground">Education</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative group"
      >
        <div className="bg-card rounded-xl p-6 border border-border shadow-[var(--shadow-card)] transition-all duration-300 group-hover:border-education/30 group-hover:shadow-[0_0_20px_hsl(var(--education-accent)/0.1)] overflow-hidden">
          {/* Decorative gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-education/60 via-education to-education/60" />

          <div className="flex items-start gap-4">
            <motion.div
              className="w-12 h-12 rounded-xl bg-education/10 flex items-center justify-center shrink-0 mt-1"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <BookOpen size={24} strokeWidth={1.5} className="text-education" />
            </motion.div>

            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-foreground leading-tight">
                B.Tech in Computer Science
              </h3>
              <p className="text-sm text-education mt-1 font-medium">
                SKIT – Swami Keshvanand Institute of Technology
              </p>
              <span className="font-mono text-xs text-muted-foreground mt-2 inline-block bg-secondary px-2 py-1 rounded">
                2015 – 2019
              </span>
              <p className="text-sm text-secondary-foreground mt-3 leading-relaxed">
                Specialized in Computer Science & Engineering with focus on software development, algorithms, and system design.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
