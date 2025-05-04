import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import FlippingText from "./FlippingText";
import {
  AddTitlesRequest,
  DbSearchTitleResponse,
  SearchTitleRequest,
} from "../../types/Titles";
import { addTitles, fetchTitles } from "../../queries/Titles";
import { Dropdown2 } from "./DropDown";
import { AnimatePresence } from "motion/react";

import React from "react";
import CreateNewTitleDialogBox from "../DialogBoxes/CreateNewTicketDialogBox/CreateNewTitleDialogBox";
import { Ticket } from "../../types/Ticket";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TICKET_DETAILS_PAGE } from "../../routes/appRoutes";

//Used in the landing page
interface SearchBarProps {
  className?: string;
  mainClassName?: string;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
  intputValue: string;
  moveOnTap?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = "",
  mainClassName = "",
  moveOnTap = 0,
  intputValue = "",
}) => {
  const [isUserTyped, setIsUserTyped] = useState(false);

  const [inputValue, setInputValue] = useState(intputValue);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [debouncedInput, setDebouncedInput] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedInput(inputValue), 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const {
    data: titlesData = [],
    isLoading,
    isFetched,
  } = useQuery<DbSearchTitleResponse[]>({
    queryKey: ["db titles", debouncedInput],
    staleTime: 1000 * 60,

    queryFn: () =>
      fetchTitles({
        q: debouncedInput.toString(),
        y: "All",
        source: "db",
      } as SearchTitleRequest),
    enabled: debouncedInput.length > 2,
  });
  useEffect(() => {
    console.table(titlesData);
  }, [titlesData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedIndex(-1);
    setIsUserTyped(true);
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
    }
  };

  const handleSelectSuggestion = (index: number) => {
    const selected = titlesData[index];
    if (!selected) return;

    setInputValue(`${selected.title}`);
    navigate(`${TICKET_DETAILS_PAGE}/?eventRefId=${selected.eventId}`, {});
  };

  return (
    <div
      className={`w-full h-max absolute z-[10] text-white bg-purple-200/6 rounded-md outline-2 outline-white/20
         outline-offset-[-2px] backdrop-blur-3xl text-[clamp(16px,2vw,24px)] font-medium transition-all
         duration-200 focus:outline-none active:opacity-100 flex flex-col overflow-clip ${mainClassName}`}
    >
      <div className="search-input-container flex flex-row justify-start items-center gap-3 px-4 py-2 md:px-6 md:py-3">
        <img
          src="/icons/search.svg"
          alt="search"
          className="w-6 h-6 origin-left scale-80 md:scale-100 hover:scale-105 transition-all
           duration-200 active:scale-110 active:scale-3d cursor-pointer"
        />
        <div className="relative w-full z-100">
          <input
            type="text"
            value={inputValue}
            onClick={() => {
              window.scrollTo({ top: moveOnTap, behavior: "smooth" });
            }}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none text-[clamp(16px,2vw,24px)] font-medium"
          />
          {inputValue.length === 0 && <FlippingText />}
        </div>
      </div>

      {isLoading && isUserTyped && inputValue.length >= 1 && (
        <div className="p-3 text-white">Searching •••</div>
      )}
      {isFetched &&
        isUserTyped &&
        inputValue.length &&
        titlesData.length === 0 &&
        !isLoading && <div className="p-3 text-white">No results found</div>}

      {Array.isArray(titlesData) && titlesData.length > 0 && isUserTyped && (
        <ul className={`w-full z-[100] bg-[#090e18] ${className}`}>
          {titlesData.map((item, index) => (
            <li
              key={index}
              role="button"
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

//used in the add new ticket section
interface SearchBarWhiteProps {
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
  intputValue?: string;
  titlesData: AddTitlesRequest;
  ticketData: Ticket;
  setTitlesData: React.Dispatch<React.SetStateAction<AddTitlesRequest>>;
  setTicketData: React.Dispatch<React.SetStateAction<Ticket>>;
}

const SearchBarWhite: React.FC<SearchBarWhiteProps> = ({
  setTitlesData,
  setTicketData,
  titlesData,
  ticketData,
}) => {
  const [isCreateNewTitleDialogBoxVisible, SetCreateNewTitleDialogBoxVisible] =
    useState(false);

  const [inputValue, setInputValue] = useState(titlesData.title || "");
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [debouncedInput, setDebouncedInput] = useState(titlesData.title || "");

  const [isValidTitleSelected, setIsValidTitleSelected] = useState(Boolean);
  const currentYear = new Date().getFullYear().toString();
  const [year, setYear] = useState(currentYear);
  //to populat the year selecting the drop down box
  //Scroll the suggestions into the view of the users when using array keys
  const suggestionsRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    setIsResultsVisible(false);
  }, []);
  useEffect(() => {
    if (titlesData.eventId) {
      setIsValidTitleSelected(true);
    }
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

  const {
    data: titlesDatas = [],
    isLoading,
    isFetched,
  } = useQuery<DbSearchTitleResponse[]>({
    queryKey: ["all titles", debouncedInput, year],
    staleTime: 1000 * 5,

    queryFn: () =>
      fetchTitles({
        q: debouncedInput.toString(),
        y: year,
        source: "All",
        type: titlesData.type,
      } as SearchTitleRequest),
    enabled: debouncedInput.length > 1 && isResultsVisible,
  });

  // Wll upload titles and get reference if user Selects an omdb result and wll set reference directly if he selects the db result
  const addNewTitleMutation = useMutation({
    mutationKey: ["addNewTitle", titlesDatas[selectedIndex]],
    mutationFn: addTitles,
    onSuccess: (data) => {
      const title: AddTitlesRequest = data.event as AddTitlesRequest;
      setInputValue(`${title.title}`);
      setTitlesData({
        eventId: title.eventId,
        title: title.title,
        poster: title.poster,
        type: title.type,
        source: title.source,
        description: title.description,
        rating: title.rating,
        year: title.year,
      });
      setIsValidTitleSelected(true);
      setSelectedIndex(-1);
      setDebouncedInput("");
    },
    onError: (error) => toast.error(error.message),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsValidTitleSelected(false);
    setSelectedIndex(-1);
    setIsResultsVisible(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (titlesDatas.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev < titlesDatas.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : titlesDatas.length - 1
      );
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < titlesDatas.length) {
        handleSelectSuggestion(selectedIndex);
      }
    } else if (e.key === "Escape") {
      setSelectedIndex(-1);
      setDebouncedInput("");
      setIsResultsVisible(false);
    }
  };

  const handleSelectSuggestion = (index: number) => {
    const selected = titlesDatas[index];
    if (!selected) return;

    setSelectedIndex(-1); // always reset

    if (selected.eventId) {
      setDebouncedInput("");
      setIsValidTitleSelected(true);
      setInputValue(`${selected.title}`);
      setTitlesData(titlesDatas[index]);

      return;
    }

    addNewTitleMutation.mutate(selected as AddTitlesRequest);
  };

  return (
    <div
      className={`search-bar-white w-full z-[100] text-white bg-purple-200/6 rounded-md outline-2 
         outline-offset-[-2px] backdrop-blur-3xl text-[clamp(16px,2vw,24px)] font-medium transition-all
         duration-200 focus:outline-none active:opacity-100 flex flex-col relative ${
           isValidTitleSelected ? "outline-green-400/50" : "outline-white/20"
         }`}
    >
      <div className="search-bar-white flex flex-row  h-max items-center gap-3 justify-between">
        <AnimatePresence mode="wait">
          {isCreateNewTitleDialogBoxVisible && (
            <CreateNewTitleDialogBox
              input={debouncedInput}
              ticketData={ticketData}
              titlesData={titlesData}
              setTitlesData={setTitlesData}
              setTicketData={setTicketData}
              setToggleDialogueBox={SetCreateNewTitleDialogBoxVisible}
            />
          )}
        </AnimatePresence>
        <div
          className="search-input-container flex flex-row gap-2 items-center my-3 mx-4"
          onClick={() => {
            setIsResultsVisible(true);
            setDebouncedInput(inputValue);
          }}
        >
          <img
            src="/icons/search.svg"
            alt="search"
            className="w-6 h-6 origin-left scale-80 md:scale-100 hover:scale-105 transition-all
           duration-200 active:scale-110 active:scale-3d cursor-pointer"
          />

          <input
            type="text"
            onClick={() => {
              setIsResultsVisible(true);
              setDebouncedInput(inputValue);
            }}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search"
            onKeyDown={handleKeyDown}
            className="min-w-full bg-transparent border-none outline-none text-[clamp(16px,2vw,24px)] font-medium"
          />
        </div>
        {/* year picker */}
        <Dropdown2
          options={[
            "All",
            ...Array.from(
              { length: 75 },
              (_, i) => `${parseInt(currentYear) - i}`
            ),
          ]}
          selectedOption={year}
          setSelectedOption={setYear}
        />
      </div>

      {isLoading && isResultsVisible && inputValue.length >= 1 && (
        <div className="p-3 text-white">Searching •••</div>
      )}
      {isFetched &&
        isResultsVisible &&
        inputValue.length &&
        titlesDatas.length === 0 &&
        !isLoading && (
          <div className="p-3 text-white flex flex-col gap-2 items-center justify-center text-[clamp(12px,1vw,16px)] ">
            No results found
            <button
              onClick={() => SetCreateNewTitleDialogBoxVisible(true)}
              className="px-6 py-3  bg-[#9F64DA] 
            text-white text-[clamp(12px,1vw,18px)] font-medium rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              Create new
            </button>
          </div>
        )}

      {Array.isArray(titlesDatas) &&
        isResultsVisible &&
        titlesDatas.length > 0 && (
          <ul
            ref={suggestionsRef}
            className={`w-full absolute mt-16 z-[100] max-h-[300px] overflow-y-scroll rounded-md  bg-[#090e18] `}
          >
            {titlesDatas.map((item, index) => (
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
export { SearchBar, SearchBarWhite };
