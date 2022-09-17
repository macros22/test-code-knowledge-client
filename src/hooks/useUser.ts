import { isGuestName } from "constants/names.storage";
import { useSessionStorage } from "hooks";
import { Role } from "interfaces/user.interface";
import { authApi } from "libs/auth.api";
import useSWR from "swr";

export const useUser = () => {
  // Used isGuest to not make request for guest users.
  const [isGuest, setIsGuest] = useSessionStorage<boolean>(isGuestName, true);

  const { data: user, mutate, error } = useSWR(isGuest ? null : 'user', authApi.getUser);

  const isLoading = !user && !error;
  const isLoggedIn = Boolean(!error && user);
  const isAdmin = user?.role == Role.Admin;


  const mutateUser = ({ isGuest }: { isGuest: boolean }) => {
    setIsGuest(isGuest);
    mutate();
  }

  return {
    isLoading,
    isLoggedIn,
    user,
    isAdmin,
    mutateUser,
  };
}