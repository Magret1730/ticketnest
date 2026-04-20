import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import PaymentService from "../../api/paymentService";
import { ClipLoader } from "react-spinners";

export default function ViewPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const result = await PaymentService.getAllPayments();

      if (result.success) {
        setPayments(result.data || []);
      } else {
        toast.error(result.message || "Failed to load payments");
      }
    } catch (err) {
      toast.error("Failed to load payments");
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

  const getCustomerName = (payment) => {

    return payment.userName || "Unknown Customer";
  };

  const getPaymentId = (payment) => {
    return payment.paymentNumber || `P${payment.id}`;
  };

  const getBookingId = (payment) => {
    return payment.bookingId || "N/A";
  };

  const getPaymentMethod = (payment) => {
    return payment.method || "Credit Card";
  };

  const getStatus = (payment) => {
    return payment.status?.toLowerCase() || "completed";
  };

  const statusClass = (status) => {
    if (status === "completed" || status === "confirmed") {
      return "bg-black text-white";
    }

    if (status === "pending") {
      return "bg-gray-100 text-black";
    }

    return "bg-gray-100 text-black";
  };

  const totalRevenue = useMemo(() => {
    return payments.reduce((sum, payment) => {
      return sum + Number(payment.amountPaid ?? payment.amount ?? 0);
    }, 0);
  }, [payments]);

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

        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              All Payments
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              View payment history and revenue
            </p>
          </div>

          <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:w-auto">
            <p className="text-lg text-gray-500">Total Revenue</p>
            <h2 className="mt-1 text-4xl font-bold text-black">
              ${formatAmount(totalRevenue)}
            </h2>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="mb-6 text-2xl font-bold text-black">Payments</h2>

          {loading ? (
            <ClipLoader fullScreen={false} />
          ) : payments.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-10 text-center">
              <h3 className="text-xl font-bold text-black">No payments yet</h3>
              <p className="mt-2 text-gray-600">
                Customer payments will appear here.
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
                          Payment ID
                        </th>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Customer
                        </th>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Booking ID
                        </th>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Amount
                        </th>
                        <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                          Method
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
                      {payments.map((payment) => {
                        const status = getStatus(payment);

                        return (
                          <tr
                            key={payment.id}
                            className="border-b border-gray-200 last:border-b-0"
                          >
                            <td className="px-4 py-4 text-lg text-black">
                              {getPaymentId(payment)}
                            </td>
                            <td className="px-4 py-4 text-lg text-black">
                              {getCustomerName(payment)}
                            </td>
                            <td className="px-4 py-4 text-lg text-black">
                              {getBookingId(payment)}
                            </td>
                            <td className="px-4 py-4 text-lg font-medium text-black">
                              $
                              {formatAmount(
                                payment.amountPaid ?? payment.amount
                              )}
                            </td>
                            <td className="px-4 py-4 text-lg text-black">
                              {getPaymentMethod(payment)}
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
                              {formatDate(
                                payment.paymentDate ||
                                  payment.createdAt ||
                                  payment.date
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4 md:hidden">
                {payments.map((payment) => {
                  const status = getStatus(payment);

                  return (
                    <div
                      key={payment.id}
                      className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm text-gray-500">Payment ID</p>
                          <p className="text-lg font-semibold text-black">
                            {getPaymentId(payment)}
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
                            {getCustomerName(payment)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-gray-500">Booking ID</span>
                          <span className="text-base text-black">
                            {getBookingId(payment)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-gray-500">Amount</span>
                          <span className="text-base font-medium text-black">
                            $
                            {formatAmount(
                              payment.amountPaid ?? payment.amount
                            )}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-gray-500">Method</span>
                          <span className="text-base text-black">
                            {getPaymentMethod(payment)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-gray-500">Date</span>
                          <span className="text-base text-gray-600">
                            {formatDate(
                              payment.paymentDate ||
                                payment.createdAt ||
                                payment.date
                            )}
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