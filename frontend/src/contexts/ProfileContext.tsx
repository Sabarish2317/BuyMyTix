import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../queries/Profile";
import { ProfileResponse } from "../types/Profile";

interface ProfileContextType {
  userData: ProfileResponse | null;
  isLoading: boolean;
  isError: boolean;
  setUserData: React.Dispatch<React.SetStateAction<ProfileResponse>>;
  refetch: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<ProfileResponse>(
    {} as ProfileResponse
  );

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const { data, isLoading, isError, refetch,  } = useQuery<ProfileResponse>({
    queryKey: ["userProfile", token], // use state here
    queryFn: getProfile,
    enabled: !!token,
    retry: 0,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  return (
    <ProfileContext.Provider
      value={{
        userData: userData ?? null,
        isLoading,
        isError,
        setUserData,
        refetch,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfile must be used within ProfileProvider");
  return context;
};
