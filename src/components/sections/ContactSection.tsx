import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Github, Linkedin, Code2, Mail, MapPin, Loader2, CheckCircle } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlowingButton } from '@/components/ui/GlowingButton';
import { useToast } from '@/hooks/use-toast';

const terminalLines = [
  { text: '> whoami', delay: 0 },
  { text: 'Siddardha Chiluveru', delay: 0.3, color: 'primary' },
  { text: '> location', delay: 0.6 },
  { text: 'Hyderabad, India', delay: 0.9, color: 'secondary' },
  { text: '> status', delay: 1.2 },
  { text: 'Open to opportunities_', delay: 1.5, color: 'neon-green' },
];

const contactLinks = [
  { name: 'GitHub', icon: <Github className="w-5 h-5" />, url: 'https://github.com', color: '#ffffff' },
  { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com', color: '#0077b5' },
  { name: 'LeetCode', icon: <Code2 className="w-5 h-5" />, url: 'https://leetcode.com', color: '#ffa116' },
  { name: 'Email', icon: <Mail className="w-5 h-5" />, url: 'mailto:siddardha@example.com', color: '#00f5ff' },
];

const TerminalAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl overflow-hidden"
    >
      {/* Terminal header */}
      <div className="bg-muted px-4 py-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 text-sm text-muted-foreground font-mono">contact.sh</span>
      </div>

      {/* Terminal content */}
      <div className="p-6 font-mono text-sm space-y-2 min-h-[200px]">
        {terminalLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: line.delay }}
            viewport={{ once: true }}
            className={
              line.color === 'primary' ? 'text-primary' :
              line.color === 'secondary' ? 'text-secondary' :
              line.color === 'neon-green' ? 'text-neon-green' :
              'text-muted-foreground'
            }
          >
            {line.text}
            {i === terminalLines.length - 1 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-2 h-4 bg-primary ml-1"
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    toast({
      title: 'Message sent!',
      description: 'Thank you for reaching out. I\'ll get back to you soon.',
    });

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          accent="Contact"
          title="Let's Connect"
          subtitle="Ready to build something impactful together"
        />

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left side - Terminal & Links */}
          <div className="space-y-6">
            <TerminalAnimation />

            {/* Contact Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                Find me on
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {contactLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all group"
                    whileHover={{ x: 5 }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${link.color}20`, color: link.color }}
                    >
                      {link.icon}
                    </div>
                    <span className="font-medium text-foreground">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <MapPin className="w-5 h-5 text-primary" />
              <span>Hyderabad, Telangana, India</span>
            </motion.div>
          </div>

          {/* Right side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Terminal className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-foreground">Send a Message</h3>
                <p className="text-sm text-muted-foreground">I'll respond within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none text-foreground placeholder:text-muted-foreground"
                  placeholder="Tell me about your project or just say hi..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full px-6 py-4 rounded-xl font-display font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
                  isSubmitted
                    ? 'bg-neon-green text-space-dark'
                    : 'bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.5)]'
                }`}
                whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
            Let's Build Something{' '}
            <span className="text-primary text-glow-cyan">Impactful</span> Together
          </p>
          <p className="text-muted-foreground">
            Open to full-time opportunities, freelance projects, and collaborations
          </p>
        </motion.div>
      </div>
    </section>
  );
};
