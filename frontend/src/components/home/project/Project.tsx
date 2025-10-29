"use client";
import Header from "@/components/global/Header";
import React from "react";
import { ProjectTab } from "./projectTab";
import { Variants , motion} from "motion/react";

const Project = () => {
  return (
    <>
      <div className="mb-20">
        <div className="max-w-[95rem] mx-auto w-full px-4 md:px-6 lg:px-8">
          <Header colorText="Projects" normalText="My" />
          <ProjectTab />
          <div className="mt-8 md:mt-12 flex justify-center md:justify-end items-center">
            <SeeProjectsButton/>
          </div>
        </div>
      </div>
    </>
  );
};



const SeeProjectsButton = () => {
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
    <motion.div variants={itemVariants}>
      <motion.button
        className="group relative inline-flex items-center justify-center font-semibold rounded-full overflow-hidden shadow-md px-4 py-2 sm:px-6 sm:py-2.5 cursor-pointer text-sm sm:text-base"
        whileHover={{
          y: -2,
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full" />
        {/* Inner background */}
        <div className="absolute inset-[1px] bg-gray-900 rounded-full" />

        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Text */}
        <span className="relative z-10 mr-1.5 sm:mr-2 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent font-semibold">
          See all my projects
        </span>

        {/* Arrow icon */}
        <motion.svg
          className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          whileHover={{
            x: 4,
            transition: { duration: 0.3, ease: 'easeOut' },
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </motion.svg>
      </motion.button>
    </motion.div>
  );
};


export default Project;



