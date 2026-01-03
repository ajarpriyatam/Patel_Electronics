import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed! Check your email for 10% off code!");
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section
      id="newsletter"
      className="w-full py-16 bg-gray-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-gray-800 rounded-3xl p-8 md:p-12 border border-gray-700 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <FaPaperPlane className="w-16 h-16 text-blue-500 animate-bounce" />
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Get The Latest Tech News
          </h2>

          <p className="text-center text-gray-400 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to get <span className="text-blue-400 font-bold">10% off</span> your first gadget purchase and stay updated on new launches.
          </p>

          {/* Subscribe Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {/* Additional Info */}
          <p className="text-center text-gray-500 text-sm mt-6">
            No spam, unsubscribe anytime!
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 border-t border-gray-700 pt-8">
            <div className="text-center">
              <div className="text-3xl mb-2">🏷️</div>
              <p className="text-blue-400 font-semibold text-sm">Exclusive Deals</p>
              <p className="text-gray-500 text-xs">Member-only discounts</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <p className="text-blue-400 font-semibold text-sm">New Arrivals</p>
              <p className="text-gray-500 text-xs">Early access to launches</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-blue-400 font-semibold text-sm">Tech Tips</p>
              <p className="text-gray-500 text-xs">Reviews & guides</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
