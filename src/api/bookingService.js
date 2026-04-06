import api from "./axios";

class BookingService {
  static async createBooking({ userId, eventId, quantity }) {
    try {
      const response = await api.post(
        `/bookings?userId=${userId}&event=${eventId}&quantity=${quantity}`
      );

      return {
        success: true,
        data: response.data,
        message: "Booking created successfully",
      };
    } catch (err) {
      console.error("Create Booking Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Create Booking: Internal server error",
      };
    }
  }

  static async getAllBookings() {
    try {
      const response = await api.get("/bookings");

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      console.error("Get All Bookings Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Get All Bookings: Internal server error",
      };
    }
  }

  static async getBookingById(id) {
    try {
      const response = await api.get(`/bookings/${id}`);

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      console.error("Get Booking Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message || "Get Booking: Internal server error",
      };
    }
  }

  static async getBookingsByUserId(userId) {
    try {
      const response = await api.get(`/bookings/user/${userId}`);

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      console.error("Get User Bookings Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Get User Bookings: Internal server error",
      };
    }
  }

  static async deleteBooking(id) {
    try {
      const response = await api.delete(`/bookings/${id}`);

      return {
        success: true,
        data: response.data,
        message: "Booking deleted successfully",
      };
    } catch (err) {
      console.error("Delete Booking Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Delete Booking: Internal server error",
      };
    }
  }
}

export default BookingService;