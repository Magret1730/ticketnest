import api from "./axios";

class EventService {
  // createEvent method takes event data, makes an API call to create a new event,
  // and returns the created event data or an error message
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

  // getAllEvents method makes an API call to retrieve all events and returns the data or an error message
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

  // getEventById method takes an event ID, makes an API call to retrieve the event details,
  // and returns the data or an error message
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

  // updateEvent method takes an event ID and updated event data, makes an API call to update the event,
  // and returns the updated event data or an error message
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

  // deleteEvent method takes an event ID, makes an API call to delete the event,
  // and returns a success message or an error message
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