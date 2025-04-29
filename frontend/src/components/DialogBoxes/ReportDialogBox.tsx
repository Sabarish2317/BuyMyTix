import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ANIMATION_DURATION } from "../../utils/constants";

import Input from "../Global/Input";
import axios from "../../utils/axios";
import { reportApi } from "../../routes/apiRoutes";
import { toast } from "react-toastify";

const popUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

interface ReportDialogBoxProps {
  reportingUserEmail: string;
  setToggleDialogueBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReportDialogBox: React.FC<ReportDialogBoxProps> = ({
  reportingUserEmail,
  setToggleDialogueBox,
}) => {
  const [domReady, setDomReady] = useState(false);
  const [reportMessage, setReportMessage] = useState<string>("");

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
  console.log("reportingUserEmail");
  console.log(reportingUserEmail);
  const handleReportSubmit = async () => {
    if (!reportMessage) {
      toast.error("Please provide a reason for the report.");
      return;
    }

    try {
      const response = await axios.post(
        reportApi,
        {
          reportedUserEmail: reportingUserEmail,
          reason: reportMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Report submitted successfully!");
        setToggleDialogueBox(false); // Close the dialog after success
      }
    } catch (error: any) {
      console.error("Error submitting report:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while submitting the report."
      );
      setToggleDialogueBox(false);
    }
  };

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
            Report User
          </h2>
          <img
            className="scale-3d cursor-pointer hover:scale-95 hover:opacity-80 active:scale-105 active:opacity-100 transition-all duration-200"
            onClick={() => setToggleDialogueBox(false)}
            src="/icons/close-icon.svg"
            alt="close"
          />
        </div>
        <Input
          intputValue={reportMessage}
          setInputValue={setReportMessage}
          title="Report message"
          placeholder="Why do you want to report this user?"
          maxLength={250}
        />

        <button
          onClick={handleReportSubmit}
          className="w-full cursor-pointer px-6 py-2  bg-white text-black rounded-md flex justify-center items-center gap-2.5 scale-3d hover:scale-[1.02] hover:opacity-90 hover:bg-[#DC3912] hover:text-white active:opacity-100 transition-all duration-200"
        >
          <span className="text-center  text-[clamp(16px,1.5vw,20px)] font-semibold leading-loose">
            Report User
          </span>
        </button>
      </motion.div>
    </div>
  );

  // Create portal to render the dialog at the document body level
  return ReactDOM.createPortal(dialogContent, document.body);
};

export default ReportDialogBox;
