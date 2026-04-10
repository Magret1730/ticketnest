import api from "./axios";

class BookingService {
  // createBooking method takes userId, eventId, and quantity, makes an API call to create a booking,
  static async createBooking({ userId, eventId, quantity }) {
    try {
      const response = await api.post(
        `/bookings?userId=${userId}&eventId=${eventId}&quantity=${quantity}`
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

  // getAllBookings method makes an API call to retrieve all bookings and returns the data or an error message
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

  // getBookingById method takes a booking ID, makes an API call to retrieve the booking details,
  // and returns the data or an error message
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

  // getBookingsByUserId method takes a user ID, makes an API call to retrieve all bookings for that user,
  // and returns the data or an error message
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

  // deleteBooking method takes a booking ID, makes an API call to delete the booking,
  // and returns a success message or an error message
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