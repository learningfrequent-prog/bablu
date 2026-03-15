import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { useState } from 'react';

type FilterType = 'all' | 'work' | 'education' | 'projects';

interface TimelineEntry {
  type: 'work' | 'education' | 'project';
  title: string;
  subtitle: string;
  date: string;
  highlights: string[];
  tags?: string[];
}

const timelineData: TimelineEntry[] = [
  {
    type: 'work',
    title: 'Senior Software Engineer',
    subtitle: 'Publicis Sapient, Bengaluru',
    date: 'Aug 2023 – Present',
    highlights: [
      'Reduced claim adjudication from 7 days to 7 minutes via Spring Batch tuning',
      'Designed Microservices processing 14M+ claims with real-time SLAs',
      'Deployed HPA-enabled K8s clusters — 99.99% availability under peak load',
    ],
    tags: ['Java', 'Spring Boot', 'Kubernetes', 'GitHub Actions', 'Microservices'],
  },
  {
    type: 'work',
    title: 'Software Engineer',
    subtitle: 'Volkswagen IT Services India, Gurugram',
    date: 'Aug 2021 – Aug 2023',
    highlights: [
      'Architected Kafka pipelines handling 50K+ msg/sec, P99 < 200ms',
      'Boosted throughput by 25%, cut GC pauses by 60ms',
      '3× Instapat Awards for defect-free, on-time releases',
    ],
    tags: ['Kafka', 'React', 'Angular', 'Spring Boot', 'SonarQube'],
  },
  {
    type: 'work',
    title: 'Senior Analyst',
    subtitle: 'Capgemini, Mumbai',
    date: 'Sep 2019 – May 2021',
    highlights: [
      'Developed 5 reusable Java modules adopted across multiple teams',
      'Increased delivery accuracy by 25% through domain-driven design',
      'Lowered post-release defects by 15% via TDD & CI pipelines',
    ],
    tags: ['Java', 'REST APIs', 'JUnit', 'CI/CD', 'DDD'],
  },
  {
    type: 'project',
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
    type: 'project',
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
    type: 'project',
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
    type: 'education',
    title: 'B.Tech in Computer Science',
    subtitle: 'SKIT – Swami Keshvanand Institute of Technology',
    date: '2015 – 2019',
    highlights: [
      'Specialized in Computer Science & Engineering',
    ],
    tags: ['Computer Science'],
  },
];

const filterConfig = [
  { key: 'all' as FilterType, label: 'All' },
  { key: 'work' as FilterType, label: 'Work', icon: Briefcase },
  { key: 'education' as FilterType, label: 'Education', icon: GraduationCap },
  { key: 'projects' as FilterType, label: 'Projects', icon: Calendar },
];

const itemVariants = {
  initial: { opacity: 0, x: 20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-10%" },
};

export default function Timeline() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = timelineData.filter((e) => {
    if (filter === 'all') return true;
    if (filter === 'work') return e.type === 'work';
    if (filter === 'education') return e.type === 'education';
    if (filter === 'projects') return e.type === 'project';
    return true;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {filterConfig.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium font-body transition-all duration-200 ${
              filter === f.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-muted'
            }`}
          >
            {f.icon && <f.icon className="inline-block w-4 h-4 mr-1.5 -mt-0.5" strokeWidth={1.5} />}
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-primary/30" />

        {filtered.map((entry, i) => (
          <motion.div
            key={`${entry.title}-${i}`}
            initial={itemVariants.initial}
            whileInView={itemVariants.whileInView}
            viewport={itemVariants.viewport}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-8 last:mb-0"
          >
            {/* Node dot */}
            <div className="absolute -left-5 top-3 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />

            <div className="bg-card rounded-lg p-5 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground leading-tight">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{entry.subtitle}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap mt-1">
                  {entry.date}
                </span>
              </div>

              <ul className="space-y-1.5 mt-3">
                {entry.highlights.map((h, j) => (
                  <li key={j} className="text-sm text-secondary-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-1 shrink-0">▸</span>
                    <span className="max-w-[60ch]">{h}</span>
                  </li>
                ))}
              </ul>

              {entry.tags && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground border border-border font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
