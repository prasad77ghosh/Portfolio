"use client";

import { Iphone } from "@/components/ui/iphone";
import { Marquee } from "@/components/ui/marquee";
import { Safari } from "@/components/ui/safari";
import { Tabs } from "@/components/ui/tabs";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

type TAB_DATA = {
  title: string;
  value: string;
  content: React.ReactNode;
};

// =============================
// 🔹 Popover using Portal
// =============================
const MarqueeItemWithPopover = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Portal content
  const Popover = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="popover"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-[95%] sm:w-[85%] md:w-[75%] lg:w-[70%] h-[85%] md:h-[80%] p-4 md:p-6 lg:p-8"
            onClick={(e) => e.stopPropagation()} // Prevent close on inner click
            onMouseLeave={() => setIsOpen(false)}
          >
            {/* Empty large pop-up box */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className={`relative ${className}`} onClick={() => setIsOpen(true)}>
        {children}
      </div>

      {typeof window !== "undefined"
        ? createPortal(Popover, document.body)
        : null}
    </>
  );
};

// =============================
// 🔹 Main ProjectTab Component
// =============================
export function ProjectTab() {
  const tabs: TAB_DATA[] = [
    {
      title: "Web Devs",
      value: "web-development",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-base sm:text-xl md:text-4xl font-bold text-white bg-background">
          <Marquee reverse pauseOnHover className="[--duration:50s]">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <MarqueeItemWithPopover
                  key={index}
                  className="w-[260px] sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[900px] cursor-pointer"
                >
                  <Safari url="magicui.design" />
                </MarqueeItemWithPopover>
              ))}
          </Marquee>
        </div>
      ),
    },
    {
      title: "Mobile Devs",
      value: "mobile-development",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-base sm:text-xl md:text-4xl font-bold text-white bg-background">
          <Marquee reverse pauseOnHover className="[--duration:50s]">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <MarqueeItemWithPopover
                  key={index}
                  className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] cursor-pointer"
                >
                  <Iphone />
                </MarqueeItemWithPopover>
              ))}
          </Marquee>
        </div>
      ),
    },
    {
      title: "AI/ML Projects",
      value: "ai-ml",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-base sm:text-xl md:text-4xl font-bold text-white bg-background">
          <p>Playground tab</p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[22rem] sm:h-[28rem] md:h-[38rem] lg:h-[43rem] [perspective:1000px] relative flex flex-col mx-auto w-full items-start justify-start mt-4 sm:mt-6 md:mt-8 lg:mt-10">
      <Tabs tabs={tabs} />
    </div>
  );
}

// =============================
// 🔹 Dummy Content
// =============================
const DummyContent = () => {
  return (
    <Image
      src="/linear.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[50%] sm:h-[60%] md:h-[80%] lg:h-[90%] absolute -bottom-10 inset-x-0 w-[95%] sm:w-[90%] rounded-lg md:rounded-xl mx-auto"
    />
  );
};
