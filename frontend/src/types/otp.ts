interface changePasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}
export type ChangePasswordRequest = changePasswordRequest;
