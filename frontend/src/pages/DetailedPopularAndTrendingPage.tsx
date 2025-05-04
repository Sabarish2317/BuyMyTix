import React, { useState } from "react";
import Layout from "../components/Global/Layout";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import DetailCard from "../components/Global/DetailCard";
import { motion } from "motion/react";
import { MOVEMENT_DISTANCE } from "../utils/constants";
import { easeInOut } from "motion";
import AdSpace from "../components/Global/AdSpace";
import { ProfileResponse } from "../types/Profile";
import { useQuery } from "@tanstack/react-query";
import { getHomePageRecommendations } from "../queries/home";
import { AddTitlesRequest } from "../types/Titles";
import { useProfile } from "../contexts/ProfileContext";
import TickLoader from "../components/Global/LoadingIcon";
import LoadingTitlesCard from "../components/LoadingSkeletons/LoadingTitlesCard";
// import Pagination from "../components/Global/Pagination";

const CategoryPage: React.FC = () => {
  const { isLoading, userData } = useProfile();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const type = params.get("type") || "popular";
  const category = params.get("category") || "Movie";

  const query = useQuery({
    queryKey: ["category", type, category, page],
    queryFn: () => getHomePageRecommendations(type, category, page, pageSize),
    staleTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <Layout className="w-screen h-screen flex justify-center items-center bg-black">
        <TickLoader />
      </Layout>
    );

  return (
    <Layout className="bg-[linear-gradient(to_right,#0D0B11_10%,#261349_80%)]">
      <TopNavigationBar
        userData={userData || ({} as ProfileResponse)}
        delay={0.2}
      />

      <motion.div
        initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0, ease: easeInOut }}
        className="main-container w-full mb-8"
      >
        <AdSpace />
        <RecommendationRow
          title={`${type.charAt(0).toUpperCase() + type.slice(1)} ${category}s`}
          data={query.data}
          isLoading={query.isLoading}
          alt={category}
        />
        {/* <div className="flex justify-center mt-6">
          <Pagination
            currentPage={page}
            totalPages={5} // You can fetch total pages from backend later
            onPageChange={setPage}
          />
        </div> */}{" "}
        {/* //wll implement later */}
      </motion.div>
    </Layout>
  );
};

// Recommendation Row Component (same as before)
const RecommendationRow: React.FC<{
  className?: string;
  title: string;
  data?: AddTitlesRequest[];
  isLoading?: boolean;
  alt: string;
}> = ({ title, data = [], isLoading = false, alt, className = "" }) => {
  if (isLoading) {
    return (
      <div className="component-movies-row flex flex-col gap-4 mt-4 h-max">
        <div className="justify-center text-[clamp(18px,3vw,28px)] text-white font-regular">
          {title}
        </div>
        <div className="movies-row flex flex-row gap-6 h-max overflow-x-scroll">
          {[...Array(10)].map((_, i) => (
            <LoadingTitlesCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!data.length) return null;

  return (
    <div className="component-movies-row flex flex-col gap-2 mt-4 h-max w-full justify-center">
      <div className="justify-center w-full text-[clamp(18px,3vw,28px)] text-white font-regular">
        {title}
      </div>
      <div
        className={`w-full justify-center grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6 mx-auto ${className}`}
      >
        {data.map((item, index) => (
          <DetailCard
            forwardingData={data}
            index={index}
            forwardTitle={title}
            key={item.eventId}
            forwardUrl={item.eventId}
            imgSrc={item.poster}
            title={item.title}
            className="min-w-25 md:min-w-30 lg:min-w-35"
            alt={alt}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
