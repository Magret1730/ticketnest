import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import EventService from "../../api/eventService";
import DeleteEventModal from "../../components/event/DeleteEventModal";
import EditEventModal from "../../components/event/EditEventModal";
import CreateEventModal from "../../components/event/createEventModal";

export default function ManageEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEditEvent, setSelectedEditEvent] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
  
      const result = await EventService.getAllEvents();
  
      if (result.success) {
        setEvents(result.data || []);
      } else {
        toast.error(result.message || "Failed to load events");
      }
    } catch (err) {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleEventCreated = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleEditEvent = (event) => {
    setSelectedEditEvent(event);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedEditEvent(null);
  };

  const handleEventUpdated = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setDeleteModalOpen(true);
  };
  
  const closeDeleteModal = () => {
    if (deletingId) return;
    setDeleteModalOpen(false);
    setSelectedEvent(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEvent) return;
  
    try {
      setDeletingId(selectedEvent.id);
  
      const result = await EventService.deleteEvent(selectedEvent.id);
  
      if (result.success) {
        toast.success(`${selectedEvent.title} deleted successfully`);
        setEvents((prev) =>
          prev.filter((event) => event.id !== selectedEvent.id)
        );
        closeDeleteModal();
      } else {
        toast.error(result.message || "Failed to delete event");
      }
    } catch (err) {
      toast.error("Failed to delete event");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return dateValue;

    return date.toLocaleDateString();
  };

  const formatTime = (timeValue) => {
    if (!timeValue) return "N/A";

    if (typeof timeValue === "string" && timeValue.includes(":")) {
      const [hours, minutes] = timeValue.split(":");
      const date = new Date();
      date.setHours(Number(hours), Number(minutes));
      return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
    }

    return timeValue;
  };

  const formatPrice = (price) => {
    return Number(price || 0).toFixed(2);
  };

  return (
    <section className="py-10 md:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link
          to="/admin/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-gray-600 transition hover:text-black"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </Link>

        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Manage Events
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Create, edit, and delete events
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreateEvent}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-black px-6 text-lg font-medium text-white transition hover:bg-gray-800"
          >
            <Plus className="h-5 w-5" />
            Create Event
          </button>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="mb-6 text-2xl font-bold text-black">All Events</h2>

          {loading ? (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-10 text-center">
              <p className="text-lg text-gray-600">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-10 text-center">
              <h3 className="text-xl font-bold text-black">No events yet</h3>
              <p className="mt-2 text-gray-600">
                Create your first event to get started.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden overflow-hidden rounded-2xl border border-gray-200 md:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="border-b border-gray-200 bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-md font-semibold text-black">
                          Title
                        </th>
                        <th className="px-4 py-2 text-left text-md font-semibold text-black">
                          Date
                        </th>
                        <th className="px-4 py-2 text-left text-md font-semibold text-black">
                          Time
                        </th>
                        <th className="px-4 py-2 text-left text-md font-semibold text-black">
                          Price
                        </th>
                        <th className="px-4 py-2 text-left text-md font-semibold text-black">
                          Available
                        </th>
                        <th className="px-4 py-2 text-left text-md font-semibold text-black">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {events.map((event) => (
                        <tr
                          key={event.id}
                          className="border-b border-gray-200 last:border-b-0"
                        >
                          <td className="px-4 py-2 text-md font-medium text-black">
                            {event.title}
                          </td>
                          <td className="px-4 py-2 text-md text-black">
                            {formatDate(event.date)}
                          </td>
                          <td className="px-4 py-2 text-md text-black">
                            {formatTime(event.time)}
                          </td>
                          <td className="px-4 py-2 text-md text-black">
                            ${formatPrice(event.price)}
                          </td>
                          <td className="px-4 py-2 text-md text-black">
                            {event.availableTickets} / {event.totalTickets}
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => handleEditEvent(event)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-gray-300 bg-white text-black transition hover:bg-gray-50"
                                title="Edit event"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => openDeleteModal(event)}
                                disabled={deletingId === event.id}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-gray-300 bg-white text-red-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                                title="Delete event"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4 md:hidden">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          {event.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                          {formatDate(event.date)} • {formatTime(event.time)}
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                          ${formatPrice(event.price)}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          {event.availableTickets} / {event.totalTickets} available
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditEvent(event)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white text-black transition hover:bg-gray-50"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => openDeleteModal(event)}
                          disabled={deletingId === event.id}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white text-red-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ********************* Modal ************************** */}
      <DeleteEventModal
        isOpen={deleteModalOpen}
        eventTitle={selectedEvent?.title}
        isDeleting={deletingId === selectedEvent?.id}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <EditEventModal
        isOpen={editModalOpen}
        event={selectedEditEvent}
        onClose={closeEditModal}
        onUpdated={handleEventUpdated}
      />

      <CreateEventModal
        isOpen={createModalOpen}
        onClose={closeCreateModal}
        onCreated={handleEventCreated}
      />
    </section>
  );
}