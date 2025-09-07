"use client";
import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  MapPin,
  Calendar,
  Code,
  Palette,
  Database,
  Sparkles,
} from "lucide-react";

const PortfolioHero = () => {
  const skills = [
    { name: "React", icon: Code },
    { name: "Next.js", icon: Code },
    { name: "TypeScript", icon: Code },
    { name: "UI/UX", icon: Palette },
    { name: "Node.js", icon: Database },
    { name: "Tailwind", icon: Palette },
  ];

  const stats = [
    { number: "3+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "25+", label: "Happy Clients" },
    { number: "100%", label: "Success Rate" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-background"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-accent/10"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">
                Available for work
              </span>
            </div>

            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
                <span>Hi, I&apos;m </span>
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Prasad
                </span>
                <Sparkles className="inline-block w-6 h-6 text-primary animate-pulse ml-2" />
              </h1>
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-muted-foreground">
                Full Stack Developer & UI/UX Designer
              </h2>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              I craft exceptional digital experiences through clean code and
              thoughtful design.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                <span>3+ Years Experience</span>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-3">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border text-sm font-medium text-muted-foreground hover:scale-105 transition-all"
                  >
                    <Icon size={14} className="text-primary" />
                    <span>{skill.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold transition-all hover:scale-105">
                View My Work
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-border rounded-xl font-semibold hover:scale-105">
                <Download size={18} />
                Download CV
              </button>
            </div>

            {/* Socials */}
            <div className="flex justify-center lg:justify-start gap-4 pt-4">
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-3 rounded-xl bg-card border border-border text-muted-foreground hover:text-primary transition-all hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-card rounded-3xl border border-border"></div>
              <div className="absolute inset-4 bg-popover rounded-2xl flex items-center justify-center border border-border shadow-lg">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  P.G
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 max-w-xs sm:max-w-sm mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 rounded-xl bg-card border border-border text-center hover:scale-105 transition-all shadow"
                >
                  <div className="text-xl sm:text-2xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHero;
