import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";

const FAQ = () => {
  return (
    <Layout>
      {/* Hero Image Section */}
      <div className="relative h-[40vh] w-full overflow-hidden mt-[25px] md:mt-[67px]">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
          alt="FAQ Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Frequently Asked Questions</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto px-4">
              Find answers to common questions about our products, shipping, and warranty policies.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-[5%]">

          <div className="space-y-8">
            {/* Shipping, returns & payments */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">📦</span> Shipping & Returns
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">1. How long is the delivery time?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We process orders within 24 hours. Standard delivery takes 3-5 business days, while express delivery takes 1-2 business days.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">2. What is your return policy?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We offer a 30-day hassle-free return policy for all electronics. Items must be in original condition with all accessories. Please visit our <Link to="/returns" className="text-blue-600 hover:underline font-medium">Return Policy</Link> page for details.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Do you ship internationally?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes, we ship to select international locations. Shipping costs and timelines vary by destination.
                  </p>
                </div>
              </div>
            </div>

            {/* Product & Warranty */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">🛡️</span> Warranty & Support
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Do products come with warranty?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes, all our major electronics come with a standard 1-year manufacturer warranty. Extended warranty packages are also available for purchase.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">2. How can I claim warranty?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You can contact our support team with your order ID and invoice. We will guide you through the warranty claim process with the respective manufacturer.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Do you offer technical support?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our tech experts are available 24/7 to assist you with setup, troubleshooting, and general queries about your purchased products.
                  </p>
                </div>
              </div>
            </div>

            {/* Account & Payment */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">💳</span> Account & Payment
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">1. What payment methods are accepted?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We accept all major Credit/Debit Cards, Net Banking, UPI, EMI options, and Cash on Delivery (for orders up to Rs. 20,000).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Is my payment information secure?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Absolutely. We use industry-standard encryption and secure payment gateways to ensure your data is completely safe.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center bg-gray-50 rounded-xl border border-gray-200 p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Can't find the answer you're looking for? Please contact our friendly support team.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="mailto:support@electronics.com"
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/30"
              >
                Email Support
              </a>
              <a
                href="tel:+911234567890"
                className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all"
              >
                Call Us
              </a>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
