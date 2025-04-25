import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { fetchTitles } from "../../queries/Titles";
import { DbSearchTitleResponse, SearchTitleRequest } from "../../types/Titles";
import FlippingText from "./FlippingText";
import { useNavigate } from "react-router-dom";
import { TICKET_DETAILS_PAGE } from "../../routes/appRoutes";

export const SearchBarDb: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [debouncedInput, setDebouncedInput] = useState("");

  const [isValidTitleSelected, setIsValidTitleSelected] = useState(Boolean);

  //Scroll the suggestions into the view of the users when using array keys
  const suggestionsRef = React.useRef<HTMLDivElement>(null);
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
    setIsValidTitleSelected(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (titlesData.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < titlesData.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : titlesData.length - 1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < titlesData.length) {
        handleSelectSuggestion(selectedIndex);
      }
    } else if (e.key === "Escape") {
      setSelectedIndex(-1);
      setDebouncedInput("");
    }
  };

  const handleSelectSuggestion = (index: number) => {
    const selected = titlesData[index];
    if (!selected) return;

    setSelectedIndex(-1); // always reset

    if (selected.eventId) {
      //cleanup
      setDebouncedInput("");
      setIsValidTitleSelected(true);
      navigate(`${TICKET_DETAILS_PAGE}/?eventRefId=${selected.eventId}`);
      setInputValue(`${selected.title}`);
      return;
    }
  };

  return (
    <div
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
              className="bg-transparent border-none outline-none text-[clamp(16px,2vw,24px)] font-medium"
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
          <div className="p-4 w-full text-start overflow-y-scroll rounded-md  bg-[#0e1524]  text-white flex flex-col gap-2 items-center absolute mt-17 z-[100] max-h-[300px]  justify-start text-[clamp(12px,1vw,16px)] ">
            No results found
          </div>
        )}

      {Array.isArray(titlesData) && titlesData.length > 0 && (
        <ul
          ref={suggestionsRef}
          className={`w-full absolute mt-16 z-[100] max-h-[300px] overflow-y-scroll rounded-md  bg-[#090e18] `}
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
                  src={item.poster || "/images/popcorn.png"}
                  alt="poster"
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
