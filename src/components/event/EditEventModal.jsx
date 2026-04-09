import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import EventService from "../../api/eventService";

export default function EditEventModal({
  isOpen,
  event,
  onClose,
  onUpdated,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
    totalTickets: "",
    availableTickets: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        date: event.date || "",
        time: formatTimeForInput(event.time || ""),
        location: event.location || "",
        price: event.price ?? "",
        totalTickets: event.totalTickets ?? "",
        availableTickets: event.availableTickets ?? "",
      });
    }
  }, [event]);

  const formatTimeForInput = (time) => {
    if (!time) return "";
    if (time.includes(":")) {
      const parts = time.split(":");
      return `${parts[0]}:${parts[1]}`;
    }
    return time;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!event) return;

    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.time ||
      !formData.location ||
      !formData.price ||
      !formData.totalTickets
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (Number(formData.price) <= 0) {
      toast.error("Price must be greater than 0.");
      return;
    }

    if (Number(formData.totalTickets) <= 0) {
      toast.error("Total tickets must be greater than 0.");
      return;
    }

    if (Number(formData.availableTickets) < 0) {
      toast.error("Available tickets cannot be negative.");
      return;
    }

    if (Number(formData.availableTickets) > Number(formData.totalTickets)) {
      toast.error("Available tickets cannot be greater than total tickets.");
      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        ...event,
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: formData.date,
        time: formData.time,
        location: formData.location.trim(),
        price: Number(formData.price),
        totalTickets: Number(formData.totalTickets),
        availableTickets: Number(formData.availableTickets),
      };

      const result = await EventService.updateEvent(event.id, payload);

      if (result.success) {
        toast.success("Event updated successfully");
        onUpdated(result.data);
        onClose();
      } else {
        toast.error(result.message || "Failed to update event");
      }
    } catch (err) {
      toast.error("Failed to update event");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-10 overflow-y-auto">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-xl sm:p-7 my-auto max-h-[90vh] flex flex-col">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-black">Edit Event</h2>
            <p className="mt-2 text-gray-600">Update the event details.</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white text-black transition hover:bg-gray-50 disabled:opacity-60"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-2 block text-md font-medium text-black">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="h-10 w-full rounded-xl border border-gray-300 px-4 text-black outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-md font-medium text-black">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none transition focus:border-black"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-md font-medium text-black">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-gray-300 px-4 text-black outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-md font-medium text-black">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-gray-300 px-4 text-black outline-none transition focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-md font-medium text-black">
              Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="h-10 w-full rounded-xl border border-gray-300 px-4 text-black outline-none transition focus:border-black"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-md font-medium text-black">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-gray-300 px-4 text-black outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-md font-medium text-black">
                Total Tickets
              </label>
              <input
                type="number"
                name="totalTickets"
                value={formData.totalTickets}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-gray-300 px-4 text-black outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-md font-medium text-black">
                Available Tickets
              </label>
              <input
                type="number"
                name="availableTickets"
                value={formData.availableTickets}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-gray-300 px-4 text-black outline-none transition focus:border-black"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-black px-6 text-md font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}