import { Link, useNavigate, useSearchParams, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock3, MapPin, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import BookingService from "../../api/bookingService";
import EventService from "../../api/eventService";
import { useAuth } from "../../context/AuthContext";

export default function BookingPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const quantity = Number(searchParams.get("quantity")) || 1;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await EventService.getEventById(eventId);

        if (result.success) {
          setEvent(result.data);
        } else {
          setError(result.message || "Failed to load event");
        }
      } catch (err) {
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleProceedToPayment = async () => {
    try {
      const result = await BookingService.createBooking({
        eventId: eventId,
        userId: user.id,
        quantity,
      });

      if (result.success) {
        const bookingId = result.data.id;
        navigate(`/payment/${bookingId}`);
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  const handleModifyBooking = () => {
    navigate(`/events/${event.id}`);
  };

  if (loading) {
    return (
      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-lg text-gray-600">Loading event...</p>
        </div>
      </section>
    );
  }

  if (error || !event) {
    return (
      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            to="/events"
            className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Events
          </Link>

          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-black">Booking not found</h1>
            <p className="mt-2 text-gray-600">
              {error || "We could not find the selected event."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const total = Number(event.price) * quantity;

  return (
    <section className="py-8 md:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link
          to={`/events/${event.id}`}
          className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Event
        </Link>

        <h1 className="mb-8 text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Confirm Your Booking
        </h1>

        <div className="space-y-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Ticket className="h-6 w-6 text-black" />
              <h2 className="text-xl font-bold text-black">Event Details</h2>
            </div>

            <h3 className="text-2xl font-bold text-black">{event.title}</h3>

            <div className="mt-4 space-y-2 text-gray-600">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 shrink-0" />
                <span className="text-lg">{event.date}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock3 className="h-4 w-4 shrink-0" />
                <span className="text-lg">{event.time}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="text-lg">{event.location}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-black">Order Summary</h2>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-lg text-gray-600">Price per ticket</span>
                <span className="text-lg text-black">
                  ${Number(event.price).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-lg text-gray-600">Quantity</span>
                <span className="text-lg text-black">
                  {quantity} {quantity > 1 ? "tickets" : "ticket"}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-2xl font-semibold text-black">Total</span>
                  <span className="text-3xl font-bold text-black">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={handleProceedToPayment}
                className="h-12 w-full rounded-xl bg-black text-lg font-medium text-white transition hover:bg-gray-800"
              >
                Proceed to Payment
              </button>

              <button
                type="button"
                onClick={handleModifyBooking}
                className="h-12 w-full rounded-xl border border-gray-300 bg-white text-lg font-medium text-black transition hover:bg-gray-50"
              >
                Modify Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}