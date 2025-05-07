import React, { useState } from "react";
import { Ticket, userTicketHistory } from "../../types/Ticket";
import { AddTitlesRequest } from "../../types/Titles";
import { getImageForType } from "../../utils/getImageForType";
import { ProfileResponse } from "../../types/Profile";
import { dateFormatter } from "../../utils/dataConverter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteTicket } from "../../queries/Tickets";
import { AnimatePresence } from "motion/react";
import { ConfirmDialogBox } from "../HistoryPage/ConfirmDialogBox";
import { HistoryTicketActions } from "../HistoryPage/HistoryTicketActionDropDown";
import { EditDialogBox } from "../HistoryPage/EditDialogBox";

interface TicketDetailsTileProps {
  ticketId: string;
  userData: ProfileResponse;
  titlesData: AddTitlesRequest;
  ticketData: Ticket;
  sellerData: ProfileResponse;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}

const TicketDetailsTile: React.FC<TicketDetailsTileProps> = ({
  titlesData,
  userData,
  ticketData,
  sellerData,
  selectedIndex,
  setSelectedIndex,
  index,
  ticketId,
}) => {
  //for that kutti oval
  const now = new Date();
  const showTime = new Date(ticketData.showTime); // Ensuring showTime is a Date object
  const diffInMs = showTime.getTime() - now.getTime(); // getTime() ensures you're working with timestamps (numbers)
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24); // Convert to days
  const isMoreThanOneDay = diffInDays >= 1;

  //theriyama rendu type use panitu so ipo custom map
  const userTicketHistory: userTicketHistory = {
    ticketDetails: {
      __v: 0,
      _id: ticketId,
      createdAt: "",
      expiryTime: ticketData.expiryTime.toString(),
      language: ticketData.language,
      screenNo: ticketData.screenNo,
      seatDetails: ticketData.seatDetails,
      sellerId: "",
      showTime: ticketData.showTime.toString(),
      ticketPrice: ticketData.ticketPrice,
      ticketQuantity: ticketData.ticketQuantity,
      updatedAt: "",
      userDescription: ticketData.userDescription,
      venue: ticketData.venue,
    },
    eventRef: {
      //just for the sake of ts it wont update these fields in backend as they are null
      description: "",
      eventId: "",
      poster: "",
      rating: "",
      source: "",
      title: "",
      type: "",
      year: "",
      _id: "",
      imdbID: "",
      createdAt: "",
      updatedAt: "",
      __v: 1,
    },
  };

  //if admin decideds to delete the ticket
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isEditDialogBoxVisible, setEditDialogBoxVisible] = useState(false);
  const getTicketsQuery = useQueryClient();
  const deleteTicketMutate = useMutation({
    mutationFn: deleteTicket,
    onSuccess: () => {
      toast.success("Deleted ticket successfully");
      getTicketsQuery.invalidateQueries({
        queryKey: ["ticket"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const fallbackImg = getImageForType({
    type: titlesData.type,
  } as AddTitlesRequest);
  return (
    <div
      className={`ticket-tile-container flex flex-row gap-3 min-h-min min-w-[300px] max-w-[450px] 
      rounded-xl p-[10px] items-center select-none
      ${
        selectedIndex !== index
          ? "hover:bg-[#ffffff22] active:bg-[#4a4653af]"
          : ""
      }  transition-all duration-100 ease-in-out cursor-pointer
      ${selectedIndex === index ? "bg-[#c83615d4]" : "bg-white/5"}`}
      onClick={() => {
        if (selectedIndex === index) return;
        setSelectedIndex(index);
      }}
    >
      <div className="image-container w-[80px] md:w-[100px] lg:w-[120px] h-full flex-shrink-0">
        <img
          src={titlesData.poster}
          alt={`${titlesData.title} Poster`}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== fallbackImg) {
              target.src = fallbackImg;
            }
          }}
          className="w-full h-full object-cover user-drag-none aspect-[2/3] rounded-lg"
        />
      </div>
      <div className="details-container w-full">
        <div className="w-full upper-details-container relative flex flex-col gap-2 items-center justify-start">
          <div className="title-and-language-container flex flex-row w-full gap-1 justify-between relative">
            <h2 className="text-white text-[clamp(16px,1.5vw,24px)] max-w-[150px] text-ellipsis font-medium pr-2">
              {titlesData.title}
            </h2>
            <h2 className="text-white relative flex flex-row gap-2 text-[clamp(16px,1.2vw,20px)] w-max self-center font-regular pr-2 bg-white/10 py-2 px-3 rounded-md items-center justify-center ">
              {ticketData.language.trim()}
              <button
                onClick={() => setIsActionOpen(!isActionOpen)}
                className={`bg-white/10 hover:bg-white/20 p-2 rounded-md cursor-pointer ${
                  userData.type === "admin" ? "" : "hidden"
                }`}
              >
                <img src="/icons/menu-icon.svg" alt="menu" />
              </button>
            </h2>

            <AnimatePresence mode="wait">
              {isActionOpen && (
                <HistoryTicketActions
                  onEdit={() => setEditDialogBoxVisible(true)}
                  onDelete={() => setIsConfirmVisible(true)}
                  closeActions={() => setIsActionOpen(false)}
                />
              )}
              {isConfirmVisible && (
                <ConfirmDialogBox
                  title="Delete ticket"
                  subtitle="Are you sure you want to delete your ticket?"
                  body="This action is irreversible"
                  onTrueCallBack={() => {
                    deleteTicketMutate.mutate(ticketId);
                    setIsConfirmVisible(false);
                  }}
                  onFalseCallBack={() => setIsConfirmVisible(false)}
                />
              )}
              {isEditDialogBoxVisible && (
                <EditDialogBox
                  userData={userData}
                  toggleDialogBox={setEditDialogBoxVisible}
                  userTicketHistory={userTicketHistory}
                />
              )}
            </AnimatePresence>
          </div>
          <div className="location-container w-full items-center justify-start gap-1 flex flex-row ">
            <img
              className="w-4"
              src="/icons/location-icon.svg"
              alt="location"
            />
            <h3 className="text-[clamp(12px,1.2vw,16px)] text-white/80 font-regular">
              {ticketData.venue}
            </h3>
          </div>
          <div className="tab-container w-full flex flex-row justify-between pr-2">
            <div className="tab-1 flex gap-1 items-center">
              <img src="/icons/ticket.svg" alt="ticket" />
              <h3 className="text-[clamp(12px,1.2vw,16px)] text-white/80 font-medium">
                {ticketData.ticketQuantity}{" "}
                {ticketData.ticketQuantity > 1 ? "Tickets" : "Ticket"}
              </h3>
            </div>
            <div className="tab-2 flex gap-1 items-center">
              <h3 className="text-[clamp(12px,1.2vw,16px)] text-white/80 font-medium">
                {`₹ ${ticketData.ticketPrice}`}
              </h3>
            </div>
            <div className="tab-3 flex gap-1 items-center">
              <img
                src={
                  titlesData.type === "Movie"
                    ? "/icons/movie.svg"
                    : titlesData.type === "Event"
                    ? "/icons/event.svg"
                    : "/icons/sport.svg"
                }
                alt="ticket"
              />
              <h3 className="text-[clamp(12px,1.2vw,16px)] text-white/80 font-medium">
                {titlesData.type}
              </h3>
            </div>
          </div>
          <div className="divider w-full h-[2px] bg-white/95 ">
            <h1 className="hidden">dummy</h1>
          </div>
          <div className="dot-and-time gap-2 flex flex-row items-center self-start">
            <div
              className={`circular-dot w-3 h-3 ${
                isMoreThanOneDay ? "bg-green-400" : "bg-red-400"
              } rounded-full`}
            ></div>
            <h3 className="text-[clamp(12px,1.2vw,16px)] text-white font-regular">
              {dateFormatter(ticketData.showTime.toString())}
            </h3>
          </div>
          <div className="profile-container flex flex-row gap-2 self-start items-center">
            <img
              className="rounded-full w-5 h-5"
              src={
                sellerData.profileImage.data === "empty"
                  ? "/icons/no-profile.png"
                  : sellerData.profileImage.data
              }
              alt="profile"
            />
            <h3 className="text-[clamp(12px,1.2vw,16px)] text-white/80 font-medium">
              {sellerData.name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsTile;
