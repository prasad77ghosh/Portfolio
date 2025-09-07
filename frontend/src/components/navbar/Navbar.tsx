"use client";
import React, { useState, useEffect } from "react";
import {
  User,
  BookOpen,
  FileText,
  Briefcase,
  FolderOpen,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

const navItems = [
  { name: "About", icon: User },
  { name: "Blog", icon: BookOpen },
  { name: "Notes", icon: FileText },
  { name: "Portfolio", icon: Briefcase },
  { name: "Project", icon: FolderOpen },
];

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("About");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <Sparkles className="text-white" size={18} />
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-wide bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                P.G
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => setActiveItem(item.name)}
                  className={`relative flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "text-primary after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-md text-muted-foreground hover:text-primary transition-all duration-200">
              <Settings size={18} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-muted-foreground hover:text-primary transition-all duration-200"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-primary transition-all duration-200"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        } overflow-hidden`}
      >
        <div className="bg-card/95 backdrop-blur-xl border-t border-border">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = activeItem === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveItem(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-secondary text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
