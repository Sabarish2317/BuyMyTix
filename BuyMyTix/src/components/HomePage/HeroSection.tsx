import React from "react";

// interface HeroSectionProps {}

const HeroSection: React.FC = () => {
  return (
    <div className="h-max  justify-start items-center flex flex-col mt-6 gap-2 md:gap-0">
      <div className="text-center leading-[30px] md:leading-[40px]  lg:leading-[50px] uppercase">
        <span className="text-white text-[clamp(22px,4vw,48px)] font-black font-['Satoshi Variable']  [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)]">
          Missed out ?{" "}
        </span>
        <span className="text-[#dc3912] text-[clamp(22px,4vw,48px)] font-bold font-['Satoshi Variable']  [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)]">
          Find Tickets.
          <br />
        </span>
        <span className="text-white text-[clamp(22px,4vw,48px)] font-black font-['Satoshi Variable']  [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)]">
          Can't Go ?{" "}
        </span>
        <span className="text-[#dc3912] text-[clamp(22px,4vw,48px)] font-bold font-['Satoshi Variable']  [text-shadow:_0px_0px_56px_rgb(147_93_202_/_0.35)]">
          Sell your tickets.
        </span>
      </div>
      <div className="text-center text-white/80 text-[clamp(14px,1.9vw,24px)] font-medium font-['Satoshi Variable']  leading-[20px] md:leading-[50px] tracking-wide md:mt-[-10px] lg:mt-[-10px]">
        Connecting buyers and sellers for a seamless movie ticket exchange
      </div>
    </div>
  );
};

export default HeroSection;
