import React from "react";
import Layout from "../components/Global/Layout";
import TopNavigationBar from "../components/Global/TopNavigationBar";
import SearchBar from "../components/HomePage/SearchBar";
import DetailCard from "../components/Global/DetailCard";

// interface HomePageProps {}

const HomePage: React.FC = () => {
  return (
    <Layout className=" bg-gradient-to-r from-zinc-950 to-indigo-950">
      <TopNavigationBar isLoggedIn={true} />
      <img className="w-full" src="/images/ad-space.png" alt="google-ads" />
      {/* Search bar with filters */}
      <div className="search-bar-with-filter flex flex-col ">
        <SearchBar />
        <h3 className="text-center self-start text-red-600 text-2xl font-medium ">
          Add Filters
        </h3>
      </div>
      {/* popular movies */}
      <div className="popular-movies-row flex flex-col gap-4 py-4">
        <h3 className="justify-center text-white text-3xl font-medium ">
          Popular Movies in your region
        </h3>
        <div className="movies-row flex flex-row gap-4 overflow-x-scroll">
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
        </div>
      </div>
      {/* Popular concerts */}
      <div className="popular-movies-row flex flex-col gap-4 py-4">
        <h3 className="justify-center text-white text-3xl font-medium ">
          Popular Concert in your region
        </h3>
        <div className="movies-row flex flex-row gap-4">
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
          <DetailCard
            forwardUrl="c"
            imgSrc="/images/vidamuyarchi.png"
            title="Vidamuyarchi"
          ></DetailCard>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
