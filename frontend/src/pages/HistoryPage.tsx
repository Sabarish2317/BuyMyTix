import { easeInOut } from "motion";
import { motion } from "motion/react";
import React from "react";
import Layout from "../components/Global/Layout";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import { MOVEMENT_DISTANCE } from "../utils/constants";
import AdSpace from "../components/Global/AdSpace";
import HistoryCard from "../components/HistoryPage/HistoryCard";
import { ProfileResponse } from "../types/Profile";
import { useQuery } from "@tanstack/react-query";
import { getUserHistory } from "../queries/Tickets";
import TickLoader from "../components/Global/LoadingIcon";
import { useProfile } from "../contexts/ProfileContext";
import LoadingHistoryCard from "../components/LoadingSkeletons/LoadingHistoryCard";

const HistoryPage: React.FC = () => {
  const {
    isError: isProfileError,
    isLoading: isProfileLoading,
    userData,
  } = useProfile();

  const {
    data: historyData,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
    error: historyError,
  } = useQuery({
    queryKey: ["ticketHistory", localStorage.getItem("token")],
    queryFn: () => getUserHistory(),
    retry: 0,
    enabled: !!localStorage.getItem("token"),
  });

  if (isProfileLoading) {
    return (
      <Layout
        className="w-screen h-screen flex justify-center self-center items-center bg-black"
        isHomePage={true}
      >
        <TickLoader />
      </Layout>
    );
  }

  if (isProfileError) {
    return (
      <Layout
        className="w-screen h-screen flex justify-center self-center items-center bg-black"
        isHomePage={true}
      >
        <div className="error container flex flex-row gap-2 items-center justify-center h-screen ">
          {/* <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: easeInOut }}
            src="/images/cat-illustration.png"
            alt="sad"
          />
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.2, ease: easeInOut }}
            className="text-white text-[clamp(20px,2.5vw,32px)] font-semibold"
          >
            {isHistoryError ? String(historyError) : "Something went wrong"}
          </motion.h2> */}
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: easeInOut }}
            src="/images/page-not-found-illustration.svg"
            alt="sad"
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="bg-[linear-gradient(to_bottom,#0D0B11_10%,#261349_80%)]">
      <TopNavigationBar userData={userData as ProfileResponse} delay={0.2} />
      <motion.div
        initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2, ease: easeInOut }}
        className="main-container w-full flex flex-col gap-2 md:gap-3"
      >
        <AdSpace />
        <div className="justify-start text-white text-[clamp(20px,2.5vw,28px)] select-none font-semibold">
          Post History
        </div>

        {isHistoryLoading ? (
          <div className="history-cards-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full mt-1 md:mt-2 lg:mt-3">
            {[...Array(10)].map((_, i) => (
              <LoadingHistoryCard key={i} />
            ))}
          </div>
        ) : historyData?.length === 0 || isHistoryError || historyError ? (
          <div className="history-cards-container items-start justify-center  flex overflow-visible mb-12">
            <img
              className="scale-[60%] origin-top"
              src="/images/tickets-not-found-illustration.svg"
              alt="tickets-not-found-illustration "
            />
          </div>
        ) : (
          <div className="history-cards-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full mt-1 md:mt-2 lg:mt-3">
            {historyData?.map((listing) => (
              <HistoryCard
                userData={userData || ({} as ProfileResponse)}
                key={listing.ticketDetails._id}
                userTicketHistory={listing}
              />
            ))}
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default HistoryPage;
