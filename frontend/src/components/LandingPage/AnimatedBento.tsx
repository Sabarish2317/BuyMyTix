import { motion } from "motion/react";
import React from "react";
import { ANIMATION_DURATION, MOVEMENT_DISTANCE } from "../../utils/constants";

const AnimatedBento: React.FC = () => {
  return (
    // main container with responsive gap and padding
    <motion.div
      initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: ANIMATION_DURATION,
        delay: ANIMATION_DURATION * 7,
        ease: "easeOut",
      }}
      className="bento-container w-full flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 p-3 md:p-4 lg:p-6 items-center justify-center mt-14 cursor-default select-none"
    >
      {/* 1st column */}
      <div className="w-full md:w-auto flex flex-row md:flex-col gap-2 md:gap-4 lg:gap-6 ">
        <AnimatedBentoBox
          offsetBoxClassName="md:pl-4 lg:pl-8"
          title={
            <h2>
              Zero Platform fee
              <br />& No hidden charges
            </h2>
          }
          subtitle={
            <h3>
              No Hidden Costs You Keep
              <br />
              100% of Your Sale!
            </h3>
          }
          iconPath="/icons/glove-icon.svg"
          alt="globe"
        />
        <AnimatedBentoBox
          title={
            <h2>
              Secure & Verified
              <br />
              profiles
            </h2>
          }
          subtitle={
            <h3>
              Buy and sell worry-free with
              <br />
              our website.
            </h3>
          }
          iconPath="/icons/secure-icon.svg"
          alt="globe"
        />
      </div>
      {/* 2nd column */}
      <div className="w-full min-h-full self-stretch md:w-auto flex flex-col gap-4 md:gap-6 lg:gap-8">
        <AnimatedBentoBox2
          offsetBoxClassName="min-h-full"
          className="min-h-full justify-between gradient-border-left py-8"
          title={
            <h2>
              Direct Buyer-to-Seller
              <br />
              Chat
            </h2>
          }
          subtitle={
            <h3>
              Talk directly, negotiate instantly,
              <br />
              and make the deal happen.
            </h3>
          }
          iconPath="/icons/offer-icon.svg"
          alt="globe"
        />
      </div>
      {/* 3rd-column */}
      <div className="w-full md:w-auto flex flex-row md:flex-col gap-2 md:gap-4 lg:gap-6 ">
        <AnimatedBentoBox
          offsetBoxClassName="md:pr-4 lg:pr-8"
          title={
            <h2>
              Easy & Instant Ticket
              <br />
              Listings
            </h2>
          }
          subtitle={
            <h3>
              Post your ticket in just a few
              <br />
              clicks, it's that easy!
            </h3>
          }
          iconPath="/icons/speed-icon.svg"
          alt="globe"
        />
        <AnimatedBentoBox
          title={
            <h2>
              Easy & Instant Ticket
              <br />
              Listings
            </h2>
          }
          subtitle={
            <h3>
              Post your ticket in just a few
              <br />
              clicks, it's that easy!
            </h3>
          }
          iconPath="/icons/secure-icon.svg"
          alt="globe"
        />
      </div>
    </motion.div>
  );
};

export default AnimatedBento;

interface AnimatedBentoBoxProps {
  offsetBoxClassName?: string;
  className?: string; // Fixed capitalization
  title: React.ReactNode;
  subtitle: React.ReactNode;
  iconPath: string;
  alt: string;
}

const AnimatedBentoBox: React.FC<AnimatedBentoBoxProps> = ({
  offsetBoxClassName = "",
  className = "", // Fixed capitalization
  title,
  subtitle,
  iconPath,
  alt,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: ANIMATION_DURATION,
        delay: ANIMATION_DURATION * 8,
        ease: "easeOut",
      }}
      className={`w-full flex ${offsetBoxClassName}`}
    >
      {/* main container box with responsive padding */}
      <div
        className={`main-container relative w-full pl-4 md:pl-6 lg:pl-8 pr-3 md:pr-4 lg:pr-6 py-4 md:py-5 lg:py-6 
  rounded-xl border-[1px] md:border-[2px] gradient-border-left flex flex-col items-start gap-3 md:gap-4 lg:gap-[18px]
  hover:scale-110 transition-all ease-in-out duration-200  ${className}`}
      >
        {/* icon with responsive padding */}
        <div className="icon-container flex p-2 md:p-3 rounded-xl border-[3px] border-[#1D1D1D]">
          <img src={iconPath} alt={alt} className="w-4 md:w-6 lg:w-8" />
        </div>
        {/* Title and subtitle container with responsive text */}
        <div className="flex-col justify-start items-start gap-1 md:gap-2 inline-flex">
          <div className="text-[#eaeaea] font-bold text-[clamp(14px,1.6vw,32px)] leading-[1.2] tracking-wide">
            {title}
          </div>
          <div className="self-stretch text-[#eaeaea]/80 font-medium text-[clamp(12px,1.2vw,24px)] leading-normal tracking-tight">
            {subtitle}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// abstract panna lam time ila so copy paste paniten ithuku vera functaitonality iruku responisve kaga

interface AnimatedBentoBoxProps2 {
  offsetBoxClassName?: string;
  className?: string; // Fixed capitalization
  title: React.ReactNode;
  subtitle: React.ReactNode;
  iconPath: string;
  alt: string;
}

const AnimatedBentoBox2: React.FC<AnimatedBentoBoxProps2> = ({
  offsetBoxClassName = "",
  className = "", // Fixed capitalization
  title,
  subtitle,
  iconPath,
  alt,
}) => {
  return (
    <motion.div className={`w-full flex ${offsetBoxClassName}`}>
      {/* main container box with responsive padding */}
      <div
        className={`main-container w-full pl-4 md:pl-6 lg:pl-8 pr-3 md:pr-4 lg:pr-6   lg:py-6 rounded-xl border-[2px] gradient-border  items-center md:items-start
            md:justify-between  flex-row md:flex-col gap-3 md:gap-4 lg:gap-[18px] py-6 md:py-5 inline-flex hover:scale-3d hover:scale-110 transition-all ease-in-out duration-200  ${className}`}
      >
        {/* icon with responsive padding */}
        <div className="icon-container flex p-2 md:p-3 rounded-xl border-[3px] border-[#1D1D1D]">
          <img src={iconPath} alt={alt} className="w-4 md:w-6 lg:w-8" />
        </div>
        {/* Title and subtitle container with responsive text */}
        <div className="flex-col justify-start items-start gap-1 md:gap-2 inline-flex">
          <div className="text-[#eaeaea] font-bold text-[clamp(14px,1.6vw,32px)] leading-[1.2] tracking-wide">
            {title}
          </div>
          <div className="self-stretch text-[#eaeaea]/80 font-medium text-[clamp(12px,1.2vw,24px)] leading-normal tracking-tight">
            {subtitle}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
