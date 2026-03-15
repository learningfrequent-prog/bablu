import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

interface WorkEntry {
  title: string;
  company: string;
  date: string;
  highlights: string[];
  tags: string[];
}

const workData: WorkEntry[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Publicis Sapient, Bengaluru',
    date: 'Aug 2023 – Present',
    highlights: [
      'Reduced claim adjudication from 7 days to 7 minutes via Spring Batch tuning',
      'Designed Microservices processing 14M+ claims with real-time SLAs',
      'Deployed HPA-enabled K8s clusters — 99.99% availability under peak load',
    ],
    tags: ['Java', 'Spring Boot', 'Kubernetes', 'GitHub Actions', 'Microservices'],
  },
  {
    title: 'Software Engineer',
    company: 'Volkswagen IT Services India, Gurugram',
    date: 'Aug 2021 – Aug 2023',
    highlights: [
      'Architected Kafka pipelines handling 50K+ msg/sec, P99 < 200ms',
      'Boosted throughput by 25%, cut GC pauses by 60ms',
      '3× Instapat Awards for defect-free, on-time releases',
    ],
    tags: ['Kafka', 'React', 'Angular', 'Spring Boot', 'SonarQube'],
  },
  {
    title: 'Senior Analyst',
    company: 'Capgemini, Mumbai',
    date: 'Sep 2019 – May 2021',
    highlights: [
      'Developed 5 reusable Java modules adopted across multiple teams',
      'Increased delivery accuracy by 25% through domain-driven design',
      'Lowered post-release defects by 15% via TDD & CI pipelines',
    ],
    tags: ['Java', 'REST APIs', 'JUnit', 'CI/CD', 'DDD'],
  },
];

export default function WorkTimeline() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-10 h-10 rounded-lg bg-work/15 flex items-center justify-center">
          <Briefcase size={20} strokeWidth={1.5} className="text-work" />
        </div>
        <h2 className="font-display text-2xl font-extrabold text-foreground">Experience</h2>
      </motion.div>

      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-work/60 via-work/30 to-transparent" />

        {workData.map((entry, i) => (
          <motion.div
            key={entry.company}
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              duration: 0.6,
              delay: i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative mb-8 last:mb-0 group"
          >
            {/* Node */}
            <motion.div
              className="absolute -left-5 top-4 w-3 h-3 rounded-full bg-work border-2 border-background shadow-[0_0_12px_hsl(var(--work-accent)/0.5)]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: i * 0.12 + 0.2 }}
            />

            <motion.div
              className="bg-card rounded-xl p-5 border border-border shadow-[var(--shadow-card)] transition-all duration-300 group-hover:border-work/30 group-hover:shadow-[0_0_20px_hsl(var(--work-accent)/0.1)]"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex items-start justify-between gap-3 mb-1">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground leading-tight">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-work mt-0.5 font-medium">{entry.company}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap mt-1 bg-secondary px-2 py-1 rounded">
                  {entry.date}
                </span>
              </div>

              <ul className="space-y-1.5 mt-3">
                {entry.highlights.map((h, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + j * 0.05 + 0.3 }}
                    className="text-sm text-secondary-foreground leading-relaxed flex gap-2"
                  >
                    <span className="text-work mt-0.5 shrink-0">▸</span>
                    <span className="max-w-[60ch]">{h}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-xs rounded-full bg-work/10 text-work/80 border border-work/20 font-mono"
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
