import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  //basically get the current user and store it in to "cache"

  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  //also compute the authenticated status if the user exists
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
