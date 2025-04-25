import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { updateTicketById } from "../../queries/Tickets";
import { ProfileResponse } from "../../types/Profile";
import { userTicketHistory } from "../../types/Ticket";
import { AddTitlesRequest } from "../../types/Titles";
import Input from "../Global/Input";

interface EditDialogBoxProps {
  toggleDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
  userTicketHistory: userTicketHistory;
  userData: ProfileResponse;
}

export const EditDialogBox: React.FC<EditDialogBoxProps> = ({
  toggleDialogBox,
  userTicketHistory,
}) => {
  const [err, setErr] = useState("");

  const showTime = new Date(userTicketHistory.ticketDetails.showTime);

  const [ticketQuantity, setTicketQuantity] = useState(
    userTicketHistory.ticketDetails.ticketQuantity.toString()
  );
  const [ticketPrice, setTicketPrice] = useState(
    userTicketHistory.ticketDetails.ticketPrice.toString()
  );
  const [venue, setVenue] = useState(userTicketHistory.ticketDetails.venue);
  const [screenNo, setScreenNo] = useState(
    userTicketHistory.ticketDetails.screenNo
  );
  const [language, setLanguage] = useState(
    userTicketHistory.ticketDetails.language
  );
  const [seatNumbers, setSeatNumbers] = useState(
    userTicketHistory.ticketDetails.seatDetails.seatNumbers
  );
  const [entryGate, setEntryGate] = useState(
    userTicketHistory.ticketDetails.seatDetails.entryGate || ""
  );
  const [row, setRow] = useState(
    userTicketHistory.ticketDetails.seatDetails.row || ""
  );
  const [showDateTime, setShowDateTime] = useState(showTime);

  const titlesData = userTicketHistory.eventRef as AddTitlesRequest;

  // Store initial values for comparison
  const initialValues = useMemo(
    () => ({
      ticketQuantity: userTicketHistory.ticketDetails.ticketQuantity.toString(),
      ticketPrice: userTicketHistory.ticketDetails.ticketPrice.toString(),
      venue: userTicketHistory.ticketDetails.venue,
      screenNo: userTicketHistory.ticketDetails.screenNo,
      language: userTicketHistory.ticketDetails.language,
      seatNumbers: userTicketHistory.ticketDetails.seatDetails.seatNumbers,
      entryGate: userTicketHistory.ticketDetails.seatDetails.entryGate || "",
      row: userTicketHistory.ticketDetails.seatDetails.row || "",
      showDateTime: showTime.toISOString(),
      expiryTime: showDateTime.toISOString(),
    }),
    [userTicketHistory]
  );

  const hasChanges = useMemo(() => {
    return (
      ticketQuantity !== initialValues.ticketQuantity ||
      ticketPrice !== initialValues.ticketPrice ||
      venue !== initialValues.venue ||
      (titlesData.type === "Movie" && screenNo !== initialValues.screenNo) ||
      (titlesData.type === "Movie" && language !== initialValues.language) ||
      seatNumbers !== initialValues.seatNumbers ||
      (titlesData.type !== "Movie" &&
        (entryGate !== initialValues.entryGate || row !== initialValues.row)) ||
      showDateTime.toISOString() !== initialValues.showDateTime
    );
  }, [
    ticketQuantity,
    ticketPrice,
    venue,
    screenNo,
    language,
    seatNumbers,
    entryGate,
    row,
    showDateTime,
    initialValues,
    titlesData.type,
  ]);

  const getTicketHistoryQuery = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateTicket"],
    mutationFn: async () => {
      return await updateTicketById(userTicketHistory.ticketDetails._id, {
        email: "",
        eventRef: userTicketHistory.eventRef._id,
        expiryTime: showDateTime,
        language: titlesData.type === "Movie" ? language : undefined,
        screenNo: titlesData.type === "Movie" ? screenNo : undefined,
        seatDetails: {
          entryGate,
          row,
          seatNumbers,
        },
        showTime: showDateTime,

        ticketPrice: parseInt(ticketPrice),
        ticketQuantity: parseInt(ticketQuantity),
        userDescription: userTicketHistory.ticketDetails.userDescription,
        venue,
      });
    },
    onSuccess: () => {
      toggleDialogBox(false);
      getTicketHistoryQuery.invalidateQueries({
        queryKey: ["ticketHistory", localStorage.getItem("token")],
      });
    },
    onError: () => {
      setErr("Something went wrong. Try again.");
    },
  });

  const handleSave = () => {
    if (!ticketQuantity || !ticketPrice || !venue) {
      return setErr("Ticket quantity, price and venue are required.");
    }
    mutate();
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#171717] border border-[#272727] text-white p-4 flex flex-col gap-2 rounded-xl w-[450px]">
        {/* Header and Close */}
        <div className="flex justify-between items-start">
          <div className="text-left">
            <h2 className="text-white text-[clamp(20px,2vw,24px)] font-black uppercase">
              Edit your Ticket
            </h2>
            <h3
              className={`${
                err ? "text-red-600" : "text-white"
              } text-[clamp(12px,1vw,16px)]`}
            >
              Update the ticket info
            </h3>
          </div>
          <img
            src={"/icons/close-icon.svg"}
            alt="close"
            className="cursor-pointer hover:opacity-80 transition-all"
            onClick={() => toggleDialogBox(false)}
          />
        </div>

        {/* Inputs */}
        <div className="inputs-container flex flex-col gap-2 w-full">
          {/* Ticket quantity and price */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
            <Input
              name="Ticket Quantity"
              intputValue={ticketQuantity}
              setInputValue={setTicketQuantity}
              title="Ticket Quantity"
              placeholder="Enter no. of tickets"
              type="num"
              maxLength={3}
            />
            <Input
              name="Ticket Price"
              intputValue={ticketPrice}
              setInputValue={setTicketPrice}
              title="Ticket Price"
              placeholder="Enter price per ticket"
              type="num"
              maxLength={6}
              prefixText="₹"
            />
          </div>
          {/* venue spclific */}
          <Input
            name={
              titlesData.type === "Movie" ? "Theatre & city" : "Venue & city"
            }
            intputValue={venue}
            setInputValue={setVenue}
            title={
              titlesData.type === "Movie" ? "Theatre & city" : "Venue & city"
            }
            placeholder={
              titlesData.type === "Movie"
                ? "eg.,: PVR Cinemas, Chennai"
                : "eg.,: Chinnaswamy stadium, Chennai"
            }
            maxLength={52}
          />
          {/* Movie-specific */}
          {titlesData.type === "Movie" && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
              <Input
                name="Screen No"
                intputValue={screenNo}
                setInputValue={setScreenNo}
                title="Screen No"
                placeholder="e.g., Screen 1"
                maxLength={24}
              />
              <Input
                name="Language"
                intputValue={language}
                setInputValue={setLanguage}
                title="Language"
                placeholder="e.g., English"
                maxLength={32}
              />
            </div>
          )}

          {/* Seat details */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
            <Input
              name="Seat Numbers"
              intputValue={seatNumbers}
              setInputValue={setSeatNumbers}
              title="Seat Numbers"
              placeholder="A1, A2"
              maxLength={52}
            />
          </div>
          {(titlesData.type === "Sport" || titlesData.type === "Event") && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
              <Input
                name="Entry Gate"
                intputValue={entryGate}
                setInputValue={setEntryGate}
                title="Entry Gate"
                placeholder="Gate 3"
                maxLength={32}
              />
              <Input
                name="Row"
                intputValue={row}
                setInputValue={setRow}
                title="Row"
                placeholder="Row B"
                maxLength={32}
              />
            </div>
          )}

          {/* Show time and expiry time */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5 ">
            <div className="flex flex-col gap-1 ">
              <label className="text-white font-bold">Show Date</label>
              <input
                type="date"
                value={showDateTime.toISOString().split("T")[0]}
                onChange={(e) => {
                  const [year, month, day] = e.target.value.split("-");
                  const updated = new Date(showDateTime);
                  updated.setFullYear(+year, +month - 1, +day);
                  setShowDateTime(updated);
                }}
                className="p-3 rounded text-black bg-white"
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <label className="text-white font-bold">Show Time</label>
              <input
                type="time"
                value={showDateTime.toTimeString().slice(0, 5)}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(":");
                  const updated = new Date(showDateTime);
                  updated.setHours(+hours, +minutes);
                  setShowDateTime(updated);
                }}
                className="p-3 rounded text-black bg-white"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!hasChanges || isPending}
          className={`w-full px-6 py-3.5  text-white text-[clamp(16px,1.4vw,20px)] font-semibold leading-tight rounded-md flex justify-center items-center
               gap-3 mt-2  ${
                 hasChanges
                   ? "bg-[#9F64DA] scale-3d hover:scale-105 hover:opacity-90 cursor-pointer hover:text-white active:opacity-100 transition-all duration-200"
                   : "bg-gray-500"
               } `}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};
