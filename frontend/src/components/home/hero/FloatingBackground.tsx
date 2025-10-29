'use client'
import {motion} from "motion/react"
import { memo } from "react"

const FloatingBackgroundGradient = memo(() => {
  return (
    <>
      <motion.div
        className="absolute top-1/4 left-1/5 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-r from-purple-500/20 via-pink-500/15 to-orange-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.35, 0.7, 0.35],
          x: [0, 60, -40, 0],
          y: [0, -30, 20, 0],
          rotate: [0, 15, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/5 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-gradient-to-l from-orange-400/20 via-pink-500/10 to-purple-500/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, -50, 30, 0],
          y: [0, 25, -15, 0],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Optional extra subtle glow blob - hidden on mobile for performance */}
      <motion.div
        className="hidden md:block absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-tr from-blue-400/10 via-teal-400/10 to-emerald-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.45, 0.2],
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
});

FloatingBackgroundGradient.displayName = "FloatingBackgroundGradient";

export default FloatingBackgroundGradient