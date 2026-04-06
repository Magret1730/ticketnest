import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TicketNest
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-blue-600">
            Events
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/my-bookings" className="hover:text-blue-600">
                My Bookings
              </Link>
              <Link to="/my-payments" className="hover:text-blue-600">
                My Payments
              </Link>
            </>
          )}

          {isAdmin && (
            <Link to="/admin/dashboard" className="hover:text-blue-600">
              Admin
            </Link>
          )}

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}