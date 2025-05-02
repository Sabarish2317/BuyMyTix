import React, { useEffect } from "react";
import Input from "../../Global/Input";
import { Ticket } from "../../../types/Ticket";
import { AddTitlesRequest } from "../../../types/Titles";

interface PageTwoProps {
  titlesData: AddTitlesRequest;
  ticketData: Ticket;
  setTitlesData: React.Dispatch<React.SetStateAction<AddTitlesRequest>>;
  setTicketData: React.Dispatch<React.SetStateAction<Ticket>>;
  toggleDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageTwo: React.FC<PageTwoProps> = ({
  titlesData,
  ticketData,
  setTicketData,
  toggleDialogBox,
}) => {
  const [ticketQuantity, setTicketQuantity] = React.useState<number>(
    ticketData.ticketQuantity || 0
  );
  const [ticketPrice, setTicketPrice] = React.useState<number>(
    ticketData.ticketPrice || 0
  );
  const [venue, setVenue] = React.useState<string>(ticketData.venue || "");
  const [venueName, setVenueName] = React.useState<string>(
    ticketData.venue || ""
  );
  const [venueCity, setVenueCity] = React.useState<string>(
    ticketData.venue || ""
  );
  const [language, setLanguage] = React.useState<string>(
    ticketData.language || ""
  );
  const [screenNo, setScreenNo] = React.useState<string>(
    ticketData.screenNo || ""
  );
  const [seatNumbers, setSeatNumbers] = React.useState<string>(
    ticketData.seatDetails?.seatNumbers || ""
  );
  const [entryGate, setEntryGate] = React.useState<string>(
    ticketData.seatDetails?.entryGate || ""
  );
  const [row, setRow] = React.useState<string>(
    ticketData.seatDetails?.row || ""
  );

  const [showDateTime, setShowDateTime] = React.useState<Date>(
    ticketData.showTime || new Date()
  );
  const [expiryDateTime, setExpiryDateTime] = React.useState<Date>(
    ticketData.expiryTime || new Date()
  );

  const [err, setErr] = React.useState<string>("");
  //sepeate to hanlde data and time conversion
  React.useEffect(() => {
    const updatedExpiry = new Date(showDateTime.getTime() + 2 * 60 * 60 * 1000);
    setExpiryDateTime(updatedExpiry);
  }, [showDateTime]);

  useEffect(() => {
    setVenue(`${venueName}, ${venueCity}`);
    //imput sanitastion other things are handles by default html
    if (
      ticketPrice.toString().length > 4 ||
      ticketQuantity.toString().length > 4
    )
      return setErr("Quantity and Price should be less than 10000");

    //updates only if no error
    setTicketData((prev) => ({
      ...prev,
      ticketQuantity,
      ticketPrice,
      eventRef: titlesData.eventId,
      venue: venue.trim(),
      showTime: showDateTime,
      expiryTime: expiryDateTime,
      language: language.trim(),
      screenNo: screenNo.trim(),
      seatDetails: {
        seatNumbers: seatNumbers.trim(),
        entryGate: entryGate.trim(),
        row: row.trim(),
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    ticketQuantity,
    ticketPrice,
    showDateTime,
    expiryDateTime,
    language,
    venueCity,
    venueName,
    screenNo,
    seatNumbers,
    entryGate,
    row,
    entryGate,
    row,
  ]);
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="text-left">
          <h2 className="text-white text-[clamp(20px,2vw,24px)] font-black uppercase">
            "Add your Ticket details"
          </h2>
          <h3
            className={`${
              err ? "text-red-600" : "text-white"
            } text-[clamp(12px,1vw,16px)]`}
          >
            {err ? err : "Add your Ticket details"}
          </h3>
        </div>
        <img
          src={"/icons/close-icon.svg"}
          alt="close"
          className="cursor-pointer hover:opacity-80 transition-all"
          onClick={() => toggleDialogBox(false)}
        />
      </div>

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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
        <Input
          name={titlesData.type === "Movie" ? "Theatre" : "Venue"}
          intputValue={venueName}
          setInputValue={setVenueName}
          title={titlesData.type === "Movie" ? "Theatre" : "Venue"}
          placeholder={
            titlesData.type === "Movie"
              ? "eg.,: PVR Cinemas"
              : "eg.,: Chinnaswamy stadium"
          }
          maxLength={52}
        />
        <Input
          name="city"
          intputValue={venueCity}
          setInputValue={setVenueCity}
          title={titlesData.type === "Movie" ? "Theatre city" : "Venue city"}
          placeholder="Coimbatore"
          maxLength={32}
        />
      </div>

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
  );
};

export default PageTwo;
