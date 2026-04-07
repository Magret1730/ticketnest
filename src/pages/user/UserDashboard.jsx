import { Link } from "react-router-dom";
import {
  CalendarDays,
  CreditCard,
  DollarSign,
  Ticket,
  ArrowRight,
} from "lucide-react";
import bookings from "../../data/bookings.json";
import payments from "../../data/payments.json";

export default function UserDashboard() {
  const totalBookings = bookings.length;
  const totalPayments = payments.length;
  const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const upcomingEvents = bookings.length;

  const recentBookings = bookings.slice(0, 3);
  const recentPayments = payments.slice(0, 3);

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

        {/* Quick actions */}
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

        {/* Stats */}
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

        {/* Recent sections */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          {/* Recent bookings */}
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
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-black">
                        {booking.event}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {booking.tickets} ticket{booking.tickets > 1 ? "s" : ""}
                      </p>
                    </div>

                    <span className="inline-flex rounded-lg bg-black px-3 py-1 text-xs font-medium text-white">
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-4 text-sm text-gray-600">
                    <span>Booked on {booking.bookedOn}</span>
                    <span className="font-medium text-black">
                      ${booking.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent payments */}
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
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-black">
                        {payment.id}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {payment.method}
                      </p>
                    </div>

                    <span className="inline-flex rounded-lg bg-black px-3 py-1 text-xs font-medium text-white">
                      {payment.status}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-4 text-sm text-gray-600">
                    <span>{payment.date}</span>
                    <span className="font-medium text-black">
                      ${payment.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}