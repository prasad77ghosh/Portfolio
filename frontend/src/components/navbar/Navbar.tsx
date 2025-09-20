"use client";
import links from "@/data/nav-data";
import { Menu, X, Settings } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import Logo from "./Logo";
import ThemeToggler from "./ThemeToggler";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  const buttonBase =
    "p-1.5 sm:p-2 rounded-lg bg-card border border-border backdrop-blur-md hover:bg-accent transition-colors";

  return (
    <motion.header
      className="sticky top-0 z-50 py-1 bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Logo />

          <NavLinks className="hidden md:flex items-center space-x-1 lg:space-x-8" />

          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggler buttonBase={buttonBase} />
            <motion.button
              className={`${buttonBase} hidden sm:flex`}
              whileTap={{ scale: 0.9 }}
            >
              <Settings size={18} className="text-foreground sm:w-5 sm:h-5" />
            </motion.button>

            <motion.button
              className={`${buttonBase} md:hidden`}
              onClick={() => setIsOpen((prev) => !prev)}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? (
                <X size={20} className="text-foreground sm:w-6 sm:h-6" />
              ) : (
                <Menu size={20} className="text-foreground sm:w-6 sm:h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-card backdrop-blur-md border-t border-border px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <NavLinks
              className="flex flex-col space-y-1 sm:space-y-2"
              onClick={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;

const NavLinks: React.FC<{
  className?: string;
  onClick?: () => void;
}> = ({ className = "", onClick = () => {} }) => {
  const [activeLink, setActiveLink] = useState("");

  const indicatorVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 400, damping: 30 },
    },
  };

  const linkVariants = (index: number) => ({
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.3 },
    },
  });

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  const handleLinkClick = useCallback(
    (href: string) => {
      setActiveLink(href);
      onClick();
    },
    [onClick]
  );

  return (
    <nav className={className}>
      {links.map((link, index) => {
        const isActive =
          activeLink === link.link ||
          (link.link === "/" && activeLink === "") ||
          (activeLink.startsWith(link.link) && link.link !== "/");

        return (
          <motion.a
            key={link.id}
            href={link.link}
            onClick={() => handleLinkClick(link.link)}
            className={`
              flex items-center gap-2 font-medium px-3 py-2 rounded-md relative
              transition-all duration-300
              ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }
            `}
            initial="hidden"
            animate="visible"
            variants={linkVariants(index)}
            whileHover={{ y: -2 }}
          >
            {link.icon}
            {link.title}

            {isActive && (
              <motion.div
                className={`
                  absolute rounded-full
                  ${
                    className.includes("flex-col")
                      ? "left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500"
                      : "-bottom-1 left-1/2 -translate-x-1/2 w-3 sm:w-6 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                  }
                `}
                initial="hidden"
                animate="visible"
                variants={indicatorVariants}
                layoutId="activeIndicator"
              />
            )}
          </motion.a>
        );
      })}
    </nav>
  );
};
