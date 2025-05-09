import React, { useEffect } from "react";
import { Ticket } from "../../../types/Ticket";
import { AddTitlesRequest } from "../../../types/Titles";
import Input from "../../Global/Input";
import { useProfile } from "../../../contexts/ProfileContext";
import TickLoader from "../../Global/LoadingIcon";

interface PageThreeProps {
  titlesData: AddTitlesRequest;
  ticketData: Ticket;
  setTitlesData: React.Dispatch<React.SetStateAction<AddTitlesRequest>>;
  setTicketData: React.Dispatch<React.SetStateAction<Ticket>>;
  toggleDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageThree: React.FC<PageThreeProps> = ({
  ticketData,
  setTicketData,
  toggleDialogBox,
}) => {
  //From profile context api
  const { userData, isLoading, isError } = useProfile();
  const [err, setErr] = React.useState<string>("");
  const [userDescription, setUserDescription] = React.useState(
    ticketData.userDescription || ""
  );

  useEffect(() => {
    if (isError) return setErr("Something went wrong");
    if (userData?.email) {
      setTicketData({ ...ticketData, email: userData.email, userDescription });
    } else {
      setErr("Email not found");
    }
  }, [isError, userData, userDescription]);

  if (isLoading) return TickLoader();

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="title-container flex justify-between items-start">
        <div className="text-left">
          <h2 className="text-white text-[clamp(20px,2vw,24px)] font-black uppercase">
            Confirm your details
          </h2>
          <h3
            className={`${
              err ? "text-red-600" : "text-white"
            } text-[clamp(12px,1vw,16px)]`}
          >
            {err ? err : "Check your contact details"}
          </h3>
        </div>
        <img
          src={"/icons/close-icon.svg"}
          alt="close"
          className="cursor-pointer hover:opacity-80 transition-all"
          onClick={() => toggleDialogBox(false)}
        />
      </div>
      {/* Email contianer */}
      <div className="email-container relative self-stretch w-full min-w-[180px]">
        <div className="w-full justify-start text-white text-[clamp(12px,1vw,16px)] font-bold leading-loose">
          Email
        </div>
        <input
          type="email"
          name="email"
          value={userData?.email || ""}
          className="w-full px-3 py-3 bg-white rounded-sm outline-2 outline-white 
                   inline-flex justify-start items-center gap-2 text-black focus:outline-none brightness-75 pointer-events-none"
        />
      </div>
      {/* Phone number container */}
      <div className="email-container relative self-stretch w-full min-w-[180px]">
        <div className="w-full justify-start text-white text-[clamp(12px,1vw,16px)] font-bold leading-loose">
          Phone number
        </div>
        <input
          type="phone number"
          name="phone number"
          value={userData?.phone || ""}
          className="w-full px-3 py-3 bg-white rounded-sm outline-2 outline-white 
                   inline-flex justify-start items-center gap-2 text-black focus:outline-none brightness-75 pointer-events-none"
        />
      </div>
      {/* user description */}
      <Input
        name="Ticket Description"
        intputValue={userDescription}
        setInputValue={setUserDescription}
        title="Ticket Description"
        placeholder="Why are you selling the ticket ?"
        type="str"
        maxLength={200}
      />
    </div>
  );
};

export default PageThree;
