"use client";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";

interface ThemeTogglerProps {
  buttonBase: string;
}

export default function ThemeToggler({ buttonBase }: ThemeTogglerProps) {
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    if (!currentTheme) return;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      className={buttonBase}
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait">
        {currentTheme && (
          <motion.div
            key={currentTheme}
            initial={{ opacity: 0, x: currentTheme === "dark" ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentTheme === "dark" ? 10 : -10 }}
            transition={{ duration: 0.25 }}
          >
            {currentTheme === "dark" ? (
              <Sun size={18} className="text-foreground sm:w-5 sm:h-5" />
            ) : (
              <Moon size={18} className="text-foreground sm:w-5 sm:h-5" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
