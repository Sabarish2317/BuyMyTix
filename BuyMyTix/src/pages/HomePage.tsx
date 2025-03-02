import React from "react";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import Layout from "../components/Global/Layout";
import HeroSection from "../components/HomePage/HeroSection";
import HeroButtons from "../components/HomePage/HeroButtons";

// interface HomePageProps {

// }

const HomePage: React.FC = () => {
  return (
    <Layout>
      <TopNavigationBar />
      <div className="home-page-layout flex flex-col gap-4">
        <HeroSection />
        <HeroButtons />
      </div>
    </Layout>
  );
};

export default HomePage;
