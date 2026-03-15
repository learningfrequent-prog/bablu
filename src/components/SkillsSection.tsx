import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useState } from 'react';

interface SkillCategory {
  name: string;
  skills: { name: string; level: 'expert' | 'advanced' | 'intermediate' }[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Back-End',
    skills: [
      { name: 'Java', level: 'expert' },
      { name: 'Spring Boot', level: 'expert' },
      { name: 'Microservices', level: 'expert' },
      { name: 'REST APIs', level: 'expert' },
      { name: 'Hibernate', level: 'advanced' },
      { name: 'Spring Batch', level: 'advanced' },
      { name: 'Concurrency', level: 'advanced' },
    ],
  },
  {
    name: 'Data & Streaming',
    skills: [
      { name: 'Kafka', level: 'expert' },
      { name: 'PostgreSQL', level: 'advanced' },
      { name: 'MongoDB', level: 'advanced' },
      { name: 'Oracle', level: 'advanced' },
      { name: 'RabbitMQ', level: 'intermediate' },
      { name: 'Redis', level: 'advanced' },
    ],
  },
  {
    name: 'Front-End',
    skills: [
      { name: 'React', level: 'advanced' },
      { name: 'TypeScript', level: 'advanced' },
      { name: 'Angular', level: 'intermediate' },
      { name: 'JavaScript', level: 'expert' },
    ],
  },
  {
    name: 'DevOps & Cloud',
    skills: [
      { name: 'Kubernetes', level: 'advanced' },
      { name: 'Docker', level: 'advanced' },
      { name: 'CI/CD', level: 'expert' },
      { name: 'GitHub Actions', level: 'advanced' },
      { name: 'AWS', level: 'intermediate' },
      { name: 'Azure', level: 'intermediate' },
    ],
  },
  {
    name: 'AI & Emerging',
    skills: [
      { name: 'LangChain', level: 'intermediate' },
      { name: 'LangGraph', level: 'intermediate' },
      { name: 'MCP Servers', level: 'intermediate' },
      { name: 'LLM Integration', level: 'intermediate' },
      { name: 'Agentic AI', level: 'intermediate' },
    ],
  },
];

const levelColors = {
  expert: 'bg-skill/25 text-skill border-skill/40 shadow-[0_0_8px_hsl(var(--skill-accent)/0.2)]',
  advanced: 'bg-primary/15 text-primary border-primary/30',
  intermediate: 'bg-secondary text-muted-foreground border-border',
};

const levelLabels = {
  expert: '★',
  advanced: '◆',
  intermediate: '○',
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="w-10 h-10 rounded-lg bg-skill/15 flex items-center justify-center">
          <Zap size={20} strokeWidth={1.5} className="text-skill" />
        </div>
        <h2 className="font-display text-2xl font-extrabold text-foreground">Skills</h2>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex gap-4 mb-6 text-xs text-muted-foreground"
      >
        <span className="flex items-center gap-1"><span className="text-skill">★</span> Expert</span>
        <span className="flex items-center gap-1"><span className="text-primary">◆</span> Advanced</span>
        <span className="flex items-center gap-1">○ Learning</span>
      </motion.div>

      <div className="space-y-5">
        {skillCategories.map((cat, catIndex) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              duration: 0.5,
              delay: catIndex * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => setActiveCategory(cat.name)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <motion.h3
              className="font-mono text-xs text-muted-foreground mb-2.5 uppercase tracking-wider"
              animate={{
                color: activeCategory === cat.name
                  ? 'hsl(var(--foreground))'
                  : 'hsl(var(--muted-foreground))',
              }}
              transition={{ duration: 0.2 }}
            >
              {cat.name}
            </motion.h3>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                    delay: catIndex * 0.08 + skillIndex * 0.04,
                  }}
                  whileHover={{
                    scale: 1.08,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`
                    relative px-3 py-1.5 rounded-lg text-xs font-mono border cursor-default
                    transition-all duration-200
                    ${levelColors[skill.level]}
                    ${hoveredSkill === skill.name ? 'z-10' : ''}
                  `}
                >
                  <span className="mr-1 opacity-60">{levelLabels[skill.level]}</span>
                  {skill.name}

                  {/* Hover tooltip */}
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-border rounded px-2 py-0.5 text-[10px] text-muted-foreground whitespace-nowrap shadow-[var(--shadow-elevated)] z-20"
                    >
                      {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
