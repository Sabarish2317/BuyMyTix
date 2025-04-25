import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ANIMATION_DURATION } from "../../utils/constants";
import { useMutation } from "@tanstack/react-query";

import { updateProfile } from "../../queries/Profile";
import { ProfileResponse } from "../../types/Profile";
import { toast } from "react-toastify";
import { useProfile } from "../../contexts/ProfileContext";
import ProfileImage from "../Global/profileImage";
import { DropdownDark } from "../Global/ProfileOptionsDropDown";
import Input from "../Global/Input";

const popUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

interface SettingsDialogBoxProps {
  userData: ProfileResponse;
  setToggleDialogueBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsDialogBox: React.FC<SettingsDialogBoxProps> = ({
  setToggleDialogueBox,
  userData,
}) => {
  const [domReady, setDomReady] = useState(false);
  //second neew instance of userData
  const [usrData, setUserData] = useState<ProfileResponse>(userData); //user data from the parent component
  const [name, setName] = useState<string>(userData.name);
  const [phoneNumber, SetPhoneNumber] = useState<string>(userData.phone);
  const [preferredLanguage, setPreferredLanguage] = useState<string>(
    userData.preferredLanguage
  );

  const { setUserData: setUserDataOnContext } = useProfile();
  useEffect(() => {
    setUserData({
      ...usrData,
      name,
      phone: phoneNumber,
      preferredLanguage: preferredLanguage,
    });
  }, [name, phoneNumber, preferredLanguage]);

  const mutate = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["updateProfile", userData],
    onSuccess: () => {
      toast.success("Updated profile successfully");
      setUserDataOnContext(usrData);
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

  const SettingsDialogBoxContent = (
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
      <div className="w-[300px] md:w[400px] lg:w-[500px] p-4 bg-black rounded-xl backdrop-blur-sm flex flex-col items-center  justify-center gap-3 ">
        <div className="top-nav-of-dialog w-full min-h-max flex justify-between  items-center">
          <div className="title-and-sybititle-container min-h-max flex flex-col gap-1.5 items-start">
            <h2 className=" text-center text-white text-[clamp(20px,2vw,24px)] font-black uppercase leading-loose [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)]">
              Settings
            </h2>
            <h3 className=" text-xl font-medium leading-1 text-[#AFAFAF]">
              Change how your profile looks
            </h3>
          </div>
          <img
            className="scale-3d hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200 cursor-pointer"
            onClick={() => setToggleDialogueBox(false)}
            src="/icons/close-icon.svg"
            alt="close"
          />
        </div>
        <div className="w-full flex flex-col  gap-2 my-2 z-[999]">
          <div className="profile-detail-container  z-[999] w-full profile-details-container self-stretch px-4 py-4 bg-[url('/images/purple-gradient.png')] rounded-md justify-start items-center gap-3 flex flex-col ">
            <div className="w-max z-[999] overflow-visible relative rounded-full flex items-center justify-center  origin-center scale-3d scale-90 lg:scale-100">
              <ProfileImage
                className="w-30 h-30"
                data={
                  !userData.profileImage?.data ||
                  userData.profileImage.data.trim().toLowerCase() !== "empty"
                    ? userData.profileImage.data
                    : "/icons/no-profile.png"
                }
              />
              <div className="z-[999] absolute bottom-0 left-20 w-max">
                <DropdownDark />
              </div>
            </div>
          </div>
        </div>
        <Input
          intputValue={name}
          setInputValue={setName}
          title="Name"
          maxLength={32}
          placeholder="Enter your name"
        />
        <Input
          intputValue={phoneNumber}
          setInputValue={SetPhoneNumber}
          title="Phone number"
          maxLength={10}
          prefixText="+91 "
          type="num"
          placeholder="Enter your phone number"
        />
        <Input
          intputValue={preferredLanguage}
          setInputValue={setPreferredLanguage}
          title="Preferred Language"
          maxLength={24}
          placeholder="Eg: English"
        />
        <button
          onClick={() => {
            if (JSON.stringify(usrData) !== JSON.stringify(userData)) {
              mutate.mutate(usrData);
              setToggleDialogueBox(false);
            }
          }}
          className={`w-full px-6 py-3.5 cursor-pointer rounded-md flex justify-center items-center gap-2.5 scale-3d 
            hover:scale-105 hover:opacity-90 active:opacity-100 transition-all duration-200 mt-2 ${
              JSON.stringify(usrData) !== JSON.stringify(userData)
                ? "bg-[#9F64DA]"
                : "bg-white/50"
            }`}
        >
          <span className="text-white text-xl font-medium leading-7">Save</span>
        </button>
      </div>
    </motion.div>
  );

  // Create portal to render the dialog at the document body level
  return ReactDOM.createPortal(SettingsDialogBoxContent, document.body);
};

export default SettingsDialogBox;
