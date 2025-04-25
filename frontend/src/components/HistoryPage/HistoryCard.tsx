import React, { useState } from "react";
import { getImageForType } from "../../utils/getImageForType";
import { dateFormatter } from "../../utils/dataConverter";
import { userTicketHistory } from "../../types/Ticket";
import { AddTitlesRequest } from "../../types/Titles";
import { ProfileResponse } from "../../types/Profile";
import { AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTicket } from "../../queries/Tickets";
import { toast } from "react-toastify";

import { EditDialogBox } from "./EditDialogBox";
import { ConfirmDialogBox } from "./ConfirmDialogBox";
import { HistoryTicketActions } from "./HistoryTicketActionDropDown";

interface HistoryCardProps {
  userTicketHistory: userTicketHistory;
  userData: ProfileResponse;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  userTicketHistory,
  userData,
}) => {
  const now = new Date();
  const showTime = new Date(userTicketHistory.ticketDetails.showTime);
  const diffInMs = showTime.getTime() - now.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  const isMoreThanOneDay = diffInDays >= 1;

  //states for menu box , delete and edit dialog boxes respectively
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isEditDialogBoxVisible, setEditDialogBoxVisible] = useState(false);

  const getTicketHistoryQuery = useQueryClient();
  //stage managment of data to be sent to backend for deletion
  const deleteTicketMutate = useMutation({
    mutationFn: deleteTicket,
    onSuccess: () => {
      toast.success("Deleted ticket successfully");
      getTicketHistoryQuery.invalidateQueries({
        queryKey: ["ticketHistory", localStorage.getItem("token")],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div
      className="ticket-tile-container flex flex-row gap-3 min-w-[300px] max-w-[450px] 
      rounded-xl p-[10px] items-center select-none transition-all bg-white/5"
    >
      <div className="relative w-[80px] md:w-[100px] lg:w-[120px] flex-shrink-0">
        <img
          className={`w-full min-h-full aspect-3/4  object-cover rounded-md ${
            !isMoreThanOneDay ? "brightness-50" : ""
          }`}
          src={
            userTicketHistory.eventRef.poster ||
            getImageForType(userTicketHistory.eventRef as AddTitlesRequest)
          }
          alt="Poster"
        />
        {!isMoreThanOneDay && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-purple-500/10 backdrop-blur-sm text-center rounded-md w-full py-1 text-sm">
            Expired
          </div>
        )}
      </div>

      <div className="details-container w-full relative">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h2 className="text-white text-[clamp(16px,1.5vw,24px)] font-medium max-w-[150px] truncate">
              {userTicketHistory.eventRef.title}
            </h2>
            <button
              onClick={() => setIsActionOpen(!isActionOpen)}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-md cursor-pointer"
            >
              <img src="/icons/menu-icon.svg" alt="menu" />
            </button>
          </div>

          <div className="flex items-center gap-1 text-white/80 text-sm">
            <img
              className="w-4"
              src="/icons/location-icon.svg"
              alt="location"
            />
            {userTicketHistory.ticketDetails.venue}
          </div>

          <div className="flex justify-between items-center text-white/80 text-sm">
            <div className="flex items-center gap-1">
              <img src="/icons/ticket.svg" alt="ticket" />
              {userTicketHistory.ticketDetails.ticketQuantity}{" "}
              {userTicketHistory.ticketDetails.ticketQuantity > 1
                ? "Tickets"
                : "Ticket"}
            </div>
            <div>₹ {userTicketHistory.ticketDetails.ticketPrice} /-</div>
            <div className="flex items-center gap-1">
              <img
                src={
                  userTicketHistory.eventRef.type === "Movie"
                    ? "/icons/movie.svg"
                    : userTicketHistory.eventRef.type === "Event"
                    ? "/icons/event.svg"
                    : "/icons/sport.svg"
                }
                alt="type"
              />
              {userTicketHistory.eventRef.type}
            </div>
          </div>

          <div className="w-full h-[2px] bg-white/95" />

          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isMoreThanOneDay ? "bg-green-400" : "bg-red-400"
              }`}
            />
            <span className="text-white text-sm">
              {dateFormatter(
                userTicketHistory.ticketDetails.showTime.toString()
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <img
              className="rounded-full w-5 h-5"
              src={userData.profileImage.data || "/icons/no-profile.png"}
              alt="profile"
            />
            <span className="text-white/80 text-sm">{userData.name}</span>
          </div>
        </div>

        <AnimatePresence>
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
                deleteTicketMutate.mutate(userTicketHistory.ticketDetails._id);
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
    </div>
  );
};

export default HistoryCard;
