import axios from "../utils/axios";
import { City } from "../types/City";
import { searchCityAPi } from "../routes/apiRoutes";

export const fetchCities = async (search: string): Promise<City[]> => {
  const res = await axios.get(searchCityAPi, {
    params: { search },
  });
  return res.data;
};
