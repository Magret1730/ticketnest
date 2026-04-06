import api from "./axios";

class EventService {
  static async createEvent(eventData) {
    try {
      const response = await api.post("/events", eventData);

      return {
        success: true,
        data: response.data,
        message: "Event created successfully",
      };
    } catch (err) {
      console.error("Create Event Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message || "Create Event: Internal server error",
      };
    }
  }

  static async getAllEvents() {
    try {
      const response = await api.get("/events");

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      console.error("Get All Events Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message || "Get All Events: Internal server error",
      };
    }
  }

  static async getEventById(id) {
    try {
      const response = await api.get(`/events/${id}`);

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      console.error("Get Event Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message || "Get Event: Internal server error",
      };
    }
  }

  static async updateEvent(id, eventData) {
    try {
      const response = await api.put(`/events/${id}`, eventData);

      return {
        success: true,
        data: response.data,
        message: "Event updated successfully",
      };
    } catch (err) {
      console.error("Update Event Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message || "Update Event: Internal server error",
      };
    }
  }

  static async deleteEvent(id) {
    try {
      const response = await api.delete(`/events/${id}`);

      return {
        success: true,
        data: response.data,
        message: "Event deleted successfully",
      };
    } catch (err) {
      console.error("Delete Event Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message || "Delete Event: Internal server error",
      };
    }
  }
}

export default EventService;