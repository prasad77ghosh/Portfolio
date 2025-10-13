"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useCallback } from "react";
import { motion, Variants } from "motion/react";
import links from "@/data/nav-data"; // adjust the path

const NavLinks: React.FC<{
  className?: string;
  onClick?: () => void;
}> = ({ className = "", onClick = () => {} }) => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>(pathname);

  const indicatorVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 30 },
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

  const handleLinkClick = useCallback(
    (href: string) => {
      setActiveLink(href);
      console.log(activeLink)
      onClick();
    },
    [onClick]
  );

  return (
    <nav className={className}>
      {links.map((link, index) => {
        const isActive =
          pathname === link.link ||
          (link.link === "/" && pathname === "") ||
          (pathname.startsWith(link.link) && link.link !== "/");

        return (
          <motion.div
            key={link.id}
            initial="hidden"
            animate="visible"
            variants={linkVariants(index)}
          >
            <Link
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
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
};

export default NavLinks;
