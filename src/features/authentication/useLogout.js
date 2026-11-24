import { useMutation } from "@tanstack/react-query";
import { logout as apiLogout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      //the logoutApi function remove the user session from supabase and local storage
      //we need to also remove the user data from the react query cache in here we remove all queries
      queryClient.removeQueries();

      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}
