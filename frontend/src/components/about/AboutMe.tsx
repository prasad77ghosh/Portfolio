'use client';

import { motion, Variants } from 'motion/react';
import { useEffect, useState } from 'react';

const AboutMe = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const credentials = [
    { number: 50, label: 'Projects Completed', suffix: '+' },
    { number: 3, label: 'Years Experience', suffix: '+' },
    { number: 25, label: 'Happy Clients', suffix: '+' },
    { number: 100, label: 'Code Commits', suffix: '%' },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const numberVariants: Variants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  // Floating dots like in hero section
  const FloatingDot = ({ size, color, delay, duration }: { size: string, color: string, delay: number, duration: number }) => (
    <motion.div
      className={`absolute ${size} ${color} rounded-full blur-sm opacity-60`}
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -100, 50, 0],
        scale: [1, 1.5, 0.8, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );

  return (
    <section className="relative overflow-hidden">
      {/* Floating decorative dots */}
      <div className="absolute inset-0">
        <FloatingDot size="w-3 h-3" color="bg-purple-500" delay={0} duration={8} />
        <FloatingDot size="w-2 h-2" color="bg-pink-500" delay={1} duration={10} />
        <FloatingDot size="w-4 h-4" color="bg-orange-400" delay={2} duration={12} />
        <FloatingDot size="w-2 h-2" color="bg-purple-400" delay={3} duration={9} />
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-purple-500 rounded-full opacity-40" />
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-pink-500 rounded-full opacity-50" />
        <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-orange-400 rounded-full opacity-30" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-purple-400 rounded-full opacity-60" />
      </div>

      <div className="relative z-10 flex items-center justify-center px-6 py-16">
        <motion.div
          className="max-w-7xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image */}
            <motion.div
              variants={imageVariants}
              className="relative order-2 lg:order-1"
            >
              <div className="relative w-full max-w-lg mx-auto lg:mx-0">
                {/* Gradient background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-400/20 rounded-3xl transform rotate-6 scale-105 -z-10 blur-xl" />
                
                {/* Image container with dark theme */}
                <div className="relative overflow-hidden rounded-3xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-1">
                  <div className="rounded-2xl overflow-hidden bg-gray-800/30">
                    <motion.img
                      src="./profile_03.png"
                      alt="Profile picture"
                      width={500}
                      height={600}
                      className="w-full h-auto object-cover"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  
                  {/* Subtle overlay */}
                  <div className="absolute inset-1 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating icon like in hero */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/25"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <span className="text-xl">⚡</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <div className="space-y-10 order-1 lg:order-2">
              <motion.div variants={itemVariants} className="space-y-8">
                <motion.h2 
                  className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                  variants={itemVariants}
                >
                  About{' '}
                  <span className="relative inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                    Me
                    <motion.div
                      className="absolute bottom-1 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </span>
                </motion.h2>

                <motion.div variants={itemVariants} className="space-y-6">
                  <motion.p 
                    className="text-gray-300 text-lg leading-relaxed max-w-2xl"
                    variants={itemVariants}
                  >
                    I&apos;m a passionate full-stack developer with expertise in crafting{' '}
                    <span className="text-purple-400 font-medium">exceptional digital experiences</span>{' '}
                    through clean code, innovative solutions, and cutting-edge technologies.
                    My journey has been driven by curiosity and a constant desire to learn and grow.
                  </motion.p>

                  <motion.p 
                    className="text-gray-400 leading-relaxed max-w-2xl"
                    variants={itemVariants}
                  >
                    When I&apos;m not coding, you can find me exploring new technologies, contributing to 
                    open-source projects, or sharing knowledge with the developer community. Let&apos;s{' '}
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-medium">
                      build something extraordinary
                    </span>{' '}
                    together.
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Credentials Grid */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-2 gap-4"
              >
                {credentials.map((cred, index) => (
                  <motion.div
                    key={cred.label}
                    variants={numberVariants}
                    className="relative group"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="relative text-center p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
                      <motion.div 
                        className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-2"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.1 + 0.8,
                          type: 'spring',
                          stiffness: 200 
                        }}
                        viewport={{ once: true }}
                      >
                        {cred.number}{cred.suffix}
                      </motion.div>
                      <div className="text-sm text-gray-400 font-medium">
                        {cred.label}
                      </div>
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Call to Action Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  className="group relative inline-flex items-center px-8 py-4 text-white font-semibold rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-2xl" />
                  <div className="absolute inset-[1px] bg-gray-900 rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <span className="relative z-10 mr-3 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent font-bold">
                    Know More About Me
                  </span>
                  <motion.svg
                    className="relative z-10 w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator like in hero */}
      {/* <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll Down</span>
          <div className="w-px h-8 bg-gradient-to-b from-purple-500 to-transparent" />
          <motion.div
            className="w-2 h-2 bg-purple-500 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div> */}
    </section>
  );
};

export default AboutMe;