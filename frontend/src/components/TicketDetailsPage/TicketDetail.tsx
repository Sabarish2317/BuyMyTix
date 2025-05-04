import React from "react";
import { ProfileResponse } from "../../types/Profile";
import { Ticket } from "../../types/Ticket";
import { AddTitlesRequest } from "../../types/Titles";
import { dateFormatter } from "../../utils/dataConverter";

import { useNavigate } from "react-router-dom";
import ReportDialogBox from "../DialogBoxes/ReportDialogBox";
import { AnimatePresence } from "motion/react";
import { BlockDialogBox } from "../DialogBoxes/BlockDialogBox";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import { blockApi } from "../../routes/apiRoutes";

interface TicketDetailProps {
  titlesData: AddTitlesRequest;
  ticketData: Ticket;
  sellerData: ProfileResponse;
  eventId: string;
  userDetail: ProfileResponse;
}

const TicketDetail: React.FC<TicketDetailProps> = ({
  ticketData,
  titlesData,
  sellerData,
  eventId,
  userDetail,
}) => {
  const handleRedirect = () => {
    const query = `${ticketData.venue}`; // e.g., "Murugan Cinemas Coimbatore"
    const encodedQuery = encodeURIComponent(query);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
    window.open(mapsUrl, "_blank"); // open in new tab
  };

  const redirectQuery = encodeURIComponent(eventId || "empty");

  const navigate = useNavigate();

  const [isReportDialogBoxVisible, setIsReportDialogBoxVisible] =
    React.useState(false);
  const [isBlockDialogBoxVisible, setIsBlockDialogBoxVisible] =
    React.useState(false);

  //type conversion as tostring doesnt accept null values
  if (userDetail.email === null || userDetail.email === undefined) {
    userDetail.email = "";
  }
  if (userDetail.type === null || userDetail.type === undefined) {
    userDetail.type = "";
  }
  return (
    <div className=" w-full px-5 py-8 bg-white/5 rounded-xl items-start backdrop-blur-lg flex flex-col gap-6 mb-6 select-text">
      {/* Ticket Details Section */}
      <section className="ticket-details-sction flex w-full flex-col gap-3 items-start">
        <h2 className="text-white  text-[clamp(16px,2vw,28px)] font-bold text-center ">
          Ticket Details
        </h2>

        <div className="flex flex-col gap-2 w-full">
          {/* Movie Info */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[#DC3912]  text-[clamp(16px,1.5vw,22px)] font-bold">
              {`${titlesData.title} (${titlesData.year})`}
            </h3>
            <div className="flex gap-1.5 text-white text-[clamp(16px,1.5vw,20px)] font-medium">
              {ticketData.language && <span>{ticketData.language}</span>}
              {titlesData.type === "Movie" && ticketData.screenNo && (
                <>
                  <span>|</span>
                  <span>{ticketData.screenNo}</span>
                </>
              )}
              {["Sport", "Event"].includes(titlesData.type) &&
                ticketData.seatDetails?.entryGate && (
                  <>
                    <span>|</span>
                    <span>{ticketData.seatDetails.entryGate}</span>
                  </>
                )}
              {["Sport", "Event"].includes(titlesData.type) &&
                ticketData.seatDetails?.row && (
                  <>
                    <span>|</span>
                    <span>{ticketData.seatDetails.row}</span>
                  </>
                )}
            </div>
          </div>

          {/* Seat and Ticket Price */}
          <div className="w-full flex justify-between">
            <div className="w-full">
              <span className="text-white text-[clamp(16px,2vw,20px)] font-medium">
                Seat no:
              </span>
              <br />
              <span className="text-[#DC3912] text-[clamp(16px,2vw,20px)] font-medium">
                {ticketData.seatDetails.seatNumbers || "N/A"}
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="text-white text-[clamp(16px,2vw,20px)] font-regular font-medium w-max">
                ₹{ticketData.ticketPrice}{" "}
                <span className="text-white/70 text-[clamp(16px,2vw,20px)] font-regular font-normal">
                  / per ticket
                </span>
              </div>
              <button className="px-4 py-1 w-full bg-white/75  text-[clamp(16px,2vw,18px)]  backdrop-blur-lg  rounded-lg text-[#DC3912] text-base font-semibold">
                {ticketData.ticketQuantity}{" "}
                {ticketData.ticketQuantity > 1 ? "Tickets" : "Ticket"}
              </button>
            </div>
          </div>

          {/* Venue and Date */}
          <div className="venuce-and-datetext-center w-full flex flex-col items-start gap-1.5 ">
            <div className="text-white text-[clamp(16px,2vw,20px)] font-regular font-medium">
              {ticketData.venue}
            </div>
            <div className="text-white text-[clamp(16px,2vw,20px)] font-regular">
              {dateFormatter(ticketData.showTime.toString())}
            </div>
            <button
              onClick={handleRedirect}
              className="text-white/60 text-lg underline cursor-pointer  scale-3d hover:scale-105 hover:text-white active:opacity-80 transition-all duration-200 ease-in-out"
            >
              View on Maps
            </button>
          </div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="contact-detilas-section flex  w-full items-start flex-col gap-3">
        <h2 className="text-white  text-[clamp(16px,2vw,28px)] font-bold text-center">
          Contact Details
        </h2>

        <div className="flex flex-col gap-1.5">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <span className="text-[#DC3912] w-max text-[clamp(16px,1.8vw,24px)] font-bold">
              {sellerData.name}
            </span>
            <span
              onClick={() => setIsReportDialogBoxVisible(true)}
              className={`text-gray-400 w-max text-[clamp(14px,1.2vw,18px)] font-medium self-center self-middle cursor-pointer
                 hover:scale-105 hover:text-white   active:opacity-80 transition-all duration-200 ease-in-out  ${
                   (userDetail?.email.toString() || "") ===
                   sellerData.email.toString()
                     ? "hidden"
                     : ""
                 }
              ${(userDetail?.email.toString() || "") === null ? "hidden" : ""}`}
            >
              Report user
            </span>
            <span
              onClick={() => setIsBlockDialogBoxVisible(true)}
              className={`text-gray-400 w-max text-[clamp(14px,1.2vw,18px)] font-medium self-center self-middle cursor-pointer
                 hover:scale-105 hover:text-white   active:opacity-80 transition-all duration-200 ease-in-out  ${
                   userDetail?.email.toString() === sellerData.email.toString()
                     ? "hidden"
                     : ""
                 }
                 ${
                   (userDetail?.email.toString() || "") === null ? "hidden" : ""
                 } ${
                (userDetail?.type.toString() || "") !== "admin"
                  ? "hidden"
                  : "visible"
              }`}
            >
              Block user
            </span>
            <AnimatePresence mode="wait">
              {isReportDialogBoxVisible && (
                <ReportDialogBox
                  reportingUserEmail={sellerData.email}
                  setToggleDialogueBox={setIsReportDialogBoxVisible}
                />
              )}
              {isBlockDialogBoxVisible && (
                <BlockDialogBox
                  title="Block User ?"
                  body="Block user from accessing the platform and delete all the tickets of this user."
                  subtitle="This action is irreversible."
                  onTrueCallBack={async () => {
                    try {
                      const response = await axios.delete(blockApi, {
                        data: {
                          blockedEmail: sellerData.email,
                        },
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      });

                      if (response.status === 200) {
                        toast.success("User blocked successfully!");
                        setIsBlockDialogBoxVisible(false);
                      }
                    } catch (error: any) {
                      console.error("Error blocking user:", error);
                      toast.error(
                        error.response?.data?.message || "Failed to block user."
                      );
                      setIsBlockDialogBoxVisible(false);
                    }
                  }}
                  onFalseCallBack={() => setIsBlockDialogBoxVisible(false)}
                />
              )}
            </AnimatePresence>
            {/* <div className="px-3 py-1.5 bg-[#ffffff33] rounded-lg flex items-center gap-3  backdrop-blur-lg ">
              <img src="/icons/heart-liked.svg" alt="" />
              <span className="text-white text-base font-semibold">26</span>
            </div>
            <button className="text-[#DC3912] text-[clamp(16px,2vw,20px)] font-regular underline cursor-pointer  scale-3d hover:text-red-600 hover:scale-105 active:opacity-80 transition-all duration-200 ease-in-out">
              Like
            </button> */}
          </div>

          <div className="flex gap-1.5 text-white text-[clamp(16px,2vw,20px)] font-regular font-medium">
            <span>{sellerData.city}</span>
            <span>|</span>
            <span>{sellerData.state}</span>
          </div>

          {/* Phone Number */}
          <div className="flex gap-3">
            <span className="text-white  text-[clamp(16px,2vw,20px)] font-medium">
              +91{" "}
              {userDetail?.email && userDetail.email.length > 4
                ? sellerData.phone
                : sellerData.phone.slice(0, 4) + "*****"}
            </span>
            {!sellerData?.email && (
              <button
                onClick={() => {
                  navigate(
                    `/Authenticate?mode=login&redirectUrl=${redirectQuery}`
                  );
                }}
                className="text-[#DC3912] text-[clamp(16px,2vw,20px)] font-regular underline cursor-pointer  scale-3d hover:text-red-600 hover:scale-105 active:opacity-80 transition-all duration-200 ease-in-out"
              >
                Log in to view
              </button>
            )}
          </div>
          <div className="description mb-2 flex gap-1.5 text-white text-[clamp(16px,2vw,20px)] font-regular font-medium">
            {ticketData.userDescription}
          </div>
          {/* Social Icons Placeholder */}
          <div className="flex gap-5">
            <button
              onClick={() => window.open(`tel:${sellerData.phone}`)}
              className="w-12 h-12 bg-white/75 rounded-lg flex justify-center items-center cursor-pointer  scale-3d hover:scale-105 active:opacity-80 transition-all duration-200 ease-in-out"
            >
              <img src="/icons/phone.svg" alt="phone" />
            </button>
            <button
              onClick={() => window.open(`https://wa.me/${sellerData.phone}`)}
              className="w-12 h-12 bg-white/75 rounded-lg flex justify-center items-center cursor-pointer scale-3d hover:scale-105 active:opacity-80 transition-all duration-200 ease-in-out"
            >
              <img src="/icons/wp.svg" alt="whatsapp" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TicketDetail;
