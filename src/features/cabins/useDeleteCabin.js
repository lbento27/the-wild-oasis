import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    //mutationFn: (id) => deleteCabin(id), same thing as below
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //alert("Cabin deleted successfully");
      toast.success("Cabin deleted successfully");
    },
    onError: (err) => {
      //alert(err.message);
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteCabin };
}
