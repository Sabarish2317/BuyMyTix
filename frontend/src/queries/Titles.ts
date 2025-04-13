import axios from "../utils/axios";
import { SearchTitleResponse, SearchTitleRequest } from "../types/Titles";
import { searchTitleAPi } from "../routes/apiRoutes";

export const fetchTitles = async (
  SearchTitleRequest: SearchTitleRequest
): Promise<SearchTitleResponse[]> => {
  const res = await axios.get(searchTitleAPi, {
    params: { q: SearchTitleRequest.q, y: SearchTitleRequest.y },
  });

  return res.data.results;
};
