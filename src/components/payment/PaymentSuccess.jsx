import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import BookingService from "../../api/bookingService";

export default function PaymentSuccess() {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await BookingService.getBookingById(bookingId);

        if (result.success) {
          setBooking(result.data);
        } else {
          setError(result.message || "Failed to load payment confirmation details.");
        }
      } catch (err) {
        setError("Failed to load payment confirmation details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <section className="bg-[#f7f7f7] py-10 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">
            <p className="text-gray-600">Loading confirmation...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !booking) {
    return (
      <section className="bg-[#f7f7f7] py-10 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-black">Booking not found</h1>
            <p className="mt-2 text-gray-600">
              {error || "We could not find the payment confirmation details."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const event = booking.event;
  const quantity = booking.quantity;
  const total = Number(booking.totalPrice);

  return (
    <section className="bg-[#f7f7f7] py-12 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <Check className="h-10 w-10 text-green-600" strokeWidth={2.5} />
        </div>

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-black sm:text-5xl">
          Payment Successful!
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
          Your booking for {event?.title} has been confirmed.
        </p>

        <div className="mt-10 rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm sm:px-8">
          <p className="text-lg text-gray-500">Order Details</p>
          <p className="mt-2 text-2xl font-semibold text-black">
            {quantity} {quantity > 1 ? "tickets" : "ticket"} - ${total.toFixed(2)}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Booking No: {booking.bookingNumber}
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <Link
            to="/my-bookings"
            className="flex h-12 w-full items-center justify-center rounded-xl bg-black text-lg font-medium text-white transition hover:bg-gray-800"
          >
            View My Bookings
          </Link>

          <Link
            to="/events"
            className="flex h-12 w-full items-center justify-center rounded-xl border border-gray-300 bg-white text-lg font-medium text-black transition hover:bg-gray-50"
          >
            Browse More Events
          </Link>
        </div>
      </div>
    </section>
  );
}