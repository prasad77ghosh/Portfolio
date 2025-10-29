"use client";
import { motion } from "motion/react";
import { memo } from "react";

const InteractiveParticles = memo(({
  mousePosition,
}: {
  mousePosition: { x: number; y: number };
}) => {
  return (
    <>
      {/* Hidden on mobile for better performance */}
      <motion.div
        className="hidden md:block absolute w-1 h-1 bg-purple-500/50 rounded-full"
        style={{
          left: `${50 + mousePosition.x * 2}%`,
          top: `${30 + mousePosition.y * 2}%`,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
      <motion.div
        className="hidden md:block absolute w-2 h-2 bg-pink-500/40 rounded-full"
        style={{
          left: `${30 + mousePosition.x * -1.5}%`,
          top: `${60 + mousePosition.y * 1.5}%`,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 15 }}
      />
    </>
  );
});

InteractiveParticles.displayName = "InteractiveParticles";

export default InteractiveParticles;
