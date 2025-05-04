import { getHomePageRecommendationsApi } from "../routes/apiRoutes";
import { AddTitlesRequest } from "../types/Titles";
import axios from "../utils/axios";

export const getHomePageRecommendations = async (
  type: string,
  category: string,
  page = 1,
  pageSize = 10
): Promise<AddTitlesRequest[]> => {
  const res = await axios.get(getHomePageRecommendationsApi, {
    params: { type, category, page, pageSize },
  });

  const data = res.data;

  return data.map((item: any) => {
    const source = item?.event || item; // For popular: item.event; for trending/latest: item directly

    return {
      eventId: source._id,
      title: source.title,
      poster: source.poster,
      rating: source.rating,
      year: source.year,
      source: source.source,
    };
  });
};
