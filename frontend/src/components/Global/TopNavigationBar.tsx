import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ANIMATION_DURATION, MOVEMENT_DISTANCE } from "../../utils/constants";
import { LANDING_PAGE, LOGIN_PAGE, SIGNUP_PAGE } from "../../routes/appRoutes";
import ProfileDialogueBox from "../DialogBoxes/ProfileDialogueBox";
import LocationDialogBox from "../DialogBoxes/locationDialogBox";
import SellTicketDialogBox from "../DialogBoxes/SellTicketsDialogBox";
import { ProfileResponse } from "../../types/Profile";
import ProfileImage from "./profileImage";
import PostNewTickDialogBox from "../DialogBoxes/CreateNewTicketDialogBox/PostNewTicketDialogBox";
import { useProfile } from "../../contexts/ProfileContext";
import SettingsDialogBox from "../DialogBoxes/SettingsDialogBox";

interface TopNavigationBarProps {
  userData: ProfileResponse; // response from parent from context
  delay?: number;
}

// Top Navigation Bar Component
const TopNavigationBar: React.FC<TopNavigationBarProps> = ({
  userData,
  delay = 6,
}) => {
  const navigate = useNavigate();

  //toggle visibility of the profile dialogues
  const [isProfileVisible, setProfileVisible] = useState(false); //animate aagraku ku ithu venum so rendu state managed
  const toggleProfileDialogueBox = () => {
    setProfileVisible((prev) => !prev);
  };
  //toggle setitings dialog box
  const [isSettingsDialogBoxVisible, setSettingsDialogBoxVisible] =
    useState(false); //animate aagraku ku ithu venum so rendu state managed
  const toggleSettingsDialogBox = () => {
    setSettingsDialogBoxVisible((prev) => !prev);
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
  const { userData: userDataFromProfileContext } = useProfile();
  //toggles visiblity of the create new ticket dialog box
  const [isPostNewTicketDialogBoxVisible, setPostNewTicketDialogBoxVisible] =
    useState(false);
  const togglePostNewTicketDialogBox = () => {
    setPostNewTicketDialogBoxVisible((prev) => !prev);
  };
  return (
    // Main navigation container
    <motion.div
      initial={{ opacity: 0, y: -MOVEMENT_DISTANCE }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: ANIMATION_DURATION,
        delay: ANIMATION_DURATION * delay,
        ease: "easeOut",
      }}
      className="top-navigation-bar w-full flex flex-row justify-between items-center py-5 cursor-default overflow-visible "
    >
      {/* Logo Section */}
      <div
        onClick={() => {
          if (window.location.pathname != "/home") {
            navigate("/home");
          } else {
            window.location.reload();
          }
        }}
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
          onClick={() => navigate(LANDING_PAGE)}
          className="home w-max text-[clamp(20px,2vw,24px)] text-white font-medium primary
         hover:scale-95 transition-all duration-200 active:scale-105 cursor-pointer"
        >
          Home
        </button>
        <button
          onClick={() => {
            const currentPath = window.location.pathname;
            if (currentPath === LANDING_PAGE) {
              window.scrollTo({ top: 400, behavior: "smooth" });
            } else {
              navigate(LANDING_PAGE);
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
          onClick={() => {
            if (userData.email) toggleSellTicketDialogBox();
            else navigate(LOGIN_PAGE);
          }}
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
                (userDataFromProfileContext?.profileImage.data
                  .trim()
                  .toLowerCase() !== "empty"
                  ? userDataFromProfileContext?.profileImage.data
                  : "/icons/no-profile.png") || "/icons/no-profile.png"
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
                  userData={userData}
                  setToggleDialogueBox={toggleSellTicketDialogBox}
                  callBackToggle={togglePostNewTicketDialogBox}
                />
              )}
            </AnimatePresence>
            {/* create new ticket dialog box */}
            <AnimatePresence mode="wait">
              {isPostNewTicketDialogBoxVisible && (
                <PostNewTickDialogBox
                  toggleDialogBox={togglePostNewTicketDialogBox}
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
              {isProfileVisible && (
                <ProfileDialogueBox
                  toggleSettingsDialogBox={toggleSettingsDialogBox}
                  userData={
                    userDataFromProfileContext || ({} as ProfileResponse)
                  }
                />
              )}
            </AnimatePresence>
            {/* settings dialog box */}
            <AnimatePresence mode="wait">
              {isSettingsDialogBoxVisible && (
                <SettingsDialogBox
                  setToggleDialogueBox={toggleSettingsDialogBox}
                  userData={
                    userDataFromProfileContext || ({} as ProfileResponse)
                  }
                />
              )}
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
