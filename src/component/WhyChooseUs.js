import React from "react";
import { FaMicrochip, FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaMicrochip,
      title: "Latest Tech",
      description: "We stock the newest gadgets and latest releases from top global brands at competitive prices.",
      color: "#3B82F6"
    },
    {
      icon: FaShippingFast,
      title: "Fast Delivery",
      description: "Get your electronics delivered to your doorstep quickly and safely with our premium logistics partners.",
      color: "#10B981"
    },
    {
      icon: FaShieldAlt,
      title: "Warranty Protection",
      description: "All products come with manufacturer warranty and our 30-day hassle-free return policy.",
      color: "#8B5CF6"
    },
    {
      icon: FaHeadset,
      title: "Expert Support",
      description: "Our tech experts are here to help you choose the right product and assist with setup.",
      color: "#F59E0B"
    }
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-gray-900 font-bold mb-4">
            Why Shop With Us?
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Experience the best in electronics shopping with our premium services
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-gray-50 rounded-xl p-8 border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-6 relative">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-white shadow-sm"
                    >
                      <IconComponent
                        className="w-8 h-8"
                        style={{ color: feature.color }}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gray-900 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">10k+</p>
              <p className="text-gray-400 text-sm md:text-base">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">1k+</p>
              <p className="text-gray-400 text-sm md:text-base">Products</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">24/7</p>
              <p className="text-gray-400 text-sm md:text-base">Support</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">100%</p>
              <p className="text-gray-400 text-sm md:text-base">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;

