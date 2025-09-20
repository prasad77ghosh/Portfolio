"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";

interface ThemeTogglerProps {
  buttonBase: string;
}

export default function ThemeToggler({ buttonBase }: ThemeTogglerProps) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mark as mounted only on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent SSR render

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () =>
    setTheme(currentTheme === "dark" ? "light" : "dark");

  return (
    <motion.button
      className={buttonBase}
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {currentTheme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Sun size={18} className="text-foreground sm:w-5 sm:h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Moon size={18} className="text-foreground sm:w-5 sm:h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
