import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/**
 * Smooth scroll helper (NO routing, NO hashes)
 */
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const navItems = [
  { label: "About", id: "about" },
  { label: "Education", id: "education" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass py-3" : "py-5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("about")}
            className="text-2xl font-display font-bold text-foreground"
            whileHover={{ scale: 1.05 }}
          >
            SC<span className="text-neon-coral">.</span>
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-1/2 transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            onClick={() => scrollToSection("contact")}
            className="hidden md:inline-flex px-5 py-2.5 rounded-lg bg-neon-coral text-space-void font-medium text-sm hover:shadow-[0_0_30px_hsl(var(--neon-coral)/0.5)] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden pt-20"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-2xl font-display font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                onClick={() => {
                  scrollToSection("contact");
                  setIsMobileMenuOpen(false);
                }}
                className="mt-4 px-8 py-3 rounded-lg bg-neon-coral text-space-void font-medium text-lg glow-coral"
              >
                Get in Touch
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
