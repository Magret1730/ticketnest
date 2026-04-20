import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CreditCard, Ticket } from "lucide-react";
import { toast } from "react-toastify";
import { isExpiryValid } from "../../utils/formatDate";
import BookingService from "../../api/bookingService";
import PaymentService from "../../api/paymentService";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [amountToPay, setAmountToPay] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await BookingService.getBookingById(bookingId);

        if (result.success) {
          setBooking(result.data);
        } else {
          setError(result.message || "Failed to load booking details.");
        }
      } catch (err) {
        setError("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
  
    if (!booking) return;
  
    if (!cardNumber || !expiryDate || !cvc || !amountToPay) {
      toast.error("Please fill in all payment details.");
      return;
    }
  
    const cleanCardNumber = cardNumber.replace(/\s/g, "");
  
    if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
      toast.error("Please enter a valid card number.");
      return;
    }
  
    if (!/^\d{2}\/\d{4}$/.test(expiryDate)) {
      toast.error("Please enter a valid expiry date (MM/YYYY).");
      return;
    }
  
    if (!isExpiryValid(expiryDate)) {
      toast.error("Card expiry date is invalid or expired.");
      return;
    }
  
    if (!/^\d{3,4}$/.test(cvc)) {
      toast.error("Please enter a valid CVC.");
      return;
    }
  
    if (Number(amountToPay) !== Number(booking.totalPrice)) {
      toast.error(`Enter the exact amount: $${Number(booking.totalPrice).toFixed(2)}`);
      return;
    }
  
    try {
      setIsProcessing(true);
      toast.info("Processing payment...");
  
      const result = await PaymentService.createPayment({
        bookingId: booking.id,
        amountPaid: Number(amountToPay),
      });
  
      if (result.success) {
        toast.success("Payment successful!");
        navigate(`/payment-success/${bookingId}`);
      } else {
        toast.error(result.message || "Payment failed. Try again.");
      }
    } catch (error) {
      toast.error("Payment failed. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-[#f7f7f7] py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-lg text-gray-600">Loading payment details...</p>
        </div>
      </section>
    );
  }

  if (error || !booking) {
    return (
      <section className="bg-[#f7f7f7] py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            to="/my-bookings"
            className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to My Bookings
          </Link>

          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-black">Payment not found</h1>
            <p className="mt-2 text-gray-600">
              {error || "We could not find the booking details for this payment."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const event = booking.event;
  const total = Number(booking.totalPrice);
  const quantity = booking.quantity;

  return (
    <section className="bg-[#f7f7f7] py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          to={`/booking/${event.id}?quantity=${quantity}`}
          className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Booking
        </Link>

        <h1 className="mb-8 text-2xl font-bold tracking-tight text-black sm:text-4xl">
          Complete Payment
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex items-center gap-3">
              <Ticket className="h-6 w-6 text-black" />
              <h2 className="text-xl font-bold text-black">Order Summary</h2>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black">{event?.title}</h3>
              <p className="mt-2 text-md text-gray-600">
                {quantity} {quantity > 1 ? "tickets" : "ticket"}
              </p>
              <p className="mt-2 text-md text-gray-600">
                Booking No: {booking.bookingNumber}
              </p>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xl font-semibold text-black">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-black">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-black" />
              <h2 className="text-xl font-bold text-black">Payment Details</h2>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="cardNumber"
                  className="mb-3 block text-lg font-medium text-black"
                >
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="h-10 w-full rounded-xl border border-gray-300 px-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="expiryDate"
                    className="mb-3 block text-lg font-medium text-black"
                  >
                    Expiry Date
                  </label>
                  <input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YYYY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="h-10 w-full rounded-xl border border-gray-300 px-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="mb-3 block text-lg font-medium text-black"
                  >
                    CVC
                  </label>
                  <input
                    id="cvc"
                    type="text"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="h-10 w-full rounded-xl border border-gray-300 px-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="amountToPay"
                  className="mb-3 block text-lg font-medium text-black"
                >
                  Amount to Pay
                </label>
                <input
                  id="amountToPay"
                  type="number"
                  step="0.01"
                  placeholder={total.toFixed(2)}
                  value={amountToPay}
                  onChange={(e) => setAmountToPay(e.target.value)}
                  className="h-10 w-full rounded-xl border border-gray-300 px-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black"
                />
                <p className="mt-3 text-sm text-gray-500">
                  Enter the exact amount: ${total.toFixed(2)}
                </p>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="h-12 w-full rounded-xl bg-black text-lg font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}