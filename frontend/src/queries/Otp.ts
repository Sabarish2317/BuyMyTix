import { forgotPasswordApi, resetPasswordApi } from "../routes/apiRoutes";
import { ChangePasswordRequest } from "../types/otp";
import axios from "../utils/axios";

export const forgotPassword = async (email: string) => {
  // Pre-request validation

  if (!email) {
    throw new Error("Email is required");
  }
  try {
    const response = await axios.post<{ message: string }>(forgotPasswordApi, {
      email: email,
    });
    return response.data;
  } catch (error: any) {
    // Custom error based on status
    const status = error?.response?.status;
    if (status === 404) {
      throw new Error("Invalid request");
    } else if (status !== 200) {
      throw new Error("Something went wrong");
    }
  }
};

export const resetPassword = async (
  changePasswordRequest: ChangePasswordRequest
) => {
  // Pre-request validation
  console.table(changePasswordRequest);

  if (
    !changePasswordRequest.email ||
    !changePasswordRequest.newPassword ||
    !changePasswordRequest.otp
  ) {
    throw new Error("All fields are required");
  }

  if (
    !changePasswordRequest.newPassword.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    )
  ) {
    throw new Error(
      "Password must be at least 8 characters and include upper, lower, and a number"
    );
  }
  try {
    const response = await axios.post(resetPasswordApi, changePasswordRequest);
    return response.data;
  } catch (error: any) {
    // Custom error based on status
    const status = error?.response?.status;
    if (status === 400) {
      throw new Error("otp expired");
    } else if (status === 404) {
      throw new Error("Cannot find user");
    } else if (status !== 200) {
      throw new Error("Something went wrong");
    }
  }
};
