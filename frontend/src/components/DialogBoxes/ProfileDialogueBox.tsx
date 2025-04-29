import { AnimatePresence, motion } from "motion/react";

import { ANIMATION_DURATION } from "../../utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileResponse } from "../../types/Profile";
import ProfileImage from "../Global/profileImage";
import { HISTORY_PAGE } from "../../routes/appRoutes";
import { useQueryClient } from "@tanstack/react-query";

interface ProfileDialogueBoxProps {
  userData: ProfileResponse;
  toggleSettingsDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
}
const profileVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 36 },
  exit: { opacity: 0, y: -10 },
};
// Forward the ref to allow parent components to control visibility
const ProfileDialogueBox: React.FC<ProfileDialogueBoxProps> = ({
  userData,
  toggleSettingsDialogBox,
}) => {
  const navigate = useNavigate();
  const [isQuickLinksExpanded, setIsQuickLinksExpanded] = useState(false); // Add state for quick links]useState
  const toggleQuickLinks = () => {
    setIsQuickLinksExpanded((prev) => !prev);
  };
  const queryClient = useQueryClient();

  return (
    <motion.div
      variants={profileVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        duration: ANIMATION_DURATION,
        ease: "easeOut",
      }}
      className="z-100 " //didnnt use childrens direcly as exit animations didnt work i dont know why
      //top positipon is handled via motion variant props y distance
    >
      {/* profile container  */}
      <div
        className="profile-dialogue-box-container fixed lg:absolute  right-0 min-w-80 pb-3 bg-black rounded-xl shadow-[0px_0px_55px_-11px_rgba(74,0,147,1.00)] outline-2 
        outline-offset-[-2px] outline-zinc-700  flex-col justify-center items-center overflow-hidden cursor-pointer z-100"
      >
        <div className="profile-detail-container w-full profile-details-container self-stretch px-4 py-4 bg-zinc-900 rounded-md inline-flex justify-start items-center gap-3">
          <div className="min-w-13 min-h-13 max-w-13 max-h-13 rounded-full flex items-center justify-center overflow-hidden origin-right scale-3d scale-75 md:scale-90 lg:scale-100 hover:scale-105 transition-all duration-200 ease-in-out active:scale-110 cursor-pointer">
            <ProfileImage
              className="min-w-13 min-h-13 max-w-13 max-h-13"
              data={
                !userData.profileImage?.data ||
                userData.profileImage.data.trim().toLowerCase() !== "empty"
                  ? userData.profileImage.data
                  : "/icons/no-profile.png"
              }
            />
          </div>

          <div className="inline-flex flex-col justify-center items-start">
            <div className="justify-start text-white text-[clamp(20px,2vw,24px)] font-medium w-max">
              {userData.name}
            </div>
            <div className="justify-start text-white text-opacity-80 text-[clamp(16px,1.5vw,20px)] font-regular">
              {userData.email}
            </div>
          </div>
        </div>
        {/* buttons rows */}
        <button
          onClick={() => toggleSettingsDialogBox(true)}
          className="settings-button cursor-pointer w-full flex flex-row items-center justify-start gap-6 pl-5 pr-5 pb-3 pt-3 scale-3d hover:bg-zinc-800 hover:scale-105 active:bg-zinc-700 active:scale-110 transition-all duration-200"
        >
          <img src="/icons/settings-icon.svg" alt="settings" />
          <div className="justify-start text-white text-[clamp(20px,2vw,24px)] font-regular">
            Settings
          </div>
        </button>
        <button
          onClick={() => {
            toggleQuickLinks();
            navigate(HISTORY_PAGE);
          }}
          className="logout-button cursor-pointer w-full flex flex-row items-center justify-start gap-6 pl-5 pr-5 pb-3 pt-3 scale-3d hover:bg-zinc-800 hover:scale-105 active:bg-zinc-700 active:scale-110 transition-all duration-200"
        >
          <img src="/icons/history-icon.svg" alt="setthistoryings" />
          <div className="justify-start text-white text-[clamp(20px,2vw,24px)] font-regular">
            History
          </div>
        </button>
        <button
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: ["userProfile", localStorage.getItem("token")],
            });
            localStorage.clear();
            localStorage.removeItem("token");
            navigate("/authenticate?type-login");
          }}
          className="logout-button cursor-pointer w-full flex flex-row items-center justify-start gap-6 pl-5 pr-5 pb-3 pt-3 scale-3d hover:bg-zinc-800 hover:scale-105 active:bg-zinc-700 active:scale-110 transition-all duration-200"
        >
          <img src="/icons/logout-icon.svg" alt="logout" />
          <div className="justify-start text-white text-[clamp(20px,2vw,24px)] font-regular">
            Logout
          </div>
        </button>
        <div
          className="quick-links-container w-full flex flex-col items-center justify-start gap-2 pl-5 pr-5 pb-3 pt-3 
      text-white text-[clamp(20px,2vw,24px)] font-regular lg:hidden"
        >
          <button
            onClick={() => toggleQuickLinks()}
            className="quick-links-button w-full relative overflow-clip  items-center justify-start gap-7 flex flex-row"
          >
            <img
              style={{ rotate: isQuickLinksExpanded ? "180deg" : "0deg" }}
              className="hover:scale-105 transition-all duration-200 ease-in-out active:scale-110 cursor-pointer"
              src={
                isQuickLinksExpanded
                  ? "/icons/down-arrow.svg"
                  : "/icons/down-arrow-orange.svg"
              }
              alt="expand"
            />
            Quick links
          </button>
          {isQuickLinksExpanded && (
            <AnimatePresence>
              <div
                className="sub-links-container w-full justify-start text-white/80 text-[clamp(16px,2vw,20px)] font-regular  flex-col items-start gap-3
        "
              >
                <button className="sub-link-1 pl-2 relative overflow-clip hover:scale-105 transition-all duration-200 ease-in-out active:scale-110 cursor-pointer flex flex-row gap-8">
                  <img
                    src="/icons/down-arrow.svg"
                    alt="dummy-icon"
                    className="opacity-0"
                  />
                  Home
                </button>
                <button className="sub-link-2 relative pl-2 overflow-clip hover:scale-105 transition-all duration-200 ease-in-out active:scale-110 cursor-pointer flex flex-row gap-8">
                  <img
                    src="/icons/down-arrow.svg"
                    alt="dummy-icon"
                    className="opacity-0"
                  />
                  About us
                </button>
                <button className="sub-link-3 relative pl-2 overflow-clip hover:scale-105 transition-all duration-200 ease-in-out active:scale-110 cursor-pointer flex flex-row gap-8">
                  <img
                    src="/icons/down-arrow.svg"
                    alt="dummy-icon"
                    className="opacity-0"
                  />
                  Help
                </button>
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileDialogueBox;
