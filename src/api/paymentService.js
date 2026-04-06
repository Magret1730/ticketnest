import api from "./axios";

class PaymentService {
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

  static async getPaymentById(id) {
    try {
      const response = await api.get(`/payments/${id}`);

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