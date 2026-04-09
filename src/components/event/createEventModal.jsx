import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import EventService from "../../api/eventService";

const initialForm = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  price: "",
  totalTickets: "",
};

export default function CreateEventModal({
  isOpen,
  onClose,
  onCreated,
}) {
  const [formData, setFormData] = useState(initialForm);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
  };

  const handleClose = () => {
    if (isSaving) return;
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    try {
      setIsSaving(true);

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: formData.date,
        time: formData.time,
        location: formData.location.trim(),
        price: Number(formData.price),
        totalTickets: Number(formData.totalTickets),
        availableTickets: Number(formData.totalTickets),
      };

      const result = await EventService.createEvent(payload);

      if (result.success) {
        toast.success("Event created successfully");
        onCreated(result.data);
        resetForm();
        onClose();
      } else {
        toast.error(result.message || "Failed to create event");
      }
    } catch (err) {
      toast.error("Failed to create event");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-10 overflow-y-auto">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl sm:p-7 my-auto">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-black">Create Event</h2>
            <p className="mt-1 text-gray-600">
              Add a new event to your platform.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSaving}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-gray-300 bg-white px-6 text-md font-medium text-black transition hover:bg-gray-50 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-black px-6 text-md font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}