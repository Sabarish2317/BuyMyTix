import { profileApi } from "../routes/apiRoutes";
import { ProfileResponse } from "../types/Profile";
import axios from "../utils/axios";

export const getProfile = async (): Promise<ProfileResponse> => {
  const token = localStorage.getItem("token");
  const profileDetails = await axios<ProfileResponse>({
    url: profileApi,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(profileDetails.data);
  return profileDetails.data;
};

//the profile response is same as the request to upload the request so used it here
export const updateProfile = async (form: ProfileResponse) => {
  const token = localStorage.getItem("token");
  const profileDetails = await axios<ProfileResponse>({
    url: profileApi,
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    data: form,
  });
  return profileDetails.data;
};
