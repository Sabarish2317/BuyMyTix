import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { ProfileResponse } from "../../types/Profile";
import useClickOutside from "@/utils/detectOutsideClickHook";
import { ANIMATION_DURATION } from "@/utils/constants";
import TicketDetail from "../TicketDetailsPage/TicketDetail";
import { Ticket } from "@/types/Ticket";
import { AddTitlesRequest } from "@/types/Titles";

const popUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

interface TicketDetailDialogBoxProps {
  ticketId: string;
  userData: ProfileResponse;
  titlesData: AddTitlesRequest;
  ticketData: Ticket;
  sellerData: ProfileResponse;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  setToggleDialogueBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const TicketDetailDialogBox: React.FC<TicketDetailDialogBoxProps> = ({
  ticketData,
  titlesData,
  sellerData,
  ticketId,
  setToggleDialogueBox,
  userData,
}) => {
  const [domReady, setDomReady] = useState(false);
  //second neew instance of userData

  //handle tap outisde
  const [containerRef, isVisible] = useClickOutside(true);

  useEffect(() => {
    if (!isVisible) {
      setToggleDialogueBox(false);
    }
  }, [isVisible]);

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

  const TicketDetailDialogBoxContent = (
    <motion.div
      onClick={(e) => {
        e.stopPropagation();
        setToggleDialogueBox(false);
      }}
      variants={popUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        duration: ANIMATION_DURATION,
        ease: "easeInOut",
      }}
      className="fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center "
      //didnnt use childrens direcly as exit animations didnt work i dont know why
      //top positipon is handled via motion variant props y distance
    >
      <div
        ref={containerRef}
        className="w-[350px] md:w[400px] lg:w-[500px]  rounded-xl backdrop-blur-sm flex flex-col items-center gap-3 "
      >
        <TicketDetail
          setToggleDialogueBox={setToggleDialogueBox}
          userDetail={userData}
          eventId={ticketId}
          ticketData={ticketData}
          titlesData={titlesData}
          sellerData={sellerData}
        />
      </div>
    </motion.div>
  );

  // Create portal to render the dialog at the document body level
  return ReactDOM.createPortal(TicketDetailDialogBoxContent, document.body);
};

export default TicketDetailDialogBox;
