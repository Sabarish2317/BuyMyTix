import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ANIMATION_DURATION, MOVEMENT_DISTANCE } from "../../utils/constants";
import { LOGIN_PAGE, SIGNUP_PAGE } from "../../routes/appRoutes";
import ProfileDialogueBox from "./ProfileDialogueBox";
import LocationDialogBox from "./locationDialogBox";
import SellTicketDialogBox from "./SellTicketsDialogBox";
import CreateNewTicketDialogBox from "./CreateNewTicketDialogBox";
import { QueryClient } from "@tanstack/react-query";
import { ProfileResponse } from "../../types/Profile";
import ProfileImage from "./profileImage";

interface TopNavigationBarProps {
  userData: ProfileResponse;
}

// Top Navigation Bar Component
const TopNavigationBar: React.FC<TopNavigationBarProps> = ({ userData }) => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  queryClient.getMutationCache();
  //toggle visibility of the profile dialogues
  const [isProfileVisible, setProfileVisible] = useState(false); //animate aagraku ku ithu venum so rendu state managed
  const toggleProfileDialogueBox = () => {
    setProfileVisible((prev) => !prev);
  };
  //toggle visibility of the location dialogue box
  const [isCityDialogueVisible, setCityDialogueVisible] = useState(false);

  const toggleCityDialogueBox = () => {
    setCityDialogueVisible((prev) => !prev);
  };

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
  return (
    // Main navigation container
    <motion.div
      initial={{ opacity: 0, y: -MOVEMENT_DISTANCE }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: ANIMATION_DURATION,
        delay: ANIMATION_DURATION * 6,
        ease: "easeOut",
      }}
      className="top-navigation-bar w-full flex flex-row justify-between items-center py-5 cursor-default overflow-visible "
    >
      {/* Logo Section */}
      <div
        onClick={() => navigate("/home")}
        className="logo-padding w-full flex justify-start flex-row scale-3d hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200"
      >
        <img
          className="scale-75 md:scale-90 lg:scale-100 origin-left cursor-pointer"
          src="/icons/logo.svg"
          alt="logo"
        />
      </div>

      {/* Navigation Links - Hidden on mobile, visible on medium screens and larger */}
      <div className="navigation-links gap-8 flex-row hidden md:flex">
        <button
          onClick={() => navigate("/home")}
          className="home w-max text-[clamp(20px,2vw,24px)] text-white font-medium primary
         hover:scale-95 transition-all duration-200 active:scale-105 cursor-pointer"
        >
          Home
        </button>
        <button
          onClick={() => {
            const currentPath = window.location.pathname;
            if (currentPath === "/home") {
              window.scrollTo({ top: 400, behavior: "smooth" });
            } else {
              navigate("/home");
              setTimeout(() => {
                window.scrollTo({ top: 400, behavior: "smooth" });
              }, 100);
            }
          }}
          className="about-us w-max text-[clamp(20px,2vw,24px)] text-white
          hover:scale-95 transition-all duration-200 active:scale-105 cursor-pointer"
        >
          About us
        </button>
        <button
          onClick={toggleSellTicketDialogBox}
          className="help-and-support w-max text-[clamp(20px,2vw,24px)] text-white
          hover:scale-95 transition-all duration-200 active:scale-105 cursor-pointer"
        >
          Sell tickets
        </button>
      </div>

      {!userData.email ? (
        /* Action Buttons - Hidden on mobile and the user havent logeed inn*/
        <div className="action-buttons-container flex flex-row gap-6 items-center justify-end w-full">
          {/* Login Button (Only visible on large screens) */}
          <button
            className="login-button w-max text-[clamp(20px,2vw,24px)] text-white underline hidden lg:flex
         hover:scale-95 transition-all duration-200 active:scale-105 cursor-pointer"
            onClick={() => navigate(LOGIN_PAGE)}
          >
            Log in
          </button>
          {/* Get Started Button (Hidden on small screens, visible on medium+) */}
          <button
            className="get-started-button w-max bg-white px-3 py-2 md:px-4 md:py-3 rounded-md backdrop-blur-sm justify-center items-center gap-2.5 flex 
        hover:bg-white/80 hover:scale-95 transition-all duration-200 active:scale-105 active:bg-white cursor-pointer"
          >
            <h2
              className="text-[clamp(20px,2vw,24px)] text-black font-medium"
              onClick={() => navigate(SIGNUP_PAGE)}
            >
              Get started
            </h2>
          </button>
        </div>
      ) : (
        // Profile Button and locatin button (Only visible after loggin in both mobile and pc view)
        <div className="profile-location-container w-full  justify-end items-center gap-6 flex flex-row ">
          {/* location state */}
          <div
            className="location-container w-max flex-row gap-2 flex max-[1290px]:hidden cursor-pointer"
            onClick={toggleCityDialogueBox}
          >
            <img src="/icons/location-icon.svg" alt="" />
            <div
              className="login-button w-max  text- text-[clamp(20px,2vw,24px)] text-white
         hover:text-zinc-300 transition-all duration-200 active:text-zinc-400 cursor-pointer"
            >
              {userData.city
                ? userData.city + ", " + userData.state
                : "Select your city"}
            </div>
          </div>

          {/* Profile button with dropDown */}
          <div className="profile-container relative flex flex-row items-center justify-end ">
            <ProfileImage
              data={
                !userData.profileImage?.data ||
                userData.profileImage.data.trim().toLowerCase() !== "empty"
                  ? userData.profileImage.data
                  : "/icons/no-profile.png"
              }
              onClick={toggleProfileDialogueBox}
            />
            <button
              onClick={toggleProfileDialogueBox}
              style={{ rotate: isProfileVisible ? "180deg" : "0deg" }}
              className="w-5 ml-1.5 relative overflow-clip hover:scale-105 transition-all duration-200 ease-in-out active:scale-110 cursor-pointer"
            >
              <img
                src={
                  isProfileVisible
                    ? "/icons/down-arrow-orange.svg"
                    : "/icons/down-arrow.svg"
                }
                alt="expand"
              />
            </button>
            {/* overlay objects of top navigation bar which wll be hiddden until user prompts to upen it */}
            {/* sell tickets dialog box */}
            <AnimatePresence mode="wait">
              {isSellTicketDialogBoxVisible && (
                <SellTicketDialogBox
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
            {/* city select dialogie box */}
            <AnimatePresence mode="wait">
              {isCityDialogueVisible && (
                <LocationDialogBox
                  userData={userData}
                  setToggleDialogueBox={toggleCityDialogueBox}
                />
              )}
            </AnimatePresence>
            {/* profile dialogue box */}
            <AnimatePresence mode="wait">
              {isProfileVisible && <ProfileDialogueBox userData={userData} />}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Mobile Navigation - Includes hamburger menu */}
      {/* <button className="hamburger-menu w-max bg-white/8 rounded-[6px] px-3 flex md:hidden">
        <img className="h-10" src="/icons/hamburger-menu-icon.svg" alt="menu" />
      </button> */}
    </motion.div>
  );
};

export default TopNavigationBar;
