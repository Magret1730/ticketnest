import { Link, useParams, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";
import events from "../../data/events.json";

export default function PaymentSuccess() {
  const { bookingId } = useParams();
  const [searchParams] = useSearchParams();

  const quantity = Number(searchParams.get("quantity")) || 1;

  const event = events.find((item) => item.id === Number(bookingId));

  if (!event) {
    return (
      <section className="bg-[#f7f7f7] py-10 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-black">Booking not found</h1>
            <p className="mt-2 text-gray-600">
              We could not find the payment confirmation details.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const total = event.price * quantity;

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
          Your booking for {event.title} has been confirmed.
          <br className="hidden sm:block" />
          You will receive a confirmation email shortly.
        </p>

        <div className="mt-10 rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm sm:px-8">
          <p className="text-lg text-gray-500">Order Details</p>
          <p className="mt-2 text-2xl font-semibold text-black">
            {quantity} {quantity > 1 ? "tickets" : "ticket"} - $
            {total.toFixed(2)}
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