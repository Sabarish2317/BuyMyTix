import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { DummySearchBarDb } from "../Global/SearchBarDb";
import { useNavigate } from "react-router-dom";
import { SIGNUP_PAGE } from "../../routes/appRoutes";
import React from "react";

const otpInitial = ["1", "4", "4", "6"];

interface HowitworksProps {
  showSellDialogBoxInstruction: React.Dispatch<React.SetStateAction<boolean>>;
}
const Howitworks: React.FC<HowitworksProps> = ({
  showSellDialogBoxInstruction,
}) => {
  const [otp, setOtp] = useState(otpInitial);
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setOtp((prev) =>
        prev.map(() => Math.floor(Math.random() * 10).toString())
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="flex min-w-full z-[999] items-center justify-center gap-8 px-8 py-12 flex-col bg-gradient-to-b"
      style={{
        backgroundImage: "linear-gradient(180deg, #4E2E7B 0%, #26004C 100%)",
      }}
    >
      {/* Title */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative px-4 py-2 rounded-[24px] self-center w-fit bg-white text-[#150C29] font-semibold text-[20px] futuristic-border"
        >
          How it Works
        </motion.div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col gap-2 text-center"
      >
        <h2 className="text-[#EAEAEA] font-bold text-[clamp(22px,5vw,32px)]">
          Post your ticket in just a few steps – it's that easy!
        </h2>
        <p className="text-[#eaeaeaac] text-[clamp(16px,4vw,24px)] font-medium">
          From discovering events to selling your own tickets, BuyMyTix makes
          the entire process seamless, secure, and effortless.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="flex flex-wrap gap-4 relative justify-center">
        {/* Step 1 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#ffffff1e] rounded-[10px] p-4 flex flex-col flex-1 min-w-[280px] max-w-[400px] gap-3"
        >
          <div className="flex justify-between items-center font-bold text-white text-[18px]">
            <h3 className="text-[clamp(20px,4vw,20px)] font-bold">
              Create & Verify
            </h3>
            <h3>1</h3>
          </div>
          <p className="text-[#EAEAEA] text-[16px]">
            Start by creating your account and verifying your phone number to
            ensure a secure and personalized experience.
          </p>
          <div className="bg-black h-full justify-between items-center flex flex-col gap-2 rounded-xl overflow-clip">
            <div className="bg-white/10 w-full p-3 flex gap-2 text-white items-center">
              <img src="./images/Pro.png" alt="profile" className="h-8 w-8" />
              <div className="flex flex-col text-s">
                <p className="font-semibold">Sabarish Vs</p>
                <p>sa@gmail.com</p>
              </div>
            </div>
            <div className="h-full flex flex-col gap-3 p-3 rounded-xl text-white min-w-full justify-between">
              <div className="flex justify-between w-full">
                <h4 className="font-bold text-lg">Verify Account</h4>
                <h4 className="font-bold text-lg">x</h4>
              </div>
              <div className="main self-center h-full flex flex-col w-full">
                <p className="text-center font-bold mb-4">OTP verification</p>
                <p className="text-center">
                  An otp is sent to your ******gmail.com <br /> expiring in 2
                  minutes
                </p>
                <div className="flex gap-2 justify-center mt-3">
                  {otp.map((val, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-10 border-[#8D59C2] border rounded flex justify-center items-center bg-white text-black text-sm font-semibold relative overflow-hidden"
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={val}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute"
                        >
                          {val}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => navigate(SIGNUP_PAGE)}
                className="w-full bg-[#8D59C2] scale-3d hover:scale-102 cursor-pointer duration-200 hover:text-white rounded py-2 text-s"
              >
                Get Started
              </button>
            </div>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-[#ffffff1e] rounded-[10px] p-4 flex flex-col flex-1 min-w-[280px] max-w-[400px] gap-3"
        >
          <div className="flex justify-between items-center font-bold text-white text-[18px]">
            <h3 className="text-[clamp(20px,4vw,20px)] font-bold">
              Select or Create
            </h3>
            <h3>2</h3>
          </div>
          <p className="text-[#EAEAEA] text-[16px]">
            Browse existing event titles or create your own — whether it's a
            concert, movie, or sports game, we've got you covered.
          </p>
          <div className="flex flex-col justify-between bg-[#0f0b13] p-3 pb-0 rounded-xl h-full">
            <div className="3d-text relative h-max items-center"></div>
            <div
              className="w-full flex justify-center relative"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <DummySearchBarDb />
            </div>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-[#ffffff1e] rounded-[10px] p-4 flex flex-col flex-1 w-full min-w-[280px] max-w-[400px] md:max-w-full lg:max-w-[400px] gap-3"
        >
          <div className="flex justify-between items-center font-bold text-white text-[18px]">
            <h3 className="text-[clamp(20px,4vw,20px)] font-bold">
              Add Details & Go Live
            </h3>
            <h3>3</h3>
          </div>
          <p className="text-[#EAEAEA] text-[16px]">
            Enter seat info, price, and quantity. Once submitted, your listing
            goes live — sit back while buyers reach out!
          </p>
          <div className="bg-[#1d1624d6] h-full flex flex-col gap-2 rounded-xl overflow-hidden">
            <img
              src="./images/Add-Ticket.svg"
              alt="Add Ticket"
              className="h-full w-full object-cover md:h-[300px] lg:h-full"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className="flex items-center justify-end gap-2 pb-4 cursor-pointer hover:scale-95 hover:opacity-80 transition-all duration-200 active:scale-105 active:opacity-100"
        onClick={() => showSellDialogBoxInstruction(true)}
      >
        <h2 className="text-[#fff] text-[24px] font-bold">Sell Your Ticket</h2>
        <img src="./images/Next-red.png" alt="hand" className="w-6" />
      </motion.div>
    </motion.div>
  );
};

export default Howitworks;
