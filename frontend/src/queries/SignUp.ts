import axios from "../utils/axios";
import { SignUpRequest, SignUpResponse } from "../types/SignUp";
import { signUpApi } from "../routes/apiRoutes";

export const signUpUser = async (
  formData: SignUpRequest
): Promise<SignUpResponse> => {
  // Pre-request validation
  if (
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    throw new Error("All fields are required");
  }

  if (formData.password !== formData.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  if (!formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
    throw new Error(
      "Password must be at least 8 characters and include upper, lower, and a number"
    );
  }

  try {
    const response = await axios.post<SignUpResponse>(signUpApi, formData);
    return response.data;
  } catch (error: any) {
    // Custom error based on status
    const status = error?.response?.status;
    if (status === 409) {
      throw new Error("User already exists, please login.");
    } else if (status === 400) {
      throw new Error("Invalid request. Check all fields.");
    } else {
      throw new Error("Something went wrong");
    }
  }
};
