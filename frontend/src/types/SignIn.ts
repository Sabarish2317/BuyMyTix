interface SignInRequest {
  email: string;
  password: string;
}
interface SignInResponse {
  message: string;
  token: string;
}

export type { SignInRequest, SignInResponse };
