import { useGoogleLogin } from "@react-oauth/google";

import { oAuthApi } from "../../routes/apiRoutes";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useProfile } from "../../contexts/ProfileContext";
import { HOME_PAGE } from "../../routes/appRoutes";

interface OauthProps {
  name: string;
}
const GoogleAuthButton: React.FC<OauthProps> = ({ name }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { refetch } = useProfile();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const profileRes = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const { email, sub, name, picture } = profileRes.data;

        // Send to your backend for OAuth handling
        const backendResponse = await axios.post(oAuthApi, {
          email,
          googleId: sub,
          name,
          profileImage: {
            data: picture,
            contentType: "image/jpeg",
          },
        });
        if (backendResponse.status === 401)
          alert("Account with this email already exits");
        localStorage.setItem("token", backendResponse.data.token);
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        refetch();
        setTimeout(() => navigate(HOME_PAGE, { replace: true }), 1000);
        navigate("/home");
      } catch (err) {
        console.error("OAuth failed", err);
        alert("Google sign-in failed");
      }
    },
    onError: () => alert("Login Failed"),
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="px-6 py-3 w-full bg-black text-white text-[clamp(14px,1.5vw,18px)] font-medium rounded-md cursor-pointer"
    >
      {`${name} with Google`}
    </button>
  );
};

export default GoogleAuthButton;
