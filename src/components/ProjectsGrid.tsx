import { motion } from 'framer-motion';
import { Rocket, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface ProjectEntry {
  title: string;
  subtitle: string;
  date: string;
  highlights: string[];
  tags: string[];
}

const projectsData: ProjectEntry[] = [
  {
    title: 'AI-Powered Multi-Agent Travel Planner',
    subtitle: 'LangGraph + Gemini',
    date: '2025 – Present',
    highlights: [
      'Multi-agent orchestration for automated trip planning',
      'Integrated real-time aviation APIs with intelligent caching',
    ],
    tags: ['Python', 'LangGraph', 'Gemini', 'AI Agents'],
  },
  {
    title: 'AI-Powered JSON Mapping Finder',
    subtitle: 'MCP Server',
    date: '2025',
    highlights: [
      'Automated JSON schema mapping reducing integration effort by 90%',
      'Schema-aware parsing for deeply nested data structures',
    ],
    tags: ['MCP', 'AI', 'ETL', 'Schema Mapping'],
  },
  {
    title: 'CO₂ Emissions Forecast Portal',
    subtitle: 'Volkswagen Group',
    date: '2021 – 2023',
    highlights: [
      'Real-time analytics platform for EU regulatory compliance',
      'Processed 50K+ events/sec via Kafka + Spring Boot + React',
    ],
    tags: ['Kafka', 'Spring Boot', 'React', 'Real-time'],
  },
  {
    title: 'Assembly Line Parts Management',
    subtitle: 'Capgemini',
    date: '2020 – 2021',
    highlights: [
      'Web-based logistics portal optimizing assembly line operations',
      'Improved assembly efficiency by 15% via real-time tracking',
    ],
    tags: ['Java', 'Spring Boot', 'Logistics'],
  },
];

export default function ProjectsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-10 h-10 rounded-lg bg-project/15 flex items-center justify-center">
          <Rocket size={20} strokeWidth={1.5} className="text-project" />
        </div>
        <h2 className="font-display text-2xl font-extrabold text-foreground">Projects</h2>
      </motion.div>

      <div className="grid gap-4">
        {projectsData.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative group cursor-default"
          >
            <motion.div
              className="bg-card rounded-xl p-5 border border-border shadow-[var(--shadow-card)] transition-colors duration-300 group-hover:border-project/30 overflow-hidden"
              animate={{
                boxShadow: hoveredIndex === i
                  ? '0 0 25px hsl(280 50% 60% / 0.15)'
                  : '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-project/80 to-project/20"
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-bold text-foreground leading-tight">
                      {project.title}
                    </h3>
                    <motion.div
                      animate={{ x: hoveredIndex === i ? 3 : 0, opacity: hoveredIndex === i ? 1 : 0.3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <ExternalLink size={14} strokeWidth={1.5} className="text-project" />
                    </motion.div>
                  </div>
                  <p className="text-xs text-project mt-0.5 font-medium">{project.subtitle}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap bg-secondary px-2 py-1 rounded">
                  {project.date}
                </span>
              </div>

              <ul className="space-y-1 mt-2">
                {project.highlights.map((h, j) => (
                  <li key={j} className="text-sm text-secondary-foreground leading-relaxed flex gap-2">
                    <span className="text-project mt-0.5 shrink-0 text-xs">◆</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-full bg-project/10 text-project/80 border border-project/20 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
