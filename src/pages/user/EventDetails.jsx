import { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ArrowLeft,
  Calendar,
  Clock3,
  MapPin,
  Ticket,
  Users,
  Minus,
  Plus,
} from "lucide-react";
import events from "../../data/events.json";

export default function EventDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const event = useMemo(() => {
    return events.find((item) => item.id === Number(id));
  }, [id]);

  if (!event) {
    return (
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            to="/events"
            className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Events
          </Link>

          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center">
            <h1 className="text-2xl font-bold text-black">Event not found</h1>
            <p className="mt-2 text-gray-600">
              The event you are looking for does not exist.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const total = event.price * quantity;

  const increaseQuantity = () => {
    if (quantity < event.ticketsLeft) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <section className="py-4 md:py-2">
      <div className="mx-auto max-w-7xl px-6">
        <Link
          to="/events"
          className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Events
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-2xl bg-gray-200">
              <img
                src={event.image || "/images/event-placeholder.jpg"}
                alt={event.title}
                className="h-[280px] w-full object-cover sm:h-[420px] lg:h-[460px]"
                onError={(e) => {
                  e.currentTarget.src = "/images/event-placeholder.jpg";
                }}
              />
            </div>

            <div className="mt-8">
              <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
                {event.title}
              </h1>

              <div className="mt-6 grid grid-cols-1 gap-4 text-gray-600 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 shrink-0" />
                    <span className="text-lg">{event.date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 shrink-0" />
                    <span className="text-lg">{event.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-5 w-5 shrink-0" />
                    <span className="text-lg">{event.time}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 shrink-0" />
                    <span className="text-lg">
                      {event.ticketsLeft} tickets available
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-black">
                  About this event
                </h2>
                <p className="mt-4 max-w-4xl text-lg leading-9 text-gray-600">
                  {event.description}
                </p>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-8 flex items-center gap-3">
                <Ticket className="h-6 w-6 text-black" />
                <h2 className="text-lg font-bold text-black">Book Tickets</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base text-gray-600">Price per ticket</span>
                  <span className="text-base font-bold text-black">
                    ${event.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-base text-gray-600">Quantity</span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-300 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={quantity === 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="min-w-4 text-center text-base font-medium text-black">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-300 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={quantity === event.ticketsLeft}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-lg font-semibold text-black">
                      Total
                    </span>
                    <span className="text-xl font-bold text-black">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="h-12 w-full rounded-xl bg-black text-lg font-medium text-white transition hover:bg-gray-800"
                  onClick={() =>
                    isAuthenticated
                      ? navigate(`/payment/${bookingId}?quantity=${quantity}`)
                      : navigate("/login")
                  }
                >
                  Book Tickets
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}