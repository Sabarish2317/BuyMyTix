import { AnimatePresence, motion } from "motion/react";
import React, { useEffect } from "react";
import SuccessSnackBar from "../../Global/SuccessSnackBar";
import { ANIMATION_DURATION } from "../../../utils/constants";
import ProgressIndicator from "../../Global/ProgressIndicator";
import { AddTitlesRequest } from "../../../types/Titles";
import { Ticket } from "../../../types/Ticket";
import PageZero from "./pageZero";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import { useMutation } from "@tanstack/react-query";
import { addTicket } from "../../../queries/Tickets";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";
const popUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95 },
};

const pageVariants = {
  //animation for each pages used in switch cases global var
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } },
};

/**
 - This page is kinda shit so wll comment it out
 - The dialog box for creating a new ticket and comprises of 3 pages
 - The pages are dynamic and rendered inside the dialog box
 - The pages are controlled by the state variable currentPageIndex
 - @function currentPageIndex: React.Dispatch<React.SetStateAction<boolean>>
 - @type {Ticket} is uses to store the data of the ticket of any type and is used to send the data to the backend
 - @type {AddTitlesRequest} is uses to store the data of the title "aka" an event if the users want to create a new one but can use exisiting also if he wants
 - @param "titlesData" is stroage container of the class above 
 **/

interface PostNewTickDialogBoxProps {
  toggleDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostNewTickDialogBox: React.FC<PostNewTickDialogBoxProps> = ({
  toggleDialogBox,
}) => {
  useEffect(() => {
    // Lock scroll when dialog opens
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scroll when dialog closes
      document.body.style.overflow = "auto";
    };
  }, []);

  /**
   * @function addTicketMutation called in handleNext case 4 where it uploads when all details are correct
   * isSuccess and isError is tracked to update the state in page 4
   */
  const addTicketMutation = useMutation({
    mutationFn: addTicket,
    mutationKey: ["Add ticket"],
    onSuccess: (data) => {
      console.table(data);
    },
  });
  const { isPending, isSuccess, isError } = addTicketMutation;

  useEffect(() => {
    //Closing the dialog box if success
    if (isSuccess || isError) {
      const timeout = setTimeout(() => {
        toggleDialogBox(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, isError, toggleDialogBox]);

  useEffect(() => {
    if (isError) {
      toast.error("An error occurred while posting the ticket");
    }
  }, [isError]);

  // State to track the current page in the dialog box
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const [ticketsData, setTicketData] = React.useState<Ticket>({
    email: "",
    eventRef: "",
    expiryTime: new Date("2025-04-14T18:30:00Z"),
    seatDetails: {
      entryGate: "",
      row: "",
      seatNumbers: "",
    },
    ticketId: "",
    showTime: new Date("2025-04-14T18:30:00Z"),
    ticketPrice: 130,
    ticketQuantity: 1,
    userDescription: "",
    venue: "",
    language: "",
    screenNo: "Screen 1",
  }); // Used to store the ticket Data
  const [titlesData, SetTitlesData] = React.useState<AddTitlesRequest>({
    eventId: "",
    title: "",
    description: "",
    poster: "",
    rating: "",
    source: "",
    type: "",
    year: "",
  });

  //dev-testing
  useEffect(() => {
    console.log("Ticket data");
    console.table(ticketsData);
    console.log("Titles data");
    console.table(titlesData);
  }, [ticketsData, titlesData]);

  //Handles the page IndexControl
  const hanldePageIndexChange = (toDo: boolean) => {
    //Count++
    if (toDo) {
      /**
       * Error Checking
       * - @summary This is to prevent the user from going to the next page if the current page is not completed
       * - @description This cases happens only after the user tries to navigate the page
       */

      //Error checking for page  zero
      if (currentPageIndex == 0) {
        if (
          titlesData.type !== "Movie" &&
          titlesData.type !== "Event" &&
          titlesData.type !== "Sport"
        )
          return toast.error("Please select a valid ticket type");
      }
      //Error checking for page one
      if (currentPageIndex === 1) {
        if (titlesData.title === "")
          return toast.error("Please select a valid  title");
      }
      //Error checking for page two
      if (currentPageIndex === 2) {
        // error cases for movie
        if (titlesData.type === "Movie") {
          if (
            !ticketsData.expiryTime ||
            !ticketsData.showTime ||
            !ticketsData.language ||
            !ticketsData.screenNo ||
            !ticketsData.seatDetails.seatNumbers ||
            !ticketsData.ticketPrice ||
            !ticketsData.ticketQuantity ||
            !ticketsData.venue
          )
            return toast.error("Please fill all the fields");
        }
        // error case for event and sport
        if (titlesData.type === "Event" || titlesData.type === "Sport") {
          if (
            !ticketsData.expiryTime ||
            !ticketsData.showTime ||
            !ticketsData.seatDetails.entryGate ||
            !ticketsData.seatDetails.row ||
            !ticketsData.seatDetails.seatNumbers ||
            !ticketsData.ticketPrice ||
            !ticketsData.ticketQuantity ||
            !ticketsData.venue
          )
            return toast.error("Please fill all the fields");
        }
      }
      //Error checking for page 4
      if (currentPageIndex === 3) {
        if (!ticketsData.userDescription)
          return toast.error("Please enter a description");
        // if no error then mutate and move to page 4 where results wll come based on the api response
        addTicketMutation.mutate(ticketsData);
        setCurrentPageIndex((prev) => prev + 1);
      }

      if (currentPageIndex === 4) {
        // 4th page is the snack bar showing the success message

        if (isError)
          return toast.error("An error occured while posting the ticket");
        if (isPending)
          return console.log("Sending a request to post the ticket");
      }
      setCurrentPageIndex((prev) => prev + 1);
    } else {
      //Count --
      if (currentPageIndex > 0) setCurrentPageIndex((prev) => prev - 1);
    }
  };

  //Swttich statement to render thje page inside the dialogbox
  const renderPage = () => {
    switch (currentPageIndex) {
      case 0:
        return (
          <PageZero
            setTitlesData={SetTitlesData}
            toggleDialogBox={toggleDialogBox}
          />
        );
      case 1:
        return (
          <PageOne
            ticketData={ticketsData}
            titlesData={titlesData}
            setTicketData={setTicketData}
            setTitlesData={SetTitlesData}
            toggleDialogBox={toggleDialogBox}
          />
        );
      case 2:
        return (
          <PageTwo
            ticketData={ticketsData}
            titlesData={titlesData}
            setTicketData={setTicketData}
            setTitlesData={SetTitlesData}
            toggleDialogBox={toggleDialogBox}
          />
        );

      case 3:
        return (
          <PageThree
            ticketData={ticketsData}
            titlesData={titlesData}
            setTicketData={setTicketData}
            setTitlesData={SetTitlesData}
            toggleDialogBox={toggleDialogBox}
          />
        );
      default:
        if (isPending)
          return (
            <div className="text-white text-center py-4">
              Uploading ticket...
            </div>
          );
        if (isError)
          return (
            // failureSnackBarActually
            <SuccessSnackBar
              imgUrl="/icons/error-icon.svg"
              SuccessMessage="Error occured while posting the ticket"
            />
          );
        if (isSuccess)
          return (
            <SuccessSnackBar SuccessMessage="Posted ticket successfully" />
          );
        return (
          <div className="text-gray-300 text-center py-4">Submitting...</div>
        );
    }
  };

  return ReactDOM.createPortal(
    <motion.div
      variants={popUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        duration: ANIMATION_DURATION * 2,
        ease: "easeOut",
      }}
      className="blurred-background fixed inset-0 backdrop-blur-[0.5px] md:backdrop-blur-sm flex items-center justify-center z-[999999] scale-110 md:scale-100"
    >
      <div className="create-new-ticket-dialogue-box  w-[360px] md:w[400px] lg:w-[500px] p-4 bg-black rounded-xl backdrop-blur-sm flex flex-col items-center gap-3 scale-90 ">
        {currentPageIndex >= 1 && currentPageIndex < 4 && (
          <ProgressIndicator currentStep={currentPageIndex} />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPageIndex}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full flex flex-col items-center gap-3"
          >
            {/* Render the content of the current page */}
            {renderPage()}
          </motion.div>
        </AnimatePresence>
        {/** Global handling buttons to control the page index **/}
        {currentPageIndex < 4 && (
          <div className="buttons-div w-full flex flex-row gap-5">
            {currentPageIndex >= 1 && (
              <button
                onClick={() => hanldePageIndexChange(false)}
                className="w-full px-6 py-3.5 md:py-3.5 bg-[#9F64DA] text-white rounded-md text-[clamp(16px,2vw,24px)] font-semibold leading-tight flex justify-center items-center gap-3 scale-3d hover:scale-105 hover:opacity-90 cursor-pointer hover:text-white active:opacity-100 transition-all duration-200"
              >
                Previous
              </button>
            )}
            <button
              onClick={() => hanldePageIndexChange(true)}
              className="w-full px-6 py-3.5 md:py-3.5 bg-[#9F64DA] text-white text-[clamp(16px,2vw,24px)] font-semibold leading-tight rounded-md flex justify-center items-center gap-3 scale-3d hover:scale-105 hover:opacity-90 cursor-pointer hover:text-white active:opacity-100 transition-all duration-200"
            >
              {currentPageIndex == 0
                ? "Continue"
                : currentPageIndex == 3
                ? "Upload Post"
                : currentPageIndex >= 1 && currentPageIndex <= 3
                ? "Next"
                : "Post"}
            </button>
          </div>
        )}
      </div>
    </motion.div>,
    document.body
  );
};

export default PostNewTickDialogBox;
