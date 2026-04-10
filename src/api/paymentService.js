import api from "./axios";

class PaymentService {
  // createPayment method takes bookingId and amountPaid, makes an API call to create a new payment
  static async createPayment({ bookingId, amountPaid }) {
    try {
      const response = await api.post(
        `/payments?bookingId=${bookingId}&amountPaid=${amountPaid}`
      );

      return {
        success: true,
        data: response.data,
        message: "Payment created successfully",
      };
    } catch (err) {
      console.error("Create Payment Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Create Payment: Internal server error",
      };
    }
  }

  // getAllPayments method makes an API call to retrieve all payments and returns the data or an error message
  static async getAllPayments() {
    try {
      const response = await api.get("/payments");

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      console.error("Get All Payments Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Get All Payments: Internal server error",
      };
    }
  }

  // getPaymentById method takes a payment ID, makes an API call to retrieve the payment details,
  // and returns the data or an error message. It also logs the response for debugging purposes.
  static async getPaymentById(id) {
    try {
      const response = await api.get(`/payments/${id}/customerName`);
      console.log("Response: ", response);

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      console.error("Get Payment Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message || "Get Payment: Internal server error",
      };
    }
  }

  // getPaymentsByUserId method takes a user ID, makes an API call to retrieve all payments made by that user,
  // and returns the data or an error message
  static async getPaymentsByUserId(userId) {
    try {
      const response = await api.get(`/payments/user/${userId}`);

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      console.error("Get User Payments Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Get User Payments: Internal server error",
      };
    }
  }

  // deletePayment method takes a payment ID, makes an API call to delete the payment,
  // and returns a success message or an error message
  static async deletePayment(id) {
    try {
      const response = await api.delete(`/payments/${id}`);

      return {
        success: true,
        data: response.data,
        message: "Payment deleted successfully",
      };
    } catch (err) {
      console.error("Delete Payment Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Delete Payment: Internal server error",
      };
    }
  }
}

export default PaymentService;