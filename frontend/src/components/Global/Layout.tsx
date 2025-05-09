import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ANIMATION_DURATION } from "../../utils/constants";

interface LayoutProps {
  className?: string;
  wrapperClassName?: string;
  children: React.ReactNode;
  isHomePage?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  className = "",
  wrapperClassName = "",
}) => {
  const parentRef = useRef<HTMLDivElement>(null); // Reference to parent container

  return (
    <div
      ref={parentRef}
      className={`main-entry-point w-full min-h-screen h-max flex flex-col items-center relative overflow-hidden bg-gradient-to-b 
                 from-black via-[#402283] via-50% to-[#9f64da] ${className}`}
    >
      {/* Noise Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: ANIMATION_DURATION * 6,
          delay: ANIMATION_DURATION * 1,
          ease: "easeOut",
        }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 mix-blend-multiply"
        style={{
          backgroundImage: "url('/images/noise-overlay.png')",
          backgroundSize: "100px 100px",
          backgroundRepeat: "repeat",
        }}
      ></motion.div>

      {/* Wrapper for Page Content */}
      <div
        className={`wrapper w-full flex flex-col max-w-[1490px] px-4 md:px-6 items-center lg:px-[42px] z-50 ${wrapperClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
