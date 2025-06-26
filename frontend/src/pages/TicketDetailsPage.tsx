import { easeInOut } from "motion";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Global/Layout";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import { MOVEMENT_DISTANCE } from "../utils/constants";
import TicketDetailsTile from "../components/TicketDetailsPage/TicketDetailsTile";
import TicketDetail from "../components/TicketDetailsPage/TicketDetail";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../queries/Tickets";

import TickLoader from "../components/Global/LoadingIcon";
import { DbSearchTitleResponse } from "../types/Titles";
import DetailCard from "../components/Global/DetailCard";

const TicketDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { userData, isLoading: isProfileLoading } = useProfile();
  const [setIsDummySetState] = useState(false);
  const [searchParams] = useSearchParams();
  const [eventRefId, setEventRefId] = useState<string>("");
  const location = useLocation();
  const titlesDataFromSearch: DbSearchTitleResponse = location.state?.data;
  const searchQuery: string = location.state?.searchQuery;

  const [selectedIndex, setSelectedIndex] = useState(0);

  // 1. Load eventRefId on mount
  useEffect(() => {
    const refId = searchParams.get("eventRefId");
    if (refId) {
      setEventRefId(refId);
      setSelectedIndex(0);
    } else {
      navigate("/errorPage");
    }
  }, [searchParams, navigate]);

  // 2. Load tickets **only after** eventRefId is updated
  const {
    data: ticketData,
    isLoading: isTicketsLoading,
    isError: isTicketsError,
  } = useQuery({
    queryKey: ["tickets", eventRefId],
    queryFn: () => getTickets(eventRefId),
    enabled: !!userData && !!eventRefId, // keep this
    retry: 0,
  });

  const [isSellTicketDialogBoxVisible, setSellTicketDialogBoxVisible] =
    useState(false);
  const toggleSellTicketBox = () => {
    setSellTicketDialogBoxVisible((prev) => !prev);
  };

  // === Loading states ===
  if (isProfileLoading || (userData && isTicketsLoading)) {
    return (
      <Layout
        className="w-screen h-screen flex justify-center items-center bg-black"
        isHomePage
      >
        <TickLoader />
      </Layout>
    );
  }

  // === Error states ===
  if (!userData) {
    return (
      <Layout
        className="w-screen h-screen flex justify-center items-center bg-black"
        isHomePage
      >
        <div className="flex flex-col items-center">
          <img
            className="scale-75"
            src="/images/tickets-not-found-illustration.svg"
            alt="tickets-not-found-illustration"
          />
          <h2 className="text-white text-xl font-semibold mt-4">
            Failed to load user data
          </h2>
        </div>
      </Layout>
    );
  }

  if (isTicketsError) {
    return (
      <Layout
        className="w-screen h-screen flex justify-center items-center bg-black"
        isHomePage
      >
        <div className="flex flex-col items-center">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: easeInOut }}
            src="/images/tickets-not-found-illustration.svg"
            alt="No tickets found"
            className="w-60"
          />
          <h2 className="text-white text-xl font-semibold mt-4">
            No tickets found
          </h2>
        </div>
      </Layout>
    );
  }

  // === Main Content ===
  if (ticketData) {
    const { title, listings } = ticketData.data;

    return (
      <Layout className="bg-[linear-gradient(to_right,#0D0B11_10%,#261349_80%)]">
        <TopNavigationBar
          sellTicketBox={isSellTicketDialogBoxVisible}
          userData={userData}
          delay={0.2}
        />
        <motion.div
          initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeInOut }}
          className="main-container flex flex-col md:flex-row w-full items-start select-none h-max"
        >
          {/* Left Side - Tickets */}
          <div className="tickets-left-side flex-2 w-full flex flex-col gap-6 h-max">
            {/* Poster Section */}
            <div className="poster-and-details-container w-full flex  h-[200px] md:h-[300px] rounded-[12px] overflow-clip relative">
              <img
                className="w-full h-full object-cover object-top blur-[2px] brightness-50"
                src={title.poster}
                alt="poster"
              />
              <div className="description-container absolute bottom-4 left-4 md:bottom-8 md:left-8">
                <h2 className="text-white text-[clamp(20px,2.5vw,32px)] font-bold">
                  {title.title} ({title.year})
                </h2>
                <div className="imdb flex gap-2 text-white text-[clamp(16px,1.5vw,20px)]">
                  <img src="/icons/imdb.svg" alt="imdb" />
                  <h3>{title.rating || "Rating"}</h3>
                </div>
                <h3 className="text-white text-[clamp(16px,1.5vw,20px)] font-regular w-full pr-8">
                  {title.description || "Description"}
                </h3>
              </div>
            </div>
            <div className="SELL TICKET HINT  flex md:hidden  my-3 rounded-lg p-3 bg-white/6   font-regular text-white gap-3 items-center justify-between text-[clamp(12px,1vw,18px)] ">
              <div className="div flex flex-row gap-3 items-center justify-start">
                <img
                  className="scale-80"
                  src="/icons/shining-star.svg"
                  alt="star"
                />
                Having extra tickets ?
              </div>
              <button
                onClick={toggleSellTicketBox}
                className="px-4    text-[clamp(12px,1vw,18px)]   py-2 md:px-6 md:py-3 text-white bg-[#ff3300] rounded-sm justify-center items-center gap-2.5 flex
       font-medium hover:scale-95 hover:opacity-80 transition-all duration-200 active:scale-105 active:opacity-100 cursor-pointer"
              >
                Sell your tickets
              </button>
            </div>
            {/* Tickets */}
            <h2 className="text-white text-[clamp(20px,2vw,28px)] font-semibold">
              Tickets
            </h2>
            <div className="ticket-details-tile-container grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(360px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
              {Object.entries(listings).map(([id, listing], index) => (
                <TicketDetailsTile
                  ticketId={id}
                  userData={userData}
                  key={id}
                  index={index}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  ticketData={listing.ticketDetails}
                  titlesData={title}
                  sellerData={listing.sellerDetails}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Selected Ticket Detail */}
          <div className="other-results-right-side w-full  flex-1 flex-col gap-3 md:scale-90 origin-left md:origin-top-right h-max mt-4 md:mt-0">
            <div className={`hidden md:flex lg:flex xl:flex`}>
              {listings && Object.values(listings)[selectedIndex] ? (
                <TicketDetail
                  setToggleDialogueBox={toggleSellTicketBox}
                  userDetail={userData}
                  eventId={eventRefId}
                  ticketData={
                    Object.values(listings)[selectedIndex].ticketDetails
                  }
                  titlesData={title}
                  sellerData={
                    Object.values(listings)[selectedIndex].sellerDetails
                  }
                />
              ) : (
                <div className="text-white text-lg mt-4">
                  No ticket selected
                </div>
              )}
            </div>

            {/* Other results from search */}
            {searchQuery && titlesDataFromSearch && (
              <>
                <h2 className="text-white text-[clamp(20px,2vw,28px)] font-semibold mb-4">
                  {searchQuery.startsWith("Popular") ||
                  searchQuery.startsWith("Trending")
                    ? searchQuery
                    : `Other results for ${searchQuery}`}
                </h2>
                <div className="w-full grid grid-cols-4 justify-center md:grid-cols-3 gap-4">
                  {Object.entries(titlesDataFromSearch).map(([id, listing]) => (
                    <DetailCard
                      forwardingData={{} as DbSearchTitleResponse[]}
                      index={0}
                      key={id}
                      alt={listing.title}
                      forwardUrl={listing.eventId}
                      imgSrc={listing.poster}
                      title={listing.title}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </Layout>
    );
  }

  return (
    <Layout
      className="w-screen h-screen flex justify-center items-center bg-black"
      isHomePage
    >
      <h2 className="text-white text-[clamp(20px,2.5vw,32px)] font-bold">
        No tickets found
      </h2>
    </Layout>
  );
};

export default TicketDetailsPage;
