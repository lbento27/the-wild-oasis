import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  // Get the booking ID from the URL parameters, thats the name used in the route app.jsx
  const { bookingId } = useParams();

  const {
    isLoading,
    isError,
    data: booking,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  return { isLoading, isError, booking };
}
