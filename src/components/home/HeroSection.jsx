import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black leading-tight">
            Discover Amazing Events
          </h1>

          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-500 leading-tight">
            Book Your Tickets Today
          </h2>

          <p className="mt-8 text-lg md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Find and book tickets to the best concerts, conferences, sports
            events, and more. Your next unforgettable experience is just a
            click away.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-4 text-white text-lg font-medium hover:bg-gray-800 transition"
            >
              Browse Events
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-4 text-black text-lg font-medium hover:bg-gray-50 transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}