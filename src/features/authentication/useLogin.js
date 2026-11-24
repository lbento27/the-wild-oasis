import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    //onSuccess we also get the user data returned from the function as a input parameter
    onSuccess: (user) => {
      //console.log(user);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("ERROR", error);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
