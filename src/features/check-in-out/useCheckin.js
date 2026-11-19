import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true }),

    //the data bellow is returned from the mutation function
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      //queryClient.invalidateQueries(["booking", data.id]);
      //instead we can invalidate all queries
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("There was and error while checking in"),
  });

  return { checkin, isCheckingIn };
}
