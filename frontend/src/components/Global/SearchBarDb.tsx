import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import { fetchTitles } from "../../queries/Titles";
import {
  AddTitlesRequest,
  DbSearchTitleResponse,
  SearchTitleRequest,
} from "../../types/Titles";
import FlippingText from "./FlippingText";
import { useNavigate } from "react-router-dom";
import { RESULTS_PAGE, TICKET_DETAILS_PAGE } from "../../routes/appRoutes";
import { getImageForType } from "../../utils/getImageForType";
import useClickOutside from "../../utils/detectOutsideClickHook";

export const SearchBarDb: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const [containerRef, isSuggestionsVisible, setIsSuggestionsVisible] =
    useClickOutside(true);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [debouncedInput, setDebouncedInput] = useState("");

  const [isValidTitleSelected, setIsValidTitleSelected] = useState(Boolean);

  //Scroll the suggestions into the view of the users when using array keys
  const suggestionsRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const activeItem = suggestionsRef.current?.querySelector(
      `[data-index='${selectedIndex}']`
    ) as HTMLElement;

    if (activeItem) {
      activeItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (isValidTitleSelected) return;
    const timer = setTimeout(() => setDebouncedInput(inputValue), 300);
    return () => clearTimeout(timer);
  }, [inputValue]);
  const navigate = useNavigate();
  const {
    data: titlesData = [],
    isLoading,
    isFetched,
  } = useQuery<DbSearchTitleResponse[]>({
    queryKey: ["all titles", debouncedInput],
    staleTime: 1000 * 60,

    queryFn: () =>
      fetchTitles({
        q: debouncedInput.toString(),
        y: "All",
        source: "db",
        type: "All",
      } as SearchTitleRequest),
    enabled: debouncedInput.length > 2,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsSuggestionsVisible(true);
    setIsValidTitleSelected(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const hasResults = titlesData.length > 0;
    const canShowSearchFor =
      inputValue.length > 0 && titlesData.length === 0 && isFetched;

    if (!hasResults && !canShowSearchFor) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => {
        const maxIndex = hasResults ? titlesData.length - 1 : 0; // 0 because only "search for"
        return prev < maxIndex ? prev + 1 : 0;
      });
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => {
        const maxIndex = hasResults ? titlesData.length - 1 : 0;
        return prev > 0 ? prev - 1 : maxIndex;
      });
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        if (hasResults) {
          handleSelectSuggestion(selectedIndex);
        } else if (canShowSearchFor && selectedIndex === 0) {
          handleSearchForClick(); // 👈 new function
        }
      }
    } else if (e.key === "Escape") {
      setSelectedIndex(-1);
      setDebouncedInput("");
    }
  };

  const handleSearchForClick = () => {
    if (debouncedInput.trim()) {
      navigate(`${RESULTS_PAGE}?query=${encodeURIComponent(debouncedInput)}`);
      setInputValue(debouncedInput);
      setDebouncedInput("");
      setSelectedIndex(-1);
      setIsValidTitleSelected(true);
    }
  };

  const handleSelectSuggestion = (index: number) => {
    const selected = titlesData[index];
    if (!selected) return;

    setSelectedIndex(-1); // always reset

    if (selected.eventId) {
      //cleanup and navigation
      setIsValidTitleSelected(true);
      const updatedTickets = titlesData.filter((_, i) => i !== index);
      navigate(`${TICKET_DETAILS_PAGE}/?eventRefId=${selected.eventId}`, {
        state: { data: updatedTickets, searchQuery: debouncedInput },
      });
      setDebouncedInput("");
      setInputValue(`${selected.title}`);
      return;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 w-full self-center z-[90] text-white bg-purple-200/6 rounded-md outline-2 
           outline-offset-[-2px] backdrop-blur-3xl text-[clamp(16px,2vw,24px)] font-medium transition-all
           duration-200 focus:outline-none active:opacity-100 flex flex-col   ${
             isValidTitleSelected ? "outline-green-400/50" : "outline-white/20"
           }`}
    >
      <div className="w-full search-bar-white flex flex-row  h-max items-center gap-3 justify-between">
        <div className="w-full search-input-container flex flex-row gap-2 items-center my-3 mx-4">
          <img
            src="/icons/search.svg"
            alt="search"
            className="w-6 h-6 origin-left scale-80 md:scale-100 hover:scale-105 transition-all
             duration-200 active:scale-110 active:scale-3d cursor-pointer"
          />

          <div className="input-and-flipping-container relative w-full h-max">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-[clamp(16px,2vw,24px)] font-medium"
            />
            {inputValue.length === 0 && <FlippingText />}
          </div>
        </div>
        {/* year picker */}
        {/* <Dropdown2
          options={[
            "All",
            "2025",
            "2024",
            "2023",
            "2022",
            "2021",
            "2020",
            "2019",
            "2018",
            "2017",
          ]}
          selectedOption={year}
          setSelectedOption={setYear}
        /> */}
      </div>

      {isLoading && inputValue.length >= 1 && (
        <div className="p-3 text-white absolute mt-16 z-[100] max-h-[300px] overflow-y-scroll rounded-md  bg-[#090e18] w-full">
          Searching •••
        </div>
      )}
      {isFetched &&
        inputValue.length &&
        titlesData.length === 0 &&
        !isLoading && (
          <ul
            ref={suggestionsRef}
            className="w-full absolute mt-16 z-[100] max-h-[300px] overflow-y-scroll rounded-md  bg-[#090e18]"
          >
            <li
              role="button"
              data-index={0}
              onClick={handleSearchForClick}
              className={`p-4 w-full text-start overflow-y-scroll rounded-md text-white flex flex-col gap-2 items-center justify-start 
        font-semibold text-[clamp(16px,1.5vw,20px)] cursor-pointer transition-all ${
          selectedIndex === 0 ? "bg-[#7349AD]" : "hover:bg-[#7349ad8f]"
        }`}
            >
              <h1 className="w-full text-start">
                See all results for "{debouncedInput}"
              </h1>
            </li>
          </ul>
        )}

      {Array.isArray(titlesData) &&
        isSuggestionsVisible &&
        titlesData.length > 0 && (
          <ul
            ref={suggestionsRef}
            className={`w-full absolute mt-16 md:mt-20 z-[100] max-h-[300px] overflow-scroll rounded-md  bg-[#0c1320] `}
          >
            {titlesData.map((item, index) => (
              <li
                key={index}
                role="button"
                data-index={index}
                onClick={() => handleSelectSuggestion(index)}
                className={`p-3 text-white cursor-pointer transition-all flex flex-row justify-between items-center  ${
                  selectedIndex === index
                    ? "bg-[#7349AD]"
                    : "hover:bg-[#7349ad8f]"
                }`}
              >
                <div className="image-title-date-container flex flex-row justify-start items-center gap-4">
                  <img
                    className="w-12 h-16 object-cover rounded-md"
                    src={item.poster}
                    alt="poster"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (
                        target.src !==
                        getImageForType({ type: item.type } as AddTitlesRequest)
                      ) {
                        target.src = getImageForType({
                          type: item.type,
                        } as AddTitlesRequest);
                      }
                    }}
                  />
                  <div className="title-year flex flex-col gap-1 justify-start align-middle  text-[clamp(16px,1.5vw,20px)]  ">
                    {item.title}
                    <h3 className="text-[clamp(14px,1.5vw,18px)] text-overflow-ellipsis">
                      {item.year}
                    </h3>
                  </div>
                </div>
                {item.type && (
                  <span className="text-[clamp(14px,1.3vw,16px)] text-gray-400 leading-0 ml-2">
                    ({item.type})
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

const DummySearchBarDb: React.FC = () => {
  const dummyResults = [
    {
      title: "Avengers: Endgame",
      year: "2019",
      type: "Movie",
      poster: "/images/avengers-end-game.jpg",
    },
    {
      title: "Avengers: Infinity War",
      year: "2018",
      type: "Movie",
      poster: "/images/avengers-infinity-war.webp",
    },
    {
      title: "Avengers: Age of Ultron",
      year: "2015",
      type: "Movie",
      poster: "/images/avengers-age-of-ultron.jpg",
    },
  ];

  return (
    <div
      className={` scale-90 scale`}
      style={{
        transformStyle: "preserve-3d", // this is the real key here
        transformOrigin: "center",
        perspective: "inherit", // optional if you want to inherit from parent
      }}
    >
      <div
        style={{
          transform: "perspective(1000px) translateZ(0)",
          transformStyle: "preserve-3d",
        }}
        className="w-full self-center z-[90] text-white bg-purple-200/6 rounded-md select-none pointer-events-none outline-2 
           outline-offset-[-2px] backdrop-blur-3xl text-[clamp(16px,2vw,24px)] font-medium transition-all
           duration-200 focus:outline-none active:opacity-100 flex flex-col   outline-white/20"
      >
        <div className="w-full search-input-container flex flex-row gap-2 items-center my-3 mx-4 select-none pointer-events-none">
          <img
            src="/icons/search.svg"
            alt="search"
            className="w-6 h-6 origin-left scale-80 md:scale-100 hover:scale-105 transition-all duration-200 active:scale-110 cursor-pointer"
          />

          <div className="input-and-flipping-container relative w-full h-max">
            <input
              type="text"
              value="Avengers"
              readOnly
              className="w-full bg-transparent border-none outline-none select-none text-[clamp(16px,2vw,24px)] font-medium"
            />
          </div>
        </div>
      </div>

      {/* Dummy Results this is used in the search bar on the landing page */}
      <ul className="w-full mt-2 z-[100] max-h-[300px] overflow-scroll rounded-md bg-[#090e18] ">
        {dummyResults.map((item, index) => (
          <li
            key={index}
            role="button"
            data-index={index}
            className={`p-3 text-white cursor-pointer transition-all flex flex-row justify-between items-center ${
              index === 0 ? "bg-[#7349AD]" : "hover:bg-[#7349ad8f]"
            }`}
          >
            <div className="image-title-date-container flex flex-row justify-start items-center gap-4 cursor-pointer">
              <img
                className="w-12 h-16 object-cover rounded-md"
                src={item.poster || "/images/popcorn.png"}
                alt="poster"
              />
              <div className="title-year flex flex-col gap-1 justify-start align-middle text-[clamp(16px,1.5vw,20px)]">
                {item.title}
                <h3 className="text-[clamp(14px,1.5vw,18px)] text-overflow-ellipsis">
                  {item.year}
                </h3>
              </div>
            </div>
            {item.type && (
              <span className="text-[clamp(14px,1.3vw,16px)] text-gray-400 leading-0 ml-2">
                ({item.type})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export { DummySearchBarDb };
