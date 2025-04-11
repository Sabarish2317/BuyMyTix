import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ANIMATION_DURATION } from "../../utils/constants";
import CitySearchBar from "./CitySearchBar";
import { useMutation } from "@tanstack/react-query";

import { updateProfile } from "../../queries/Profile";
import { ProfileResponse } from "../../types/Profile";

const popUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

interface LocationDialogBoxProps {
  userData: ProfileResponse;
  setToggleDialogueBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationDialogBox: React.FC<LocationDialogBoxProps> = ({
  setToggleDialogueBox,
  userData,
}) => {
  const [domReady, setDomReady] = useState(false);
  //second neew instance of userData
  const [usrData, setUserData] = useState<ProfileResponse>(userData);

  const mutate = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["update profile", userData],
    onSuccess: () => {
      window.location.reload();
    },
    onError: () => {
      alert("Couldn't update location");
    },
  });

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

  const LocationDialogBoxContent = (
    <motion.div
      variants={popUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        duration: ANIMATION_DURATION * 2,
        ease: "easeOut",
      }}
      className="fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center"
      //didnnt use childrens direcly as exit animations didnt work i dont know why
      //top positipon is handled via motion variant props y distance
    >
      <div className="w-[300px] md:w[400px] lg:w-[500px] p-4 bg-black rounded-xl backdrop-blur-sm flex flex-col items-center gap-3  mb-32 ">
        <div className="w-full flex justify-between h-min items-center">
          <h2 className=" text-center text-white text-[clamp(20px,2vw,24px)] font-black uppercase leading-loose [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)]">
            Location
          </h2>
          <img
            className="scale-3d hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200 cursor-pointer"
            onClick={() => setToggleDialogueBox(false)}
            src="/icons/close-icon.svg"
            alt="close"
          />
        </div>

        <div className="w-full flex flex-col text-[#DC3912] gap-2">
          <h3 className=" text-xl font-medium leading-0">
            Select new location
          </h3>

          <div className="margin relative my-4 h-[56px]">
            <CitySearchBar setUserData={setUserData} />
          </div>
        </div>

        <button
          onClick={() => {
            setToggleDialogueBox(false);
            if (usrData !== userData) {
              mutate.mutate(usrData);
            }
          }}
          className="w-full px-6 py-3.5 cursor-pointer bg-[#9F64DA] rounded-md flex justify-center items-center gap-2.5 scale-3d hover:scale-105 hover:opacity-90 active:opacity-100 transition-all duration-200"
        >
          <span className="text-white text-xl font-medium leading-7">
            Change location
          </span>
        </button>
      </div>
    </motion.div>
  );

  // Create portal to render the dialog at the document body level
  return ReactDOM.createPortal(LocationDialogBoxContent, document.body);
};

export default LocationDialogBox;
