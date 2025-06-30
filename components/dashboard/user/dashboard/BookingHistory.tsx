import { useGetBookingsByUserIdQuery } from "@/redux/api/bookingApi";
import Loader from "@/components/shared/Loader";

const BookingHistory = ({ userId }: { userId: string }) => {
  const { data, isLoading, error } = useGetBookingsByUserIdQuery({
    userId,
    page: 1,
    limit: 5,
  });

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Failed to load bookings</div>;

  const bookings = data?.data || [];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Booking History</h2>
      {bookings.length ? (
        <ul className="space-y-3">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="border p-4 rounded-md shadow-sm hover:shadow transition"
            >
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
              <p>
                <strong>Total:</strong> ${booking.total}
              </p>
              <p>
                <strong>Meals:</strong>{" "}
                {booking.mealIds.map((m) => m.title).join(", ")}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found for this user.</p>
      )}
    </div>
  );
};

export default BookingHistory;
