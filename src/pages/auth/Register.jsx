import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Ticket } from "lucide-react";
import AuthService from "../../api/authService";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await AuthService.register(formData);

    if (result.success) {
      navigate("/login");
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <section className="min-h-2 bg-[#f7f7f7] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black">
                <Ticket className="h-4 w-4 text-white" />
              </div>
              <span className="text-2xl font-bold text-black">TicketNest</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
              Create an account
            </h1>

            <p className=" text-lg text-gray-500 sm:text-lg">
              Join TicketNest and start booking amazing events
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-3 block text-sm font-semibold text-black"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="h-10 w-full rounded-sm border border-gray-300 px-4 text-lg text-black outline-none transition placeholder:text-gray-400 focus:border-black"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-3 block text-sm font-semibold text-black"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="h-10 w-full rounded-sm border border-gray-300 px-4 text-lg text-black outline-none transition placeholder:text-gray-400 focus:border-black"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-3 block text-sm font-semibold text-black"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-10 w-full rounded-sm border border-gray-300 px-4 text-lg text-black outline-none transition placeholder:text-gray-400 focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-3 block text-sm font-semibold text-black"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="h-10 w-full rounded-xl border border-gray-300 px-4 pr-12 text-lg text-black outline-none transition placeholder:text-gray-400 focus:border-black"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-10 w-full rounded-xl bg-black text-lg font-medium text-white transition hover:bg-gray-800 disabled:bg-gray-400"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="mt-4 text-center text-md text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-black">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}