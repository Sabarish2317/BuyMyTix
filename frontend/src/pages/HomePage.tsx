import React from "react";
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
import { SearchBarDb } from "../components/Global/SearchBarDb";
import LoadingTitlesCard from "../components/LoadingSkeletons/LoadingTitlesCard";

// interface HomePageProps {}

const HomePage: React.FC = () => {
  const { isLoading, userData } = useProfile();
  // Movies
  const popularMoviesQuery = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () => getHomePageRecommendations("popular", "Movie"),
    staleTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const trendingMoviesQuery = useQuery({
    queryKey: ["trendingMovies"],
    staleTime: 1000 * 60 * 10,
    queryFn: () => getHomePageRecommendations("trending", "Movie"),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Events
  const popularEventsQuery = useQuery({
    queryKey: ["popularEvents"],
    staleTime: 1000 * 60 * 10,
    queryFn: () => getHomePageRecommendations("popular", "Event"),
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const trendingEventsQuery = useQuery({
    staleTime: 1000 * 60 * 10,
    queryKey: ["trendingEvent"],
    queryFn: () => getHomePageRecommendations("trending", "Event"),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Sports
  const popularSportsQuery = useQuery({
    staleTime: 1000 * 60 * 10,

    queryKey: ["popularSports"],
    queryFn: () => getHomePageRecommendations("popular", "Sport"),
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const trendingSportsQuery = useQuery({
    staleTime: 1000 * 60 * 10,
    queryKey: ["trendingSports"],
    queryFn: () => getHomePageRecommendations("trending", "Sport"),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <Layout
        className=" w-screen h-screen flex justify-center self-center items-center bg-black "
        isHomePage={true}
      >
        <TickLoader />
      </Layout>
    );

  return (
    <Layout className="bg-[linear-gradient(to_right,#0D0B11_10%,#261349_80%)] ">
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
        <div className="margin relative my-4 h-[56px]">
          <SearchBarDb />
        </div>

        <RecommendationRow
          title="Popular Movies"
          data={popularMoviesQuery.data}
          isLoading={popularMoviesQuery.isLoading}
          alt="Movie"
        />
        <RecommendationRow
          title="Trending Movies now"
          data={trendingMoviesQuery.data}
          isLoading={trendingMoviesQuery.isLoading}
          alt="Movie"
        />
        <RecommendationRow
          title="Popular Events"
          data={popularEventsQuery.data}
          isLoading={popularEventsQuery.isLoading}
          alt="Event"
        />
        <RecommendationRow
          title="Trending Events now"
          data={trendingEventsQuery.data}
          isLoading={trendingEventsQuery.isLoading}
          alt="Event"
        />
        <RecommendationRow
          title="Popular Sports"
          data={popularSportsQuery.data}
          isLoading={popularSportsQuery.isLoading}
          alt="Sport"
        />

        <RecommendationRow
          title="Trending Sports now"
          data={trendingSportsQuery.data}
          isLoading={trendingSportsQuery.isLoading}
          alt="Sport"
        />
      </motion.div>
    </Layout>
  );
};

export default HomePage;

//helper slave
export const RecommendationRow: React.FC<{
  title: string;
  data?: AddTitlesRequest[];
  isLoading?: boolean;
  alt: string;
}> = ({ title, data = [], isLoading = false, alt }) => {
  if (isLoading) {
    return (
      <div className="component-movies-row flex flex-col gap-4 mt-4 h-max">
        <div className="justify-center text-[clamp(18px,3vw,28px)] text-white font-regular">
          {title}
        </div>
        <div className="movies-row flex flex-row gap-6 h-max  overflow-x-scroll">
          {[...Array(10)].map((i) => (
            <LoadingTitlesCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!data.length) return null;

  return (
    <div className="component-movies-row flex flex-col gap-2 mt-4 h-max">
      <div className="justify-center text-[clamp(18px,3vw,28px)] text-white font-regular">
        {title}
      </div>
      <div className="movies-row flex flex-row gap-6 h-max overflow-visible overflow-x-scroll py-2">
        {data.map((item) => (
          <DetailCard
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
