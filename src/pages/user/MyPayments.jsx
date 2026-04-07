import { NavLink } from "react-router-dom";
import payments from "../../data/payments.json";

export default function MyPayments() {
  const tabLinkClass = ({ isActive }) =>
    `rounded-xl px-5 py-2.5 text-base font-medium transition ${
      isActive
        ? "bg-black text-white"
        : "border border-gray-300 bg-white text-black hover:bg-gray-50"
    }`;

  return (
    <section className="bg-[#f7f7f7] py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black sm:text-4xl">
            My Payments
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            View your payment history
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <NavLink
            to="/my-bookings"
            className={tabLinkClass}
          >
            Bookings
          </NavLink>

          <NavLink
            to="/my-payments"
            className={tabLinkClass}
          >
            Payments
          </NavLink>
        </div>

        {/* Desktop / Tablet Table */}
        <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-4 text-left text-lg font-semibold text-black">
                    Payment ID
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
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-200 last:border-b-0">
                    <td className="px-4 py-4 text-lg text-black">{payment.id}</td>
                    <td className="px-4 py-4 text-lg text-black">
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-lg text-black">{payment.method}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-lg bg-black px-3 py-1 text-sm font-medium text-white">
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-lg text-gray-600">{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">Payment ID</p>
                  <p className="text-lg font-semibold text-black">{payment.id}</p>
                </div>

                <span className="inline-flex rounded-lg bg-black px-3 py-1 text-sm font-medium text-white">
                  {payment.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">Amount</span>
                  <span className="text-base font-medium text-black">
                    ${payment.amount.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">Method</span>
                  <span className="text-base text-black">{payment.method}</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">Date</span>
                  <span className="text-base text-gray-600">{payment.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}