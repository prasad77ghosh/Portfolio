"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  ArrowDown,
  Sparkles,
  Code,
  Zap,
} from "lucide-react";

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX - window.innerWidth / 2) * 0.01, 
        y: (e.clientY - window.innerHeight / 2) * 0.01 
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const socialLinks: SocialLink[] = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <div className="h-[calc(100vh-69px)] bg-background relative overflow-hidden">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/5 w-96 h-96 bg-gradient-to-r from-purple-500/15 via-pink-500/10 to-orange-400/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
            x: [0, 50, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-gradient-to-l from-orange-400/12 via-pink-500/8 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -40, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Interactive particles */}
        <motion.div
          className="absolute w-1 h-1 bg-purple-500/50 rounded-full"
          style={{
            left: `${50 + mousePosition.x * 2}%`,
            top: `${30 + mousePosition.y * 2}%`,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="absolute w-2 h-2 bg-pink-500/40 rounded-full"
          style={{
            left: `${30 + mousePosition.x * -1.5}%`,
            top: `${60 + mousePosition.y * 1.5}%`,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 15 }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-12 text-center lg:text-left">
            {/* Animated Status Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-orange-400/15 backdrop-blur-xl rounded-2xl border border-purple-500/10"
            >
              <motion.div
                className="flex items-center gap-2"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
              </motion.div>
              <span className="text-sm font-semibold text-foreground tracking-wide">
                Available for new opportunities
              </span>
            </motion.div>

            {/* Enhanced Main Heading */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="relative">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Hi, I&apos;m{" "}
                  <motion.span
                    className="relative inline-block"
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.span
                      className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-[length:200%_100%]"
                      animate={{
                        backgroundPosition: ["0%", "100%", "0%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      Prasad
                    </motion.span>
                    <motion.div
                      className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                    />
                  </motion.span>
                </h1>
                
                {/* Decorative elements around name */}
                <motion.div
                  className="absolute -top-2 -right-4 w-4 h-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              </div>

              <motion.h2
                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-muted-foreground"
                variants={itemVariants}
              >
                <span className="flex items-center gap-3 justify-center lg:justify-start">
                  <Code className="w-5 h-5 text-purple-500" />
                  Software Engineer & Developer
                  <Zap className="w-5 h-5 text-orange-400" />
                </span>
              </motion.h2>
            </motion.div>

            {/* Enhanced Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
            >
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 font-semibold">exceptional digital experiences</span> through 
              clean code, innovative solutions, and cutting-edge technologies. 
              Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 font-semibold">build something extraordinary</span> together.
            </motion.p>

            {/* Enhanced Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                className="group relative px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-xl font-semibold overflow-hidden shadow-lg"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
                <span className="relative flex items-center gap-2">
                  Get In Touch
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>

              <motion.button
                className="group px-8 py-3 border-2 border-purple-500/30 hover:border-purple-500 rounded-xl font-semibold text-foreground hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 hover:text-white transition-all duration-500 backdrop-blur-sm"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                  Download CV
                </span>
              </motion.button>
            </motion.div>

            {/* Enhanced Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="group relative p-3 rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-orange-400/20 backdrop-blur-sm hover:from-purple-500/30 hover:via-pink-500/20 hover:to-orange-400/30 transition-all duration-500 border border-purple-500/20 hover:border-pink-500/40"
                  whileHover={{ scale: 1.1, y: -3, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.15 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-accent-foreground group-hover:text-purple-500 transition-colors duration-300" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Enhanced Profile Image */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            variants={imageVariants}
          >
            <motion.div
              className="relative group"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                x: mousePosition.x * 5,
                y: mousePosition.y * 5,
              }}
            >
              {/* Main Profile Image - Blended with Background */}
              <div className="relative w-80 h-96 sm:w-[30rem] sm:h-[35rem] overflow-hidden rounded-3xl mb-14">
                <motion.img 
                  src="./profile_01.png" 
                  alt="Prasad - Software Engineer"
                  className="w-full h-full object-cover opacity-90"
                  whileHover={{ 
                    scale: 1.05,
                    opacity: 1,
                    filter: "brightness(1.05)"
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                
                {/* Background blend overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-primary/10 mix-blend-overlay" />
                
                {/* Subtle edge fade */}
                <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40" />
                
                {/* Dynamic hover overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-orange-400/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Enhanced Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                whileHover={{ scale: 1.2 }}
              >
                <Code className="w-5 h-5 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full shadow-lg flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.3, rotate: 180 }}
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                className="absolute top-1/3 -left-3 w-6 h-6 bg-gradient-to-br from-purple-500 to-orange-400 rounded-xl shadow-md"
                animate={{
                  x: [-5, 5, -5],
                  rotate: [0, 180, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

                {/* Particle effects around image */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-orange-400/40 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + i * 12}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-4 cursor-pointer group"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          whileHover={{ scale: 1.2 }}
        >
          <span className="text-xs text-muted-foreground font-bold tracking-[0.3em] group-hover:text-purple-500 transition-colors uppercase">
            Scroll Down
          </span>
          <motion.div
            className="w-[3px] h-10 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-400 rounded-full"
            animate={{
              scaleY: [1, 1.5, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <ArrowDown className="w-5 h-5 text-purple-500 group-hover:text-pink-500 transition-colors" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;