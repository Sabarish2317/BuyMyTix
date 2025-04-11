interface ProfileRequest {
  AuthToken: string;
}
interface ProfileResponse {
  profileImage: {
    data: string;
    contentType: string;
  };
  _id: string;
  email: string;
  name: string;
  preferredLanguage: string;
  city: string;
  state: string;
  phone: string;
  type: string;
  loginType: string;
  soldTickets: string[];
}

export type { ProfileRequest, ProfileResponse };
