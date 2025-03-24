import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ANIMATION_DURATION, MOVEMENT_DISTANCE } from "../../utils/constants";
import { LOGIN_PAGE, SIGNUP_PAGE } from "../../utils/routing";
import ProfileDialogueBox from "./ProfileDialogueBox";

// Enum for navigation button names
enum NavigationButton {
  Home = "home",
  AboutUs = "about-us",
  HelpAndSupport = "help-and-support",
}

// Props interface for the navigation bar
interface TopNavigationBarProps {
  isLoggedIn?: boolean; // Optional prop to indicate if a user is logged in
  currentlyEnableButton?: NavigationButton; // Optional prop to specify the active button
}

// Top Navigation Bar Component
const TopNavigationBar: React.FC<TopNavigationBarProps> = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  // Toggle visibility of the profile dialogue box
  const [isProfileVisible, setProfileVisible] = useState(false); //animate aagraku ku ithu venum so rendu state managed
  const toggleProfileDialogueBox = () => {
    setProfileVisible((prev) => !prev);
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
      className="top-navigation-bar flex flex-row justify-between items-center py-5"
    >
      {/* Logo Section */}
      <div className="logo-padding w-full flex justify-start flex-row">
        <img
          className="scale-75 md:scale-90 lg:scale-100 origin-left"
          src="/icons/logo.svg"
          alt="logo"
        />
      </div>

      {/* Navigation Links - Hidden on mobile, visible on medium screens and larger */}
      <div className="navigation-links gap-8 flex-row hidden md:flex">
        <button
          className="home w-max text-[clamp(20px,2vw,24px)] text-white font-medium primary
         hover:scale-95 transition-all duration-200 active:scale-105"
        >
          Home
        </button>
        <button
          className="about-us w-max text-[clamp(20px,2vw,24px)] text-white
          hover:scale-95 transition-all duration-200 active:scale-105"
        >
          About us
        </button>
        <button
          className="help-and-support w-max text-[clamp(20px,2vw,24px)] text-white
          hover:scale-95 transition-all duration-200 active:scale-105"
        >
          Help & support
        </button>
      </div>

      {!isLoggedIn ? (
        /* Action Buttons - Hidden on mobile and the user havent logeed inn*/
        <div className="action-buttons-container flex flex-row gap-6 items-center justify-end w-full">
          {/* Login Button (Only visible on large screens) */}
          <button
            className="login-button w-max text-[clamp(20px,2vw,24px)] text-white underline hidden lg:flex
         hover:scale-95 transition-all duration-200 active:scale-105"
            onClick={() => navigate(LOGIN_PAGE)}
          >
            Log in
          </button>
          {/* Get Started Button (Hidden on small screens, visible on medium+) */}
          <button
            className="get-started-button w-max bg-white px-3 py-2 md:px-4 md:py-3 rounded-md backdrop-blur-sm justify-center items-center gap-2.5 flex 
        hover:bg-white/80 hover:scale-95 transition-all duration-200 active:scale-105 active:bg-white"
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
        <div className="profile-location-container w-full  justify-end items-center gap-6 flex flex-row">
          {/* location  */}
          <div className="location-container w-max flex-row gap-2 flex max-[1290px]:hidden ">
            <img src="/icons/marker.svg" alt="location" />
            <div
              className="login-button w-max text-[clamp(20px,2vw,24px)] text-white
         hover:text-zinc-300 transition-all duration-200 active:text-zinc-400 cursor-pointer"
            >
              Coimbatore, Tamil Nadu
            </div>
          </div>
          {/* Profile button with dropDown */}
          <div className="profile-container relative flex flex-row items-center justify-end">
            <div className="w-10 h-10 rounded-[290.91px] shadow-[0px_0px_23.799999237060547px_0px_rgba(220,57,18,100)] flex overflow-clip origin-right scale-3d scale-75 md:scale-90 lg:scale-100">
              <img
                className="w-full h-full "
                src="/images/profile.png"
                alt="profile"
              />
            </div>
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
            <AnimatePresence mode="wait">
              {isProfileVisible && <ProfileDialogueBox userData="s" />}
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
