import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import BookingService from "../../api/bookingService";
import { ClipLoader } from "react-spinners";

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const result = await BookingService.getAllBookings();

      if (result.success) {
        setBookings(result.data || []);
      } else {
        toast.error(result.message || "Failed to load bookings");
      }
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => Number(amount || 0).toFixed(2);

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return dateValue;

    return date.toLocaleDateString();
  };

  const getCustomerName = (booking) => {
    const firstName = booking.user?.firstName || "";
    const lastName = booking.user?.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim();

    return fullName || booking.user?.email || "Unknown Customer";
  };

  const getBookingId = (booking) => {
    return booking.bookingNumber || booking.id;
  };

  const getStatus = (booking) => {
    if (booking.payment) return "confirmed";
    return booking.status || "pending";
  };

  const statusClass = (status) => {
    const value = String(status).toLowerCase();

    if (value === "confirmed") {
      return "bg-black text-white";
    }

    return "bg-gray-100 text-black";
  };

  return (
    <section className="bg-[#f7f7f7] py-10 md:py-14">
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
            All Bookings
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            View and manage all customer bookings
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="mb-6 text-2xl font-bold text-black">Bookings</h2>

          {loading ? (
            <ClipLoader fullScreen={false} />
          ) : bookings.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-10 text-center">
              <h3 className="text-xl font-bold text-black">No bookings yet</h3>
              <p className="mt-2 text-gray-600">
                Customer bookings will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden overflow-hidden rounded-2xl border border-gray-200 md:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="border-b border-gray-200 bg-gray-50">
                      <tr>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Booking ID
                        </th>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Customer
                        </th>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Event
                        </th>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Tickets
                        </th>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Total
                        </th>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Status
                        </th>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Date
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {bookings.map((booking) => {
                        const status = getStatus(booking);

                        return (
                          <tr
                            key={booking.id}
                            className="border-b border-gray-200 last:border-b-0"
                          >
                            <td className="px-4 py-4 text-lg text-black">
                              {getBookingId(booking)}
                            </td>
                            <td className="px-4 py-4 text-lg text-black">
                              {getCustomerName(booking)}
                            </td>
                            <td className="px-4 py-4 text-lg text-black">
                              {booking.event?.title || "Untitled Event"}
                            </td>
                            <td className="px-4 py-4 text-lg text-black">
                              {booking.quantity}
                            </td>
                            <td className="px-4 py-4 text-lg text-black">
                              ${formatAmount(booking.totalPrice)}
                            </td>
                            <td className="px-4 py-4">
                              <span
                                className={`inline-flex rounded-lg px-3 py-1 text-sm font-medium capitalize ${statusClass(
                                  status
                                )}`}
                              >
                                {status}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-lg text-gray-600">
                              {formatDate(booking.bookingDate)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4 md:hidden">
                {bookings.map((booking) => {
                  const status = getStatus(booking);

                  return (
                    <div
                      key={booking.id}
                      className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm text-gray-500">Booking ID</p>
                          <p className="text-lg font-semibold text-black">
                            {getBookingId(booking)}
                          </p>
                        </div>

                        <span
                          className={`inline-flex rounded-lg px-3 py-1 text-sm font-medium capitalize ${statusClass(
                            status
                          )}`}
                        >
                          {status}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-gray-500">Customer</span>
                          <span className="text-base text-black">
                            {getCustomerName(booking)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-gray-500">Event</span>
                          <span className="text-base text-black">
                            {booking.event?.title || "Untitled Event"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-gray-500">Tickets</span>
                          <span className="text-base text-black">
                            {booking.quantity}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-gray-500">Total</span>
                          <span className="text-base font-medium text-black">
                            ${formatAmount(booking.totalPrice)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-gray-500">Date</span>
                          <span className="text-base text-gray-600">
                            {formatDate(booking.bookingDate)}
                          </span>
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