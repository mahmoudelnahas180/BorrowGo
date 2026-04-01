import React from "react";
import HeroSection from "@/components/HeroSection";
import Categories from "@/components/Categoris";
import BestTool from "@/components/BestTool";
import HowItWorks from "@/components/HowItWorks";

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <BestTool />
      <HowItWorks />
    </>
  );
};

export default Home;
