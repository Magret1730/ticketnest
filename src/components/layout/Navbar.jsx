import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { User, Ticket, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { isAuthenticated, isAdmin } = useAuth();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `text-base font-medium transition-colors ${
      isActive ? "text-black" : "text-gray-600 hover:text-black"
    }`;

  const closeMobileMenu = () => {
    setOpenMobileMenu(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black flex items-center justify-center">
            <Ticket className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-black">
            TicketNest
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/events" className={navLinkClass}>
            Events
          </NavLink>

          {/* {isAuthenticated && ( */}
            <>
              <NavLink to="/my-bookings" className={navLinkClass}>
                My Bookings
              </NavLink>

              <NavLink to="/my-payments" className={navLinkClass}>
                My Payments
              </NavLink>
            </>
          {/* )} */}

          {/* {isAuthenticated && isAdmin && ( */}
            <NavLink to="/admin/dashboard" className={navLinkClass}>
              Admin
            </NavLink>
          {/* )} */}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {/* {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-base font-medium text-gray-600 hover:text-black transition-colors"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-black font-medium hover:bg-gray-50 transition"
              >
                Create Account
              </Link>
            </>
          ) : ( */}
            <Link
              to="/me"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 text-black font-medium hover:bg-gray-50 transition"
            >
              <User className="w-5 h-5" />
              <span>Account</span>
            </Link>
          {/* )} */}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpenMobileMenu((prev) => !prev)}
          className="md:hidden p-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
          aria-label="Toggle menu"
        >
          {openMobileMenu ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {openMobileMenu && (
        <div className="md:hidden border-t border-gray-900 bg-white px-4 py-4 space-y-4">
          <div className="flex flex-col gap-3 text-center">
            <NavLink to="/" className={navLinkClass} onClick={closeMobileMenu}>
              Home
            </NavLink>

            <NavLink
              to="/events"
              className={navLinkClass}
              onClick={closeMobileMenu}
            >
              Events
            </NavLink>

            {/* {isAuthenticated && ( */}
              {/* <> */}
                <NavLink
                  to="/my-bookings"
                  className={navLinkClass}
                  onClick={closeMobileMenu}
                >
                  My Bookings
                </NavLink>

                <NavLink
                  to="/my-payments"
                  className={navLinkClass}
                  onClick={closeMobileMenu}
                >
                  My Payments
                </NavLink>
              {/* </> */}
            {/* )} */}

            {/* {isAuthenticated && isAdmin && ( */}
              <NavLink
                to="/admin/dashboard"
                className={navLinkClass}
                onClick={closeMobileMenu}
              >
                Admin
              </NavLink>
            {/* )} */}
          </div>

          <div className="pt-2 border-t border-gray-200">
            {/* {!isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="text-base font-medium text-gray-600 hover:text-black transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="w-full text-center px-5 py-2.5 rounded-xl border border-gray-300 text-black font-medium hover:bg-gray-50 transition"
                >
                  Create Account
                </Link>
              </div>
            ) : ( */}
              <Link
                to="/me"
                onClick={closeMobileMenu}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-black font-medium hover:bg-gray-50 transition"
              >
                <User className="w-4 h-4" />
                <span>Account</span>
              </Link>
            {/* )} */}
          </div>
        </div>
      )}
    </header>
  );
}