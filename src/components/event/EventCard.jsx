import { Calendar, Clock3, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const {
    id,
    title,
    date,
    time,
    location,
    price,
    ticketsLeft,
    image,
  } = event;


  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-64 bg-gray-200 sm:h-72">
        <img
          src={image || "/images/placeholder.jpeg"}
          alt={title}
          className="h-full w-full object-cover"
        />

        <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-1.5 text-lg font-semibold text-black shadow-sm">
          ${price.toFixed(2)}
        </div>
      </div>

      <div className="border-t border-gray-200 px-5 py-6">
        <h3 className="text-2xl font-bold text-black">{title}</h3>

        <div className="mt-5 space-y-3 text-gray-600">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 shrink-0" />
            <span className="text-lg">{date}</span>
          </div>

          <div className="flex items-center gap-3">
            <Clock3 className="h-5 w-5 shrink-0" />
            <span className="text-lg">{time}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 shrink-0" />
            <span className="text-lg">{location}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 px-5 py-5">
        <p className="text-base text-gray-500">{ticketsLeft} tickets left</p>

        <Link
          to={`/events/${id}`}
          className="inline-flex items-center rounded-xl bg-black px-5 py-3 text-base font-medium text-white transition hover:bg-gray-800"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}