import { authApi } from "libs/auth.api";
import useSWR from "swr";

export const useUser = () => {
  const { data: user, mutate, error } = useSWR('user', authApi.getUser);

  const isLoading = !user && !error;
  const isLoggedIn = Boolean(!error && user);

  return {
    isLoading,
    isLoggedIn,
    user,
    mutate,
  };
}