import React from "react";
import Layout from "../components/Global/Layout";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import SearchBar from "../components/Global/SearchBar";
import DetailCard from "../components/Global/DetailCard";
import { motion } from "motion/react";
import { MOVEMENT_DISTANCE } from "../utils/constants";
import { easeInOut } from "motion";

// interface HomePageProps {}

const HomePage: React.FC = () => {
  return (
    <Layout className="bg-[linear-gradient(to_right,#0D0B11_10%,#261349_80%)]">
      <TopNavigationBar isLoggedIn={true} />
      <motion.div
        initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          ease: easeInOut,
        }}
        className="main-container"
      >
        <img
          className="w-full h-[250px] object-cover rounded-2xl origin-top"
          src="/images/ad-space.png"
          alt="google-ads"
        />
        {/* Search bar with filters */}
        <div className="margin relative my-4 h-[56px]">
          <SearchBar type="movie" />
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
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="vidanc"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
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
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
            <DetailCard
              forwardUrl="c"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
            ></DetailCard>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default HomePage;
