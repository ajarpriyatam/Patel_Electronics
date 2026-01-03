import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";

const TermsConditions = () => {
  return (
    <Layout>
      {/* Hero Image Section */}
      <div className="relative h-[40vh] w-full overflow-hidden mt-[25px] md:mt-[67px]">
        <img 
          src="https://images.pexels.com/photos/321444/pexels-photo-321444.jpeg"
          alt="Terms & Conditions Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Terms & Conditions</h1>
            <p className="text-lg md:text-xl opacity-90">
              Please read these terms and conditions carefully before using our website and services.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full py-16 bg-beige">
        <div className="max-w-7xl mx-auto px-[5%]">

        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          {/* Use License */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">2. Use License</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Permission is granted to temporarily download one copy of the materials on KAVERA's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="text-gray-600 list-disc list-inside space-y-1 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>
          </div>

          {/* Product Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">3. Product Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Product Descriptions</h3>
                <p className="text-gray-600">
                  We strive to provide accurate product descriptions, images, and specifications. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Pricing</h3>
                <p className="text-gray-600">
                  All prices are subject to change without notice. We reserve the right to modify or discontinue any product or service without prior notice.
                </p>
              </div>
            </div>
          </div>

          {/* Orders and Payment */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">4. Orders and Payment</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Order Acceptance</h3>
                <p className="text-gray-600">
                  Your receipt of an electronic or other form of order confirmation does not signify our acceptance of your order, nor does it constitute confirmation of our offer to sell.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Payment Methods</h3>
                <p className="text-gray-600">
                  We accept Credit Card, Debit Card, Net Banking, UPI, PayPal, NEFT, and Bank Transfer. All payments are processed securely through our payment gateway partners.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Order Processing</h3>
                <p className="text-gray-600">
                  We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to: product or service availability, errors in the description or price of the product or service, or error in your order.
                </p>
              </div>
            </div>
          </div>

          {/* Shipping and Delivery */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">5. Shipping and Delivery</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Delivery Timeframes</h3>
                <p className="text-gray-600">
                  We aim to dispatch orders within 24 hours. Delivery times vary by location and are estimates only. We are not responsible for delays caused by shipping carriers.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Risk of Loss</h3>
                <p className="text-gray-600">
                  The risk of loss and title for products purchased from us pass to you upon delivery to the carrier.
                </p>
              </div>
            </div>
          </div>

          {/* Returns and Exchanges */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">6. Returns and Exchanges</h2>
            <p className="text-gray-600">
              Please refer to our <Link to="/returns" className="text-[#D4A574] hover:underline">Return & Exchange Policy</Link> for detailed information about returns, exchanges, and refunds.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">7. Limitation of Liability</h2>
            <p className="text-gray-600">
              In no event shall KAVERA, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
            </p>
          </div>

          {/* Privacy Policy */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">8. Privacy Policy</h2>
            <p className="text-gray-600">
              Your privacy is important to us. Please review our <Link to="/privacy" className="text-[#D4A574] hover:underline">Privacy Policy</Link>, which also governs your use of the service, to understand our practices.
            </p>
          </div>

          {/* Governing Law */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">9. Governing Law</h2>
            <p className="text-gray-600">
              These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">10. Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </div>

        {/* Contact Section */}
        <div className="mt-12 text-center bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Questions About Terms?</h2>
          <p className="text-gray-600 mb-6">If you have any questions about these Terms & Conditions, please contact us</p>
          <div className="flex justify-center">
            <a 
              href="mailto:Kaveraluxury@gmail.com" 
              className="bg-[#D4A574] text-white px-6 py-3 rounded-lg hover:bg-[#C08860] transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>

        </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditions;
