import api from "./axios";

class AuthService {
  static async register(userData) {
    try {
      const response = await api.post("/auth/register", userData);

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return {
        success: true,
        data: response.data,
        message: "Registration successful",
      };
    } catch (err) {
      console.error("Register Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Register: Internal server error",
      };
    }
  }

  static async login(credentials) {
    try {
      const response = await api.post("/auth/login", credentials);

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return {
        success: true,
        data: response.data,
        message: "Login successful",
      };
    } catch (err) {
      console.error("Login Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Login: Invalid credentials or server error",
      };
    }
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return {
      success: true,
      message: "Logout successful",
    };
  }

  static getCurrentUser() {
    try {
      const user = localStorage.getItem("user");

      return user ? JSON.parse(user) : null;
    } catch (err) {
      console.error("Get Current User Error:", err);
      return null;
    }
  }

  static getToken() {
    return localStorage.getItem("token");
  }

  static isAuthenticated() {
    return !!localStorage.getItem("token");
  }
}

export default AuthService;