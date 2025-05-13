import React, { useEffect, useState } from "react";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import Layout from "../components/Global/Layout";
import HeroSection from "../components/LandingPage/HeroSection";
import HeroButtons from "../components/LandingPage/HeroButtons";
import AnimatedBento from "../components/LandingPage/AnimatedBento";
import { AnimatePresence } from "motion/react";
import SellTicketDialogBox from "../components/DialogBoxes/SellTicketsDialogBox";
import { ProfileResponse } from "../types/Profile";
import TickLoader from "../components/Global/LoadingIcon";
import { useProfile } from "../contexts/ProfileContext";
import PostNewTickDialogBox from "../components/DialogBoxes/CreateNewTicketDialogBox/PostNewTicketDialogBox";
import Howitworks from "../components/LandingPage/Howitworks";
import Reviews from "../components/LandingPage/Reviews";
import Footer from "../components/LandingPage/Footer";

const LandingPage: React.FC = () => {
  // Testing component
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F1") {
        e.preventDefault(); // prevent browser help menu
        togglePostNewTicketDialogBox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
  }, []);
  //toggle visiblity of the sell tickets instruction dialog box
  const [isSellTicketDialogBoxVisible, setSellTicketDialogBoxVisible] =
    useState(false);
  const toggleSellTicketDialogBox = () => {
    setSellTicketDialogBoxVisible((prev) => !prev);
  };

  const [isPostNewTicketDialogBoxVisible, setPostNewTicketDialogBoxVisible] =
    useState(false);
  const togglePostNewTicketDialogBox = () => {
    setPostNewTicketDialogBoxVisible((prev) => !prev);
  };

  //profile cntxt api
  const { userData, isLoading } = useProfile();

  if (isLoading)
    return (
      <Layout
        className=" w-screen h-screen flex justify-center self-center items-center bg-black "
        isHomePage={true}
      >
        <TickLoader />
      </Layout>
    );

  return (
    <Layout wrapperClassName="!w-full !flex !flex-col !max-w-[4000px] !px-0 !md:px-0 items-center !lg:px-[0px] !z-50">
      <TopNavigationBar
        className="max-w-[1490px] px-4 md:px-6 items-center lg:px-[42px] "
        userData={userData || ({} as ProfileResponse)}
      />
      <div className="home-page-layout flex flex-col  select-none w-screen ">
        <HeroSection />
        <HeroButtons
          showSellDialogBoxInstruction={setSellTicketDialogBoxVisible}
        />
        {/* create new ticket instrution dialog box */}
        <AnimatePresence mode="wait">
          {isSellTicketDialogBoxVisible && (
            <SellTicketDialogBox
              userData={userData || ({} as ProfileResponse)}
              setToggleDialogueBox={toggleSellTicketDialogBox}
              callBackToggle={togglePostNewTicketDialogBox}
            />
          )}
        </AnimatePresence>
        {/* New create ne wticket dialog box */}
        <AnimatePresence mode="wait">
          {isPostNewTicketDialogBoxVisible && (
            <PostNewTickDialogBox
              toggleDialogBox={togglePostNewTicketDialogBox}
            />
          )}
        </AnimatePresence>
        <AnimatedBento />
        <Howitworks
          showSellDialogBoxInstruction={setSellTicketDialogBoxVisible}
        />
        <Reviews />
        <Footer showSellDialogBoxInstruction={setSellTicketDialogBoxVisible} />
      </div>
    </Layout>
  );
};

export default LandingPage;
