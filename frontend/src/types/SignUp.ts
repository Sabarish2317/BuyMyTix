interface SignUpRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  profileImage: {
    data: string; // base64 string
    contentType: string; // e.g. "image/png"
  };
}
interface SignUpResponse {
  message: string;
  token: string;
}

export type { SignUpRequest, SignUpResponse };
