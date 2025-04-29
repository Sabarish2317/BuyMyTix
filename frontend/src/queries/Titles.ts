import axios from "../utils/axios";
import {
  AddTitlesRequest,
  AddTitlesResponse,
  DbSearchTitleResponse,
  SearchTitleRequest,
} from "../types/Titles";
import { searchTitleAPi } from "../routes/apiRoutes";
import { toast } from "react-toastify";

export const fetchTitles = async (
  SearchTitleRequest: SearchTitleRequest
): Promise<DbSearchTitleResponse[]> => {
  const res = await axios.get(searchTitleAPi, {
    params: {
      q: SearchTitleRequest.q,
      y: SearchTitleRequest.y,
      source: SearchTitleRequest.source,
      type: SearchTitleRequest.type,
    },
  });

  return res.data.results;
};

export const addTitles = async (
  addTitlesRequest: AddTitlesRequest
): Promise<AddTitlesResponse> => {
  // same api route as fetch titles
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Please login first");
  }
  try {
    const res = await axios.post(searchTitleAPi, addTitlesRequest, {
      headers: { Authorization: `{bearer ${token}}` },
    });
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 401) throw new Error("Please login first");
    if (err.response?.status === 400)
      throw new Error("All fields are required");
    if (err.response?.status === 409)
      throw new Error("Title already exists please choose it");
    throw new Error("Something went wrong");
  }
};

type SearchWithFilterResponse = {
  Movie: DbSearchTitleResponse[];
  Sport: DbSearchTitleResponse[];
  Event: DbSearchTitleResponse[];
};

export const searchWithFilter = async (
  q: string,
  y: string,
  ticketType: string,
  language: string
): Promise<SearchWithFilterResponse> => {
  if (!q || q.trim() === "") {
    toast.error("Search query is required");
    throw new Error("Search query is required");
  }

  try {
    const res = await axios.get<SearchWithFilterResponse>("/api/search", {
      params: {
        q,
        y,
        ticketType,
        language,
      },
    });
    return res.data;
  } catch (err: any) {
    toast.error("Error searching title");
    throw new Error("Error searching title");
  }
};
