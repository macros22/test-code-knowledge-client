import { authApi } from "libs/auth.api";
import useSWR from "swr";

export const useUser = () => {
  const { data: user, mutate, error } = useSWR('user', authApi.getUser);

  const loading = !user && !error;
  const loggedIn = Boolean(!error && user);

  return {
    loading,
    loggedIn,
    user,
    mutate,
  };
}