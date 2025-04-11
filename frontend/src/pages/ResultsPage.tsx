import { easeInOut } from "motion";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import DetailCard from "../components/Global/DetailCard";
import Layout from "../components/Global/Layout";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import SearchBar from "../components/Global/SearchBar";
import { MOVEMENT_DISTANCE } from "../utils/constants";
import FilterDialogBox from "../components/DialogBoxes/FilterDialogueBox/FilterDialogBox";
import AdSpace from "../components/Global/AdSpace";

const ResultsPage: React.FC = () => {
  const [isFilterDialogBoxVisible, ToggleDialogueBoxVisiblity] =
    useState(false);
  return (
    <Layout className="bg-[linear-gradient(to_bottom,#0D0B11_10%,#261349_80%)]">
      <TopNavigationBar isLoggedIn={true} />
      <motion.div
        initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          ease: easeInOut,
        }}
        className="main-container overflow-visible"
      >
        <AdSpace />
        {/* Search bar with filters */}
        <div className="margin relative my-4 h-[56px]">
          <SearchBar type="movie" />
        </div>

        {/* filters panel */}
        <div className="filters-panel">
          <h3
            onClick={() => ToggleDialogueBoxVisiblity(true)}
            className="text-[clamp(18px,2.5vw,24px)] text-[#DC3912] font-semibold scale-3d hover:scale-102 hover:opacity-80 active:scale-100 active:opacity-100 transition-all duration-200 origin-left cursor-pointer"
          >
            Add filter
          </h3>
        </div>

        <AnimatePresence mode="wait">
          {isFilterDialogBoxVisible && (
            <FilterDialogBox
              setToggleDialogueBox={ToggleDialogueBoxVisiblity}
            />
          )}
        </AnimatePresence>

        {/* popular movies */}
        <div className="popular-movies-row flex flex-col gap-4 mt-4 h-max">
          <div className="justify-center text-[clamp(18px,3vw,28px)] text-white font-regular">
            Popular Movies in your region
          </div>
          <div className="movies-row flex flex-row gap-6 h-max overflow-hidden overflow-x-scroll ">
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="vidanc"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
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
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
              imgSrc="/images/vidamuyarchi.png"
              title="Vidamuyarchi"
              className="min-w-25 md:min-w-30 lg:min-w-35"
            ></DetailCard>
            <DetailCard
              forwardUrl="/moreInfo/:id=1"
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

export default ResultsPage;
