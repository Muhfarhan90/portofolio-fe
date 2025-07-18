import About from "../components/About";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import React from "react";
import Projects from "../components/Projects";

const Homepage = () => {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <About />
      <Projects />
    </div>
  );
};

export default Homepage;
