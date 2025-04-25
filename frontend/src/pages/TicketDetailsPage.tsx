import { easeInOut } from "motion";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Global/Layout";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import { MOVEMENT_DISTANCE } from "../utils/constants";
import DetailCard from "../components/Global/DetailCard";
import TicketDetailsTile from "../components/TicketDetailsPage/TicketDetailsTile";
import TicketDetail from "../components/TicketDetailsPage/TicketDetail";
import { ProfileResponse } from "../types/Profile";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../queries/Tickets";

import TickLoader from "../components/Global/LoadingIcon";

const TicketDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  //profile cntxt api
  const { userData, isLoading: isProfileLoading } = useProfile();

  const [searchParams] = useSearchParams();
  const [eventRefId, setEventRefId] = useState<string>("");

  useEffect(() => {
    const refId = searchParams.get("eventRefId");
    if (refId) {
      setEventRefId(refId);
    } else {
      navigate("/errorPage");
    }
  }, [searchParams, navigate]);

  // Fetch the tickets when eventRefId changes
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ticket", searchParams],
    queryFn: () => getTickets(eventRefId),
    retry: 0,
    enabled: !!eventRefId,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  if (isProfileLoading)
    return (
      <Layout
        className=" w-screen h-screen flex justify-center self-center items-center bg-black "
        isHomePage={true}
      >
        <TickLoader />
      </Layout>
    );

  return (
    <Layout className="bg-[linear-gradient(to_right,#0D0B11_10%,#261349_80%)]">
      <TopNavigationBar
        userData={userData || ({} as ProfileResponse)}
        delay={0.2}
      />
      {isLoading ? (
        <Layout
          className=" w-screen h-screen flex justify-center self-center items-center bg-black "
          isHomePage={true}
        >
          <TickLoader />
        </Layout>
      ) : isError ? (
        <div className="error container flex flex-row gap-2 items-center justify-center h-screen mt-[-100px]">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0, ease: easeInOut }}
            src="/images/cat-illustration.png"
            alt="sad"
          />
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.2, ease: easeInOut }}
            className="text-white text-[clamp(20px,2.5vw,32px)] font-semibold"
          >
            No Tickets found. womp womp
          </motion.h2>
        </div>
      ) : data ? (
        <motion.div
          initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0,
            ease: easeInOut,
          }}
          className="main-container  flex flex-col  items-start justify-start w-full md:flex-row select-none  "
        >
          <div className="tickets-left-side flex-2 w-full flex flex-col gap-6 h-max">
            <div className="poster-and-details-contaienr w-full flex h-[300px] rounded-[12px] overflow-clip relative">
              <img
                className="w-full h-full object-cover object-top blur-[2px]   brightness-50 "
                src={data?.data.title.poster}
                alt="poster"
              />
              <div className="description-container absolute bottom-8 left-8">
                <h2 className="text-white text-[clamp(20px,2.5vw,32px)] font-bold">
                  {data?.data.title.title || "Movie Name"}{" "}
                  {`(${data?.data.title.year})`}
                </h2>
                <div className="imdb flex flex-row gap-2 text-white text-[clamp(16px,1.5vw,20px)]">
                  {" "}
                  <img src="/icons/imdb.svg" alt="" />
                  <h3> {data?.data.title.rating || "Rating"}</h3>
                </div>
                <h3 className="text-white text-[clamp(16px,1.5vw,20px)] font-regular w-full pr-8">
                  {data?.data.title.description || "Rating"}
                </h3>
              </div>
            </div>
            <h2 className="text-white text-[clamp(20px,2vw,28px)] font-semibold ">
              Tickets
            </h2>
            <div className="ticket-details-tile-container grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
              {Object.entries(data.data.listings).map(
                ([id, listing], index) => (
                  <TicketDetailsTile
                    key={id}
                    index={index}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    ticketData={listing.ticketDetails}
                    titlesData={data.data.title}
                    sellerData={listing.sellerDetails}
                  />
                )
              )}
            </div>
          </div>
          <div className="other-results-right-side w-max flex-1 flex-col gap-3 scale-90 origin-top-right">
            {data.data.listings &&
            Object.values(data.data.listings)[selectedIndex] ? (
              <TicketDetail
                eventId={searchParams.get("eventRefId") || "null"}
                ticketData={
                  Object.values(data.data.listings)[selectedIndex].ticketDetails
                }
                titlesData={data.data.title}
                sellerData={
                  Object.values(data.data.listings)[selectedIndex].sellerDetails
                }
              />
            ) : (
              <div className="text-white text-lg mt-4">No ticket selected</div>
            )}
            <h2 className="text-white text-[clamp(16px,1.5vw,24px)] font-semibold mb-4">
              Other results for "Vid"
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {ticketData.map((ticket, index) => (
                <DetailCard
                  alt="Movie"
                  key={index}
                  forwardUrl="c"
                  imgSrc="/images/vidamuyarchi.png"
                  title={ticket.title}
                ></DetailCard>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <Layout
          className=" w-screen h-screen flex justify-center self-center items-center bg-black "
          isHomePage={true}
        >
          <h2 className="text-white text-[clamp(20px,2.5vw,32px)] font-bold">
            No Tickets found
          </h2>
        </Layout>
      )}
    </Layout>
  );
};

export default TicketDetailsPage;

const ticketData = [
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "09:00 AM",
    date: "Friday, 23 Apr",
    title: "Vidamuyarchi vendam da",
    venue: "Murugan Cinemas",
    city: "Coimbatore",
    language: "Tamil",
    ticketQuant: "2",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "07:30 PM",
    date: "Saturday, 24 Apr",
    title: "Leo",
    venue: "PVR Cinemas",
    city: "Chennai",
    language: "Tamil",
    ticketQuant: "3",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "06:00 PM",
    date: "Sunday, 25 Apr",
    title: "Jailer",
    venue: "INOX Cinemas",
    city: "Bangalore",
    language: "Tamil",
    ticketQuant: "4",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "05:45 PM",
    date: "Monday, 26 Apr",
    title: "Vikram",
    venue: "IMAX",
    city: "Hyderabad",
    language: "Tamil",
    ticketQuant: "2",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "08:00 PM",
    date: "Tuesday, 27 Apr",
    title: "KGF 2",
    venue: "Sathyam Cinemas",
    city: "Chennai",
    language: "Kannada",
    ticketQuant: "5",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "04:30 PM",
    date: "Wednesday, 28 Apr",
    title: "RRR",
    venue: "Luxe Cinemas",
    city: "Mumbai",
    language: "Telugu",
    ticketQuant: "6",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "02:15 PM",
    date: "Thursday, 29 Apr",
    title: "MS Dhoni: The Untold Story",
    venue: "Carnival Cinemas",
    city: "Delhi",
    language: "Hindi",
    ticketQuant: "3",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "10:30 AM",
    date: "Friday, 30 Apr",
    title: "Pathaan",
    venue: "PVR Icon",
    city: "Pune",
    language: "Hindi",
    ticketQuant: "2",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "09:00 PM",
    date: "Saturday, 1 May",
    title: "Avengers: Endgame",
    venue: "Cinepolis",
    city: "Kolkata",
    language: "English",
    ticketQuant: "7",
    callback: () => alert("Ticket Selected!"),
  },
  {
    imgUrl: "/images/vidamuyarchi.png",
    time: "11:45 AM",
    date: "Sunday, 2 May",
    title: "Jawan",
    venue: "INOX",
    city: "Ahmedabad",
    language: "Hindi",
    ticketQuant: "4",
    callback: () => alert("Ticket Selected!"),
  },
];

export { ticketData };
