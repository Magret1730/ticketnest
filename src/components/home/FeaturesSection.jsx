import { Calendar, Ticket, CreditCard } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Calendar,
    title: "Browse Events",
    description: "Explore hundreds of events across all categories and locations",
  },
  {
    id: 2,
    icon: Ticket,
    title: "Book Instantly",
    description: "Secure your tickets with our fast and easy booking process",
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Secure Payments",
    description: "Pay safely with multiple payment options available",
  },
];

export default function FeaturesSection() {
  return (
    <section className="border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center px-6 py-12 md:py-16"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-black" strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-black">
                  {feature.title}
                </h3>

                <p className="mt-4 max-w-sm text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}