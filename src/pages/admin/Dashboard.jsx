import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Ticket, CreditCard, Users } from "lucide-react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import EventService from "../../api/eventService";
import BookingService from "../../api/bookingService";
import PaymentService from "../../api/paymentService";
import UserService from "../../api/userService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [eventsResult, bookingsResult, paymentsResult, usersResult] =
        await Promise.all([
          EventService.getAllEvents(),
          BookingService.getAllBookings(),
          PaymentService.getAllPayments(),
          UserService.getAllUsers(),
        ]);

      const events = eventsResult?.success ? eventsResult.data || [] : [];
      const bookings = bookingsResult?.success ? bookingsResult.data || [] : [];
      const payments = paymentsResult?.success ? paymentsResult.data || [] : [];
      const users = usersResult?.success ? usersResult.data || [] : [];

      const totalRevenue = payments.reduce((sum, payment) => {
        const amount =
          Number(payment.amountPaid || payment.amount || payment.totalAmount) ||
          0;
        return sum + amount;
      }, 0);

      setStats({
        totalEvents: events.length,
        totalBookings: bookings.length,
        totalRevenue,
        totalUsers: users.length,
      });
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(amount);
  };

  const statCards = [
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: CalendarDays,
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Ticket,
    },
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: CreditCard,
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
    },
  ];

  const quickActions = [
    {
      title: "Manage Events",
      icon: CalendarDays,
      to: "/admin/events",
    },
    {
      title: "View Bookings",
      icon: Ticket,
      to: "/admin/bookings",
    },
    {
      title: "View Payments",
      icon: CreditCard,
      to: "/admin/payments",
    },
    {
      title: "View Users",
      icon: Users,
      to: "/admin/users",
    },
  ];

  return (
    <section className="min-h-screen bg-[#f7f7f7] py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-black sm:text-5xl">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage events, bookings, and users
          </p>
        </div>

        {loading ? (
          <ClipLoader fullScreen={false} />
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {statCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <div className="mb-10 flex items-start justify-between">
                      <p className="text-lg font-medium text-gray-600">
                        {card.title}
                      </p>
                      <Icon className="h-6 w-6 text-gray-500" />
                    </div>

                    <h2 className="text-3xl font-bold text-black">
                      {card.value}
                    </h2>
                  </div>
                );
              })}
            </div>

            {/* Quick actions */}
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-black">
                Quick Actions
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <Link
                      key={action.title}
                      to={action.to}
                      className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 transition group-hover:bg-black">
                          <Icon className="h-6 w-6 text-black transition group-hover:text-white" />
                        </div>

                        <span className="text-xl font-semibold text-black">
                          {action.title}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}