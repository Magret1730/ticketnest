import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import EventCard from "../../components/event/EventCard";
import events from "../../data/events.json";

export default function EventsList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    if (!query) return events;

    return events.filter((event) => {
      return (
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    });
  }, [searchTerm]);

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black sm:text-4xl">
            All Events
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Discover and book tickets to amazing events near you
          </p>
        </div>

        <div className="mb-10 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search events by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 text-base text-black outline-none transition placeholder:text-gray-400 focus:border-black"
            />
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center">
            <h2 className="text-xl font-semibold text-black">
              No events found
            </h2>
            <p className="mt-2 text-gray-600">
              Try searching with a different event name or location.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}