import React from "react";
import Layout from "../components/Global/Layout";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import SearchBar from "../components/Global/SearchBar";
import DetailCard from "../components/Global/DetailCard";
import { motion } from "motion/react";
import { MOVEMENT_DISTANCE } from "../utils/constants";
import { easeInOut } from "motion";
import AdSpace from "../components/Global/AdSpace";
import { ProfileResponse } from "../types/Profile";

// interface HomePageProps {}

const HomePage: React.FC = () => {
  return (
    <Layout className="bg-[linear-gradient(to_right,#0D0B11_10%,#261349_80%)]">
      <TopNavigationBar userData={{} as ProfileResponse} />
      <motion.div
        initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          ease: easeInOut,
        }}
        className="main-container w-full"
      >
        <AdSpace />
        {/* Search bar with filters */}
        <div className="margin relative my-4 h-[56px]">
          <SearchBar />
        </div>
        {/* popular movies */}
        <div className="popular-movies-row flex flex-col gap-4 mt-4 h-max ">
          <div className="justify-center text-[clamp(18px,3vw,28px)] text-white font-regular">
            Popular Movies in your region
          </div>
          <div className="movies-row flex flex-row gap-6 h-max overflow-hidden overflow-x-scroll ">
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="vidanc"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
          </div>
        </div>
        {/* Popular concerts */}
        <div className="popular-movies-row flex flex-col gap-4 mt-4 h-max">
          <div className="justify-center text-[clamp(18px,3vw,28px)] text-white font-regular">
            Popular Concert in your region
          </div>
          <div className="movies-row flex flex-row gap-6 h-max overflow-hidden overflow-x-scroll ">
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default HomePage;
