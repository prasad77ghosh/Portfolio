"use client";
import React from "react";
import { motion, Variants } from "motion/react";

const Header = ({
  colorText,
  normalText,
}: {
  colorText: string;
  normalText: string;
}) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.h2
      className="text-5xl lg:text-6xl font-bold text-white leading-tight"
      variants={itemVariants}
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {normalText} {" "}
      </motion.span>
      <span className="relative inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {colorText}
        </motion.span>
        <motion.div
          className="absolute bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </span>
    </motion.h2>
  );
};

export default Header;
