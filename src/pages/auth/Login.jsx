import { Link } from "react-router-dom";
import { Eye, Ticket } from "lucide-react";

export default function Login() {
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
              Welcome back
            </h1>

            <p className="text-lg text-gray-500 sm:text-lg">
              Sign in to your account to continue
            </p>
          </div>

          <form className="mt-8 space-y-4">
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
                  placeholder="Enter your password"
                  className="h-10 w-full rounded-sm border border-gray-300 px-4 pr-12 text-lg text-black outline-none transition placeholder:text-gray-400 focus:border-black"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="h-10 w-full rounded-sm bg-black text-lg font-medium text-white transition hover:bg-gray-800"
            >
              Log In
            </button>
          </form>

          <p className="mt-4 text-center text-md text-gray-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-black">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}