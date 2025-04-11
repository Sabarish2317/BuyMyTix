import { easeInOut } from "motion";
import { motion } from "motion/react";
import React from "react";
import Layout from "../components/Global/Layout";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import { MOVEMENT_DISTANCE } from "../utils/constants";
import AdSpace from "../components/Global/AdSpace";
import HistoryCard from "../components/HistoryPage/HistoryCard";
import { ticketData } from "./TicketDetailsPage";

const HistoryPage: React.FC = () => {
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
        className="main-container flex flex-col gap-2 md:gap-3"
      >
        <AdSpace />
        <div className="justify-start text-white text-[clamp(20px,2.5vw,28px)] select-none font-bold">
          Post History
        </div>
        <div className="create-new-post-container w-full bg-[#ffffff]/10 backdrop-blur-lg  rounded-lg flex flex-row justify-between items-center py-3 px-4">
          <div className="div flex flex-row gap-4">
            <img
              className="origin-left scale-90 md:scale-100"
              src="/icons/shining-star.svg"
              alt=""
            />
            <h3 className="justify-start text-white text-[clamp(16px,2vw,24px)] select-none font-regular">
              Create a new post to sell your ticket
            </h3>
          </div>
          <button
            className="bg-[#DC3912] text-[clamp(16px,2vw,20px)] text-white font-medium flex flex-row gap-3 py-2 px-3 rounded-md cursor-pointer scale-3d hover:scale-105 active:opacity-90 transition-all duration-200 ease-in-out"
            text-white
          >
            <img src="/icons/plus-icon.svg" alt="" />
            Create now
          </button>
        </div>
        <div className="history-cards-container  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full mt-1 md:mt-2 lg:mt-3">
          {ticketData.map((historyData, index) => (
            <HistoryCard key={index} />
          ))}
        </div>
      </motion.div>
    </Layout>
  );
};

export default HistoryPage;
