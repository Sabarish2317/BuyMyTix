import { motion } from "motion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ANIMATION_DURATION, MOVEMENT_DISTANCE } from "../../utils/constants";
import { LOGIN_PAGE, SIGNUP_PAGE } from "../../utils/routing";

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
const TopNavigationBar: React.FC<TopNavigationBarProps> = () => {
  const navigate = useNavigate();
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

      {/* Action Buttons - Hidden on mobile */}
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
          className="get-started-button w-max bg-white px-4 py-3 rounded-md backdrop-blur-sm justify-center items-center gap-2.5 hidden md:flex
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

      {/* Mobile Navigation - Includes hamburger menu */}
      <button className="hamburger-menu w-max bg-white/8 rounded-[6px] px-3 flex md:hidden">
        <img className="h-10" src="/icons/hamburger-menu-icon.svg" alt="menu" />
      </button>
    </motion.div>
  );
};

export default TopNavigationBar;
