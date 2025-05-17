import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import CitySearchBar from "../Global/CitySearchBar";
import { useMutation } from "@tanstack/react-query";

import { updateProfile } from "../../queries/Profile";
import { ProfileResponse } from "../../types/Profile";
import { toast } from "react-toastify";
import { useProfile } from "../../contexts/ProfileContext";
import useClickOutside from "@/utils/detectOutsideClickHook";
import { ANIMATION_DURATION } from "@/utils/constants";

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
  const { setUserData: setUserDataOnContext } = useProfile();

  //handle tap outisde
  const [containerRef, isVisible] = useClickOutside(true);

  useEffect(() => {
    if (!isVisible) {
      setToggleDialogueBox(false);
    }
  }, [isVisible]);

  const mutate = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["updateProfile", userData],
    onSuccess: () => {
      toast.success("Updated location successfully");
      setUserDataOnContext((prev) => ({
        ...prev,
        city: usrData.city,
        state: usrData.state,
      }));
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
        duration: ANIMATION_DURATION,
        ease: "easeInOut",
      }}
      className="fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center"
      //didnnt use childrens direcly as exit animations didnt work i dont know why
      //top positipon is handled via motion variant props y distance
    >
      <div
        ref={containerRef}
        className="w-[350px] md:w[400px] lg:w-[500px] p-4 bg-black rounded-xl backdrop-blur-sm flex flex-col items-center gap-2 "
      >
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
          <h3 className=" text-[clamp(16px,2vw,24px)] my-0.5 font-medium leading-0">
            Select new location
          </h3>

          <div className="margin relative my-2 md:my-3 lg:my-4 h-[56px]">
            <CitySearchBar userData={usrData} setUserData={setUserData} />
          </div>
        </div>

        <button
          onClick={() => {
            setToggleDialogueBox(false);
            if (usrData !== userData) {
              mutate.mutate(usrData);
            }
          }}
          className="w-full px-4 py-3 md:px-6 md:py-3 cursor-pointer bg-[#9F64DA] rounded-md flex justify-center items-center gap-2.5 scale-3d hover:scale-102 hover:opacity-90 active:opacity-100 transition-all duration-200"
        >
          <span className="text-white text-[clamp(16px,2vw,24px)] font-medium leading-7">
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
