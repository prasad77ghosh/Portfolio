"use client";

import { Iphone } from "@/components/ui/iphone";
import { Marquee } from "@/components/ui/marquee";
import { Safari } from "@/components/ui/safari";
import { Tabs } from "@/components/ui/tabs";
import Image from "next/image";
import React from "react";

type TAB_DATA = {
  title: string;
  value: string;
  content: React.ReactNode;
};

export function ProjectTab() {
  const tabs: TAB_DATA[] = [
    {
      title: "Web Devs",
      value: "web-development",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-3 text-xl md:text-4xl font-bold text-white bg-card">
          <Marquee reverse pauseOnHover className="[--duration:50s]">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="w-[900px] cursor-pointer">
                  <Safari url="magicui.design" />
                </div>
              ))}
          </Marquee>
        </div>
      ),
    },
    {
      title: "Mobile Devs",
      value: "mobile-development",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-3 text-xl md:text-4xl font-bold text-white  bg-card">
          <Marquee reverse pauseOnHover className="[--duration:50s]">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <div className="w-[300px] cursor-pointer" key={index}>
                  <Iphone />
                </div>
              ))}
          </Marquee>
        </div>
      ),
    },
    {
      title: "AI/ML Projects",
      value: "ai-ml",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-card">
          <p>Playground tab</p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[43rem] [perspective:1000px] relative b flex flex-col mx-auto w-full  items-start justify-start mt-10">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/linear.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
