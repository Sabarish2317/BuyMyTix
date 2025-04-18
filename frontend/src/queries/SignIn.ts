import axios from "../utils/axios";
import { signInApi } from "../routes/apiRoutes";
import { SignInRequest, SignInResponse } from "../types/SignIn";

export const signInUser = async (
  formData: SignInRequest
): Promise<SignInResponse> => {
  // Pre-request validation
  if (!formData.email || !formData.password) {
    throw new Error("All fields are required");
  }

  try {
    const response = await axios.post<SignInResponse>(signInApi, formData);
    return response.data;
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 400) {
      throw new Error("Invalid email or password");
    } else if (status === 401) {
      throw new Error("Invalid email or password");
    } else {
      throw new Error("Something went wrong");
    }
  }
};
