import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ANIMATION_DURATION } from "../../utils/constants";
import { ProfileResponse } from "../../types/Profile";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "../../routes/appRoutes";

const popUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

interface SellTicketDialogBoxProps {
  userData: ProfileResponse;
  setToggleDialogueBox: React.Dispatch<React.SetStateAction<boolean>>;
  callBackToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const SellTicketDialogBox: React.FC<SellTicketDialogBoxProps> = ({
  userData,
  setToggleDialogueBox,
  callBackToggle,
}) => {
  const navigate = useNavigate();
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
    // Lock body scroll when dialog is open
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  // Early return before DOM is ready (for SSR compatibility)
  if (!domReady) return null;

  const dialogContent = (
    <div className="fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center">
      <motion.div
        variants={popUpVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          duration: ANIMATION_DURATION * 2,
          ease: "easeOut",
        }}
        className="w-[300px] md:w-[400px] lg:w-[500px] p-4 bg-black rounded-xl flex flex-col items-center gap-3"
      >
        <div className="title-and-close-button-container w-full flex justify-between h-min items-center">
          <h2 className="text-center text-white text-[clamp(20px,2vw,24px)] font-black uppercase leading-loose [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)]">
            Guide to sell ?
          </h2>
          <img
            className="scale-3d cursor-pointer hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200"
            onClick={() => setToggleDialogueBox(false)}
            src="/icons/close-icon.svg"
            alt="close"
          />
        </div>

        <img
          src="/images/sell-instructions.svg"
          alt="details"
          className="pointer-events-none"
        />

        <button
          onClick={() => {
            setToggleDialogueBox(false);
            if (userData.email && userData) {
              setTimeout(() => {
                callBackToggle(true);
              }, 200);
            } else {
              navigate(LOGIN_PAGE);
            }
          }}
          className="w-full cursor-pointer px-6 py-3.5 bg-white text-black rounded-md flex justify-center items-center gap-2.5 scale-3d hover:scale-105 hover:opacity-90 hover:bg-[#DC3912] hover:text-white active:opacity-100 transition-all duration-200"
        >
          <span className="text-xl font-medium leading-7">Start Selling</span>
        </button>
      </motion.div>
    </div>
  );

  // Create portal to render the dialog at the document body level
  return ReactDOM.createPortal(dialogContent, document.body);
};

export default SellTicketDialogBox;
