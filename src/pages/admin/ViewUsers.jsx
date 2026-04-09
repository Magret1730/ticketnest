import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import UserService from "../../api/userService";

export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const result = await UserService.getAllUsers();

      if (result.success) {
        setUsers(result.data || []);
      } else {
        toast.error(result.message || "Failed to load users");
      }
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const getUserId = (user) => {
    return user.userNumber || `U${String(user.id).padStart(3, "0")}`;
  };

  const getFullName = (user) => {
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim();

    return fullName || "Unknown User";
  };

  const getRole = (user) => {
    return user.role?.toLowerCase() || "user";
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return dateValue;

    return date.toLocaleDateString();
  };

  const roleClass = (role) => {
    if (role === "admin") {
      return "bg-black text-white";
    }

    return "bg-gray-100 text-black";
  };

  return (
    <section className="min-h-screen bg-[#f7f7f7] py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link
          to="/admin/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-gray-600 transition hover:text-black"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            All Users
          </h1>
          <p className="mt-2 text-lg text-gray-600">View registered users</p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="mb-6 text-2xl font-bold text-black">
            Users ({users.length})
          </h2>

          {loading ? (
            <ClipLoader fullScreen={false} />
          ) : users.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-10 text-center">
              <h3 className="text-xl font-bold text-black">No users found</h3>
              <p className="mt-2 text-gray-600">
                Registered users will appear here.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-2xl border border-gray-200 md:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="border-b border-gray-200 bg-gray-50">
                      <tr>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          User ID
                        </th>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Name
                        </th>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Email
                        </th>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Role
                        </th>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Joined
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((user) => {
                        const role = getRole(user);

                        return (
                          <tr
                            key={user.id}
                            className="border-b border-gray-200 last:border-b-0"
                          >
                            <td className="px-4 py-4 text-lg text-black">
                              {getUserId(user)}
                            </td>
                            <td className="px-4 py-4 text-lg font-medium text-black">
                              {getFullName(user)}
                            </td>
                            <td className="px-4 py-4 text-lg text-gray-600">
                              {user.email}
                            </td>
                            <td className="px-4 py-4">
                              <span
                                className={`inline-flex rounded-lg px-3 py-1 text-sm font-medium capitalize ${roleClass(
                                  role
                                )}`}
                              >
                                {role}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-lg text-gray-600">
                              {formatDate(
                                user.createdAt || user.joinedAt || user.joined
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile cards */}
              <div className="space-y-4 md:hidden">
                {users.map((user) => {
                  const role = getRole(user);

                  return (
                    <div
                      key={user.id}
                      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm text-gray-500">User ID</p>
                          <p className="text-base font-semibold text-black">
                            {getUserId(user)}
                          </p>
                        </div>

                        <span
                          className={`inline-flex rounded-lg px-3 py-1 text-sm font-medium capitalize ${roleClass(
                            role
                          )}`}
                        >
                          {role}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="text-base font-medium text-black">
                            {getFullName(user)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="break-all text-base text-gray-700">
                            {user.email}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Joined</p>
                          <p className="text-base text-gray-700">
                            {formatDate(
                              user.createdAt || user.joinedAt || user.joined
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}