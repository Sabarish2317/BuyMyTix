import { AddTitlesRequest } from "../types/Titles";

export const getImageForType = (Titles: AddTitlesRequest): string => {
  switch (Titles.type) {
    case "Movie":
      return "/images/popcorn.png";
    case "Event":
      return "/images/concert.png";
    case "Sport":
      return "/images/sport.png";
    default:
      return "/images/vidamuyarchi.png";
  }
};
