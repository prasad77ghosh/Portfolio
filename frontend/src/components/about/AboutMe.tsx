"use client";

import { motion, Variants } from "motion/react";
import { useEffect, useState } from "react";

// Types
interface FloatingDotProps {
  size: string;
  color: string;
  delay: number;
  initialX?: number;
  initialY?: number;
}

interface Credential {
  number: number;
  label: string;
  suffix: string;
}

interface CounterResult {
  count: number;
  setIsVisible: (visible: boolean) => void;
}

// Elegant floating elements with subtle movement
const FloatingDot = ({
  size,
  color,
  delay,
  initialX = 0,
  initialY = 0,
}: FloatingDotProps) => (
  <motion.div
    className={`absolute ${size} ${color} rounded-full opacity-20`}
    style={{ left: `${initialX}%`, top: `${initialY}%` }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.1, 0.3, 0.1],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Background elements component
const BackgroundElements = () => (
  <div className="absolute inset-0 overflow-hidden">
    <FloatingDot
      size="w-2 h-2"
      color="bg-purple-500"
      delay={0}
      initialX={15}
      initialY={25}
    />
    <FloatingDot
      size="w-1.5 h-1.5"
      color="bg-pink-500"
      delay={2}
      initialX={85}
      initialY={20}
    />
    <FloatingDot
      size="w-3 h-3"
      color="bg-orange-400"
      delay={1}
      initialX={75}
      initialY={65}
    />
    <FloatingDot
      size="w-1.5 h-1.5"
      color="bg-purple-400"
      delay={3}
      initialX={25}
      initialY={75}
    />
    <FloatingDot
      size="w-2 h-2"
      color="bg-pink-400"
      delay={4}
      initialX={90}
      initialY={80}
    />

    {/* Subtle gradient overlays */}
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 via-transparent to-orange-400/5"
      animate={{ opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

// Profile image component
const ProfileImage = ({ parallaxEffect }: { parallaxEffect: { x: number; y: number } }) => {
  const imageVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      variants={imageVariants}
      className="relative order-2 lg:order-1"
      animate={parallaxEffect}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="relative w-full max-w-lg mx-auto lg:mx-0">
        {/* Elegant background decoration */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-pink-500/15 to-orange-400/15 rounded-3xl transform rotate-3 scale-105 -z-10 blur-2xl"
          animate={{
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Professional image container */}
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gray-900/40 backdrop-blur-sm border border-gray-700/30 p-1"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.4, ease: "easeOut" }
          }}
        >
          <div className="rounded-2xl overflow-hidden bg-gray-800/20">
            <motion.img
              src="./profile_03.png"
              alt="Profile picture"
              width={500}
              height={600}
              className="w-full h-auto object-cover"
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.6, ease: "easeOut" }
              }}
            />
          </div>

          {/* Subtle overlay */}
          <div className="absolute inset-1 rounded-2xl bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Refined floating icon */}
        <motion.div
          className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/20"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3 }
          }}
        >
          <span className="text-lg">⚡</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Content section with typography
const ContentSection = () => {
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
    <div className="space-y-10 order-1 lg:order-2">
      <motion.div variants={itemVariants} className="space-y-8">
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
            About{" "}
          </motion.span>
          <span className="relative inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Me
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

        <motion.div variants={itemVariants} className="space-y-6">
          <motion.p
            className="text-gray-300 text-lg leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I&apos;m a passionate full-stack developer with expertise in crafting{" "}
            <span className="text-purple-400 font-medium">
              exceptional digital experiences
            </span>{" "}
            through clean code, innovative solutions, and cutting-edge technologies. My journey has been driven by curiosity and a constant desire to learn and grow.
          </motion.p>

          <motion.p
            className="text-gray-400 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. Let&apos;s{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-medium">
              build something extraordinary
            </span>{" "}
            together.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Credentials grid component
const CredentialsGrid = ({ credentials, counters }: { credentials: Credential[]; counters: CounterResult[] }) => {
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

  const numberVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-2 gap-6"
    >
      {credentials.map((cred, index) => {
        const { count, setIsVisible } = counters[index];

        return (
          <motion.div
            key={cred.label}
            variants={numberVariants}
            className="relative group"
            whileHover={{
              y: -4,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            onViewportEnter={() => setIsVisible(true)}
            viewport={{ once: true, amount: 0.8 }}
          >
            <motion.div
              className="relative text-center p-6 rounded-2xl bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 hover:border-gray-600/50 transition-all duration-400"
              whileHover={{
                backgroundColor: "rgba(17, 24, 39, 0.4)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1 + 1.0,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              >
                {count}{cred.suffix}
              </motion.div>
              <motion.div
                className="text-sm text-gray-400 font-medium"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1 + 1.3,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              >
                {cred.label}
              </motion.div>

              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// Call-to-action button component
const CTAButton = () => {
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
        className="group relative inline-flex items-center px-8 py-4 text-white font-semibold rounded-2xl overflow-hidden"
        whileHover={{
          y: -2,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        viewport={{ once: true }}
      >
        {/* Professional gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-2xl" />
        <div className="absolute inset-[1px] bg-gray-900 rounded-2xl" />

        {/* Subtle hover glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Professional text */}
        <span className="relative z-10 mr-3 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent font-bold">
          Know More About Me
        </span>

        {/* Refined arrow */}
        <motion.svg
          className="relative z-10 w-5 h-5 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          whileHover={{
            x: 4,
            transition: { duration: 0.3, ease: "easeOut" }
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

const AboutMe = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  console.log("Mouse_Position--->", mousePosition);

  const credentials = [
    { number: 50, label: "Projects Completed", suffix: "+" },
    { number: 3, label: "Years Experience", suffix: "+" },
    { number: 25, label: "Happy Clients", suffix: "+" },
    { number: 100, label: "Code Commits", suffix: "%" },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Professional animation variants with elegant timing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };


  // Elegant counter animation hook
  const useCounter = (end: number, duration: number = 3) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

        // Smooth easing function for elegant counting
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return { count, setIsVisible };
  };

  // Counter states for each credential
  const counter1 = useCounter(50, 3);
  const counter2 = useCounter(3, 3);
  const counter3 = useCounter(25, 3);
  const counter4 = useCounter(100, 3);
  const counters = [counter1, counter2, counter3, counter4];

  // Subtle parallax effect for professional feel
  const parallaxEffect = {
    x: (mousePosition.x - (typeof window !== "undefined" ? window.innerWidth / 2 : 0)) * 0.008,
    y: (mousePosition.y - (typeof window !== "undefined" ? window.innerHeight / 2 : 0)) * 0.008,
  };

  return (
    <section className="relative overflow-hidden" data-scroll-section>
      <BackgroundElements />

      <motion.div
        className="relative z-10 flex items-center justify-center px-6 py-16"
        animate={parallaxEffect}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      >
        <motion.div
          className="max-w-7xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image */}
            <div data-scroll data-scroll-speed="0.2">
              <ProfileImage parallaxEffect={parallaxEffect} />
            </div>

            {/* Right Side - Content */}
            <div className="space-y-10 order-1 lg:order-2">
              <div data-scroll data-scroll-speed="0.1">
                <ContentSection />
              </div>
              <div data-scroll data-scroll-speed="0.15">
                <CredentialsGrid credentials={credentials} counters={counters} />
              </div>
              <div data-scroll data-scroll-speed="0.05">
                <CTAButton />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
