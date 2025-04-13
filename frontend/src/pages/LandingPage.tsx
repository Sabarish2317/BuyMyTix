import React, { useState } from "react";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import Layout from "../components/Global/Layout";
import HeroSection from "../components/LandingPage/HeroSection";
import HeroButtons from "../components/LandingPage/HeroButtons";
import AnimatedBento from "../components/LandingPage/AnimatedBento";
import { AnimatePresence } from "motion/react";
import SellTicketDialogBox from "../components/DialogBoxes/SellTicketsDialogBox";
import CreateNewTicketDialogBox from "../components/DialogBoxes/CreateNewTicketDialogBox";
import { ProfileResponse } from "../types/Profile";
import TickLoader from "../components/Global/LoadingIcon";
import { useProfile } from "../contexts/ProfileContext";

const LandingPage: React.FC = () => {
  //toggle visiblity of the sell tickets instruction dialog box
  const [isSellTicketDialogBoxVisible, setSellTicketDialogBoxVisible] =
    useState(false);
  const toggleSellTicketDialogBox = () => {
    setSellTicketDialogBoxVisible((prev) => !prev);
  };
  //toggles visiblity of the create new ticket dialog box
  const [isCreateTicketDialogBoxVisible, setCreateTicketDialogBoxVisible] =
    useState(false);
  const toggleCreateTicketDialogBox = () => {
    setCreateTicketDialogBoxVisible((prev) => !prev);
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
    <Layout>
      <TopNavigationBar userData={userData || ({} as ProfileResponse)} />
      <div className="home-page-layout flex flex-col gap-4 select-none">
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
              callBackToggle={toggleCreateTicketDialogBox}
            />
          )}
        </AnimatePresence>
        {/* create new ticket dialog box */}
        <AnimatePresence mode="wait">
          {isCreateTicketDialogBoxVisible && (
            <CreateNewTicketDialogBox
              closeDialogBox={toggleCreateTicketDialogBox}
            />
          )}
        </AnimatePresence>
        <AnimatedBento />
      </div>
    </Layout>
  );
};

export default LandingPage;
