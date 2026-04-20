import api from "./axios";

class AuthService {
  // Register method takes user data, makes an API call to the register endpoint,
  // and stores the token and user info in localStorage if successful
  static async register(userData) {
    try {
      // Make API call to register endpoint with user data
      const response = await api.post("/auth/register", userData);

      // Store token and user info in localStorage if registration is successful
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Some APIs may return user info upon registration, so we can store it as well
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

  // Login method takes user credentials, makes an API call to the login endpoint,
  // and stores the token and user info in localStorage if successful
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

  // Logout simply clears the token and user info from localStorage
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