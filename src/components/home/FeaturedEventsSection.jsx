import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import EventCard from "../event/EventCard";
import EventService from "../../api/eventService";
import { useEffect, useState } from "react";

export default function FeaturedEventsSection() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async() => {
      try {
        setLoading(true);

        const result = await EventService.getAllEvents();

        if (result.success) {
          setEvents(result.data);
        } else {
          console.error("Failed to fetch events:", result.message);
          setEvents([]);
        }

      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const featuredEvents = events.slice(0, 6);

  return (
    <section className="bg-[#f7f7f7] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-black md:text-5xl">
              Featured Events
            </h2>
            <p className="mt-3 text-lg text-gray-600 md:text-xl">
              Don&apos;t miss out on these popular events
            </p>
          </div>

          <Link
            to="/events"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-lg font-medium text-black transition hover:bg-gray-50"
          >
            View All
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}