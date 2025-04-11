import axios from "../utils/axios"; // your axios instance
import { City } from "../types/City";

export const fetchCities = async (search: string): Promise<City[]> => {
  const res = await axios.get("/api/city", {
    params: { search },
  });
  return res.data;
};
