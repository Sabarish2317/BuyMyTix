import axios from "../utils/axios";
import { signInApi } from "../routes/apiRoutes";
import { SignInRequest, SignInResponse } from "../types/SignIn";
import { toast } from "react-toastify";

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
    if (status === 403) {
      toast.error(
        "Your account has been banned due to a violation of our terms and conditions."
      );
    }
    if (status === 400) {
      throw new Error("Invalid email or password");
    } else if (status === 401) {
      throw new Error("Invalid email or password");
    } else if (status === 404) {
      throw new Error("Account does not exist, try signing up.");
    } else {
      throw new Error("Something went wrong");
    }
  }
};
