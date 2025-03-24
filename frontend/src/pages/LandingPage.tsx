import React from "react";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import Layout from "../components/Global/Layout";
import HeroSection from "../components/LandingPage/HeroSection";
import HeroButtons from "../components/LandingPage/HeroButtons";
import AnimatedBento from "../components/LandingPage/AnimatedBento";

// interface LandingPageProps {

// }

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <TopNavigationBar isLoggedIn={true} />
      <div className="home-page-layout flex flex-col gap-4">
        <HeroSection />
        <HeroButtons />
        <AnimatedBento />
      </div>
    </Layout>
  );
};

export default LandingPage;
