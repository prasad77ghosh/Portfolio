import About from "@/components/home/about/About";
import Hero from "@/components/home/hero/Hero";
import Project from "@/components/home/project/Project";
import React from "react";

const Home = () => {
  return (
    <>
      <Hero />
      <About/>
      <Project/>
    </>
  );
};

export default Home;
