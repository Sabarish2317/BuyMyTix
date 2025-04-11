import { motion } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { ANIMATION_DURATION } from "../../utils/constants";
import Input from "../Global/Input";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../queries/Profile";
import { forgotPassword, resetPassword } from "../../queries/Otp";

const popUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

interface ForgotPasswordDialogBoxProps {
  email: string;
  setToggleDialogueBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordDialogBox: React.FC<ForgotPasswordDialogBoxProps> = ({
  setToggleDialogueBox,
  email,
}) => {
  const [domReady, setDomReady] = useState(false);
  //hanlde the input incase it is not provided
  const [forwardingEmail, setForwardingEmail] = useState(email || "");
  const [isOtpSent, setIsOtpSent] = useState(false);

  //hanldes otp boxes
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  //hanldes new password
  const [newPassword, setNewPassword] = useState("");
  //tanstack query mutations
  const sendOtp = useMutation({
    mutationFn: forgotPassword,
    mutationKey: ["forgot password"],
    onSuccess: () => {
      alert("Otp sent to mail");
      setIsOtpSent(true);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const changePassword = useMutation({
    mutationFn: resetPassword,
    mutationKey: ["reset password"],
    onSuccess: () => {
      //clearing states
      alert("Password changed successfully");
      setIsOtpSent(false);
      setOtp(["", "", "", "", "", ""]);
      setNewPassword("");
      setToggleDialogueBox(false);
    },
    onError: (error) => {
      if (error.message === "otp expired") {
        setIsOtpSent(false);
        setOtp(["", "", "", "", "", ""]);
        setNewPassword("");
      }
      alert(error.message);
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

  const ForgotPasswordDialogBoxContent = (
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
          <h2 className=" text-center text-white text-[clamp(20px,2vw,24px)] font-black uppercase  [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)]">
            FORGOT PASSWORD
          </h2>
          <img
            className="scale-3d hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200 cursor-pointer"
            onClick={() => setToggleDialogueBox(false)}
            src="/icons/close-icon.svg"
            alt="close"
          />
        </div>
        {isOtpSent ? (
          <div className="enterOtpSection">
            <div className="details-section flex flex-col gap-0">
              <div className="self-stretch text-center justify-center text-white  text-[clamp(20px,2vw,24px)] font-bold   tracking-wide">
                OTP Verification
              </div>
              <div className="self-stretch text-center justify-center text-white text-[clamp(14px,1.5vw,18px)] font-normal   tracking-wide">
                An otp is sent to your mail {forwardingEmail}
              </div>
            </div>
            <div className="opt-input-section flex flex-row gap-4 my-3 items-center justify-center">
              {otp.map((value, index) => (
                <div
                  key={index}
                  className="w-16 h-16  bg-white/90 rounded-lg outline-2 outline-offset-[-2px] outline-purple-800/70 justify-center items-center gap-2.5"
                >
                  <input
                    ref={(el) => (inputs.current[index] = el)}
                    className="w-full h-full text-center justify-center text-gray-800 text-[clamp(20px,2vw,24px)] font-medium  bg-transparent outline-none"
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                </div>
              ))}
            </div>
            <Input
              intputValue={newPassword}
              setInputValue={setNewPassword}
              title="New password"
              placeholder="••••••••"
            />
          </div>
        ) : (
          <div className="enterEmailSection w-full">
            <div className="self-stretch text-start justify-center text-white text-[clamp(14px,1.5vw,18px)] mt-[-16px] mb-3.5 font-normal   tracking-wide">
              An otp wll be sent to your email if it is valid
            </div>
            <Input
              intputValue={forwardingEmail}
              setInputValue={setForwardingEmail}
              title="Email"
              placeholder="m@example.com"
            />
          </div>
        )}
        <button
          onClick={() => {
            if (isOtpSent) {
              changePassword.mutate({
                email: forwardingEmail,
                otp: otp.join(""),
                newPassword,
              });
            } else {
              sendOtp.mutate(forwardingEmail);
            }

            console.log(forwardingEmail);
          }}
          className="w-full px-6 py-3.5 cursor-pointer bg-[#9F64DA] rounded-md flex justify-center items-center gap-2.5 scale-3d hover:scale-105 hover:opacity-90 active:opacity-100 transition-all duration-200"
        >
          <span className="text-white text-[clamp(14px,1.5vw,18px)] font-medium leading-7">
            {isOtpSent ? "Change password" : "Send otp"}
          </span>
        </button>
      </div>
    </motion.div>
  );

  // Create portal to render the dialog at the document body level
  return ReactDOM.createPortal(ForgotPasswordDialogBoxContent, document.body);
};

export default ForgotPasswordDialogBox;
