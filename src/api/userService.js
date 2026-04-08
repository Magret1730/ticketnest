import api from "./axios";

class UserService {
  // static async createUser(userData) {
  //   try {
  //     const response = await api.post("/users", userData);

  //     return {
  //       success: true,
  //       data: response.data,
  //       message: "User created successfully",
  //     };
  //   } catch (err) {
  //     console.error("Create User Error:", err);

  //     return {
  //       success: false,
  //       message:
  //         err.response?.data?.message || "Create User: Internal server error",
  //     };
  //   }
  // }

  static async getUserById(id) {
    try {
      const response = await api.get(`/users/${id}`);

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      console.error("Get User Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message || "Get User: Internal server error",
      };
    }
  }

  static async getAllUsers() {
    try {
      const response = await api.get("/users");

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      console.error("Get All Users Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message || "Get All Users: Internal server error",
      };
    }
  }

  static async updateUser(id, userData) {
    try {
      const response = await api.put(`/users/${id}`, userData);

      return {
        success: true,
        data: response.data,
        message: "User updated successfully",
      };
    } catch (err) {
      console.error("Update User Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message || "Update User: Internal server error",
      };
    }
  }

  static async deleteUser(id) {
    try {
      const response = await api.delete(`/users/${id}`);

      return {
        success: true,
        data: response.data,
        message: "User deleted successfully",
      };
    } catch (err) {
      console.error("Delete User Error:", err);

      return {
        success: false,
        message:
          err.response?.data?.message || "Delete User: Internal server error",
      };
    }
  }
}

export default UserService;