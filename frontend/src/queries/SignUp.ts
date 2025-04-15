import axios from "../utils/axios";
import { SignUpRequest, SignUpResponse } from "../types/SignUp";
import {
  checkIsEmailAvailablApi,
  checkIsEmailAvailablepi,
  signUpApi,
} from "../routes/apiRoutes";

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

export const checkIsEmailAvailable = async (
  email: string
): Promise<boolean> => {
  if (!email) throw new Error("Email is required");
  email = email.trim().toLowerCase();
  try {
    const response = await axios.get(checkIsEmailAvailablApi, {
      params: { email },
    });
    if (response.status === 200) return true;
    return false;
  } catch (err: any) {
    const status = err?.response?.status;
    if (status === 409) throw new Error("Email exists, please login");
    if (status === 400) throw new Error("Email is invalid");
    throw new Error("Something went wrong");
  }
};
