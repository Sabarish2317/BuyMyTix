import { easeInOut } from "motion";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Global/Layout";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import { SearchBar } from "../components/Global/SearchBarAll";
import { MOVEMENT_DISTANCE } from "../utils/constants";
import FilterDialogBox from "../components/DialogBoxes/FilterDialogueBox/FilterDialogBox";
import AdSpace from "../components/Global/AdSpace";
import { ProfileResponse } from "../types/Profile";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HOME_PAGE } from "../routes/appRoutes";
import { useQuery } from "@tanstack/react-query";
import { searchWithFilter } from "../queries/Titles";
import { RecommendationRow } from "./HomePage";

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [q, setQ] = useState(query || "");
  //wll be used later if filter function is involved
  const [y] = useState("All");
  const [ticketType] = useState("All");
  const [language] = useState("All");

  useEffect(() => {
    if (query === "undefined" || !query) {
      navigate(HOME_PAGE);
    } else {
      setQ(query);
    }
  }, [query, navigate]);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["search-with-filter", q, y, ticketType, language],
    queryFn: () => searchWithFilter(q, y, ticketType, language),
    enabled: !!q,
  });

  const [isFilterDialogBoxVisible, ToggleDialogueBoxVisiblity] =
    useState(false);

  return (
    <Layout className="bg-[linear-gradient(to_bottom,#0D0B11_10%,#261349_80%)]">
      <TopNavigationBar userData={{} as ProfileResponse} delay={0} />
      <motion.div
        initial={{ opacity: 0, y: MOVEMENT_DISTANCE }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          delay: 0.2,
          ease: easeInOut,
        }}
        className="main-container overflow-visible w-full"
      >
        <AdSpace />

        {/* Search bar with filters */}
        <div className="margin relative my-4 h-[56px]">
          <SearchBar intputValue={q} />
        </div>

        <h3
          onClick={() => ToggleDialogueBoxVisiblity(true)}
          className="text-[clamp(18px,2.5vw,24px)] w-max text-white font-semibold scale-3d hover:scale-102 hover:opacity-80 active:scale-100 active:opacity-100 transition-all duration-200 origin-left cursor-pointer"
        >
          Results for "{q}"
        </h3>

        {/* filters panel */}
        <div className="filters-panel w-min hidden">
          <h3
            onClick={() => ToggleDialogueBoxVisiblity(true)}
            className="text-[clamp(18px,2.5vw,24px)] w-max text-[#DC3912] font-semibold scale-3d hover:scale-102 hover:opacity-80 active:scale-100 active:opacity-100 transition-all duration-200 origin-left cursor-pointer"
          >
            Add filter
          </h3>
        </div>

        <AnimatePresence mode="wait">
          {isFilterDialogBoxVisible && (
            <FilterDialogBox
              setToggleDialogueBox={ToggleDialogueBoxVisiblity}
            />
          )}
        </AnimatePresence>

        {/* Error */}
        {isError && (
          <div className="w-full text-center text-red-500 py-10">
            Something went wrong: {error?.message}
          </div>
        )}

        {/* Results */}
        {!isError && (
          <>
            <RecommendationRow
              title="Movies"
              data={data?.Movie || []}
              isLoading={isLoading}
              alt="Movie"
            />
            <RecommendationRow
              title="Events"
              data={data?.Event || []}
              isLoading={isLoading}
              alt="Event"
            />
            <RecommendationRow
              title="Sports"
              data={data?.Sport || []}
              isLoading={isLoading}
              alt="Sport"
            />
          </>
        )}
      </motion.div>
    </Layout>
  );
};

export default ResultsPage;
