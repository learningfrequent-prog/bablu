import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Send, CheckCircle, MessageSquare } from 'lucide-react';

const intents = [
  { label: 'Hiring', emoji: '💼' },
  { label: 'Speaking', emoji: '🎤' },
  { label: 'Coffee Chat', emoji: '☕' },
];

const springConfig = { type: "spring" as const, stiffness: 300, damping: 30 };

export default function ContactFAB() {
  const [open, setOpen] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOpen(false);
      setSelectedIntent(null);
      setName('');
      setEmail('');
      setMessage('');
    }, 2000);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[var(--shadow-elevated)]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={springConfig}
      >
        <MessageSquare size={22} strokeWidth={1.5} />
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={springConfig}
              className="fixed bottom-24 right-6 z-50 w-[min(380px,calc(100vw-3rem))] bg-card border border-border rounded-xl p-6 shadow-[var(--shadow-elevated)]"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-lg font-bold text-foreground">Get in Touch</h3>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {sent ? (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={springConfig}
                  className="flex flex-col items-center py-8"
                >
                  <CheckCircle className="text-primary mb-3" size={48} strokeWidth={1.5} />
                  <p className="font-display font-bold text-foreground">Message Sent!</p>
                  <p className="text-sm text-muted-foreground mt-1">I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Intent */}
                  <div>
                    <label className="text-xs text-muted-foreground font-mono block mb-2">What brings you here?</label>
                    <div className="flex gap-2">
                      {intents.map((intent) => (
                        <button
                          key={intent.label}
                          type="button"
                          onClick={() => setSelectedIntent(intent.label)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                            selectedIntent === intent.label
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground hover:bg-muted'
                          }`}
                        >
                          {intent.emoji} {intent.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary text-foreground border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary text-foreground border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <textarea
                    placeholder="Brief message..."
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary text-foreground border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={springConfig}
                    className="w-full h-11 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <Send size={16} strokeWidth={1.5} />
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
