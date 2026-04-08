import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  CreditCard,
  DollarSign,
  Ticket,
  ArrowRight,
} from "lucide-react";
import BookingService from "../../api/bookingService";
import PaymentService from "../../api/paymentService";
import { useAuth } from "../../context/AuthContext";

export default function UserDashboard() {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) {
        setError("User not found.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [bookingsResult, paymentsResult] = await Promise.all([
          BookingService.getBookingsByUserId(user.id),
          PaymentService.getPaymentsByUserId(user.id),
        ]);

        if (bookingsResult.success) {
          setBookings(bookingsResult.data || []);
        } else {
          setError(bookingsResult.message || "Failed to load bookings.");
        }

        if (paymentsResult.success) {
          setPayments(paymentsResult.data || []);
        } else if (!bookingsResult.success) {
          setError(paymentsResult.message || "Failed to load payments.");
        }
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const formatAmount = (amount) => Number(amount || 0).toFixed(2);

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return dateValue;

    return date.toLocaleDateString();
  };

  const getBookingStatus = (booking) => {
    if (booking.payment) return "Confirmed";
    return booking.status || "Pending";
  };

  const getPaymentStatus = (payment) => {
    return payment.status || "Completed";
  };

  const getPaymentMethod = (payment) => {
    return payment.method || "Card";
  };

  const totalBookings = bookings.length;
  const totalPayments = payments.length;

  const totalSpent = payments.reduce((sum, payment) => {
    return sum + Number(payment.amountPaid ?? payment.amount ?? 0);
  }, 0);

  const upcomingEvents = useMemo(() => {
    const today = new Date();

    return bookings.filter((booking) => {
      const eventDate = booking.event?.date;
      if (!eventDate) return false;

      const parsed = new Date(eventDate);
      if (Number.isNaN(parsed.getTime())) return false;

      return parsed >= new Date(today.toDateString());
    }).length;
  }, [bookings]);

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.bookingDate || 0) - new Date(a.bookingDate || 0))
    .slice(0, 3);

  const recentPayments = [...payments]
    .sort(
      (a, b) =>
        new Date(b.paymentDate || b.createdAt || 0) -
        new Date(a.paymentDate || a.createdAt || 0)
    )
    .slice(0, 3);

  const stats = [
    {
      id: 1,
      title: "Total Bookings",
      value: totalBookings,
      icon: Ticket,
    },
    {
      id: 2,
      title: "Payments Made",
      value: totalPayments,
      icon: CreditCard,
    },
    {
      id: 3,
      title: "Upcoming Events",
      value: upcomingEvents,
      icon: CalendarDays,
    },
    {
      id: 4,
      title: "Amount Spent",
      value: `$${totalSpent.toFixed(2)}`,
      icon: DollarSign,
    },
  ];

  return (
    <section className="bg-[#f7f7f7] py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your bookings, payments, and account activity
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/events"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-black px-6 text-base font-medium text-white transition hover:bg-gray-800"
          >
            Browse Events
          </Link>

          <Link
            to="/my-bookings"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-300 bg-white px-6 text-base font-medium text-black transition hover:bg-gray-50"
          >
            My Bookings
          </Link>

          <Link
            to="/my-payments"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-300 bg-white px-6 text-base font-medium text-black transition hover:bg-gray-50"
          >
            My Payments
          </Link>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">
            <p className="text-lg text-gray-600">Loading dashboard...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-black">
              Could not load dashboard
            </h2>
            <p className="mt-2 text-gray-600">{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.id}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-500">{stat.title}</p>
                        <h2 className="mt-2 text-2xl font-bold text-black">
                          {stat.value}
                        </h2>
                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                        <Icon className="h-6 w-6 text-black" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-black">
                      Recent Bookings
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Your latest confirmed bookings
                    </p>
                  </div>

                  <Link
                    to="/my-bookings"
                    className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-gray-700"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentBookings.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
                      No bookings yet.
                    </div>
                  ) : (
                    recentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-black">
                              {booking.event?.title || "Untitled Event"}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {booking.quantity} ticket
                              {booking.quantity > 1 ? "s" : ""}
                            </p>
                          </div>

                          <span className="inline-flex rounded-lg bg-black px-3 py-1 text-xs font-medium text-white">
                            {getBookingStatus(booking)}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-4 text-sm text-gray-600">
                          <span>Booked on {formatDate(booking.bookingDate)}</span>
                          <span className="font-medium text-black">
                            ${formatAmount(booking.totalPrice)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-black">
                      Recent Payments
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Your latest payment activity
                    </p>
                  </div>

                  <Link
                    to="/my-payments"
                    className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-gray-700"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentPayments.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
                      No payments yet.
                    </div>
                  ) : (
                    recentPayments.map((payment) => (
                      <div
                        key={payment.id}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-black">
                              Payment #{payment.id}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {getPaymentMethod(payment)}
                            </p>
                          </div>

                          <span className="inline-flex rounded-lg bg-black px-3 py-1 text-xs font-medium text-white">
                            {getPaymentStatus(payment)}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-4 text-sm text-gray-600">
                          <span>
                            {formatDate(
                              payment.paymentDate ||
                                payment.createdAt ||
                                payment.date
                            )}
                          </span>
                          <span className="font-medium text-black">
                            $
                            {formatAmount(
                              payment.amountPaid ?? payment.amount
                            )}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}