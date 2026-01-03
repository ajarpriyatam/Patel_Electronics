import React from "react";
import Layout from "../layouts/Layout";

const ReturnPolicy = () => {
  return (
    <Layout>
      {/* Hero Image Section */}
      <div className="relative h-[40vh] w-full overflow-hidden mt-[25px] md:mt-[67px]">
        <img 
          src="https://images.pexels.com/photos/278549/pexels-photo-278549.jpeg"
          alt="Return Policy Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Return & Exchange Policy</h1>
            <p className="text-lg md:text-xl opacity-90">
              We want you to be completely satisfied with your purchase from KAVERA.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full py-16 bg-beige">
        <div className="max-w-7xl mx-auto px-[5%]">

        <div className="space-y-8">
          {/* Return Policy */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">Returns</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Return Timeframe</h3>
                <p className="text-gray-600">
                  We offer a 7-day return policy from the date of delivery. Items must be in their original condition, unused, and with all original packaging and tags intact.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Eligible Items</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Unused candles in original packaging</li>
                  <li>Items with manufacturing defects</li>
                  <li>Wrong items sent due to our error</li>
                  <li>Damaged items during shipping</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Non-Returnable Items</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Used or partially used candles</li>
                  <li>Items damaged by customer</li>
                  <li>Personalized or custom-made items</li>
                  <li>Items returned after 7 days</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Exchange Policy */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">Exchanges</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Exchange Process</h3>
                <p className="text-gray-600">
                  We offer exchanges for different fragrances or products of equal or higher value. The exchange must be initiated within 7 days of delivery.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Exchange Conditions</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Item must be unused and in original packaging</li>
                  <li>Exchange for items of equal or higher value</li>
                  <li>Customer pays the price difference for higher value items</li>
                  <li>Original shipping charges are non-refundable</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">How to Return/Exchange</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 1: Contact Us</h3>
                <p className="text-gray-600">
                  Contact us via WhatsApp at +91 88528 22025 or email at Kaveraluxury@gmail.com with your order number and reason for return/exchange.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 2: Get Approval</h3>
                <p className="text-gray-600">
                  We will review your request and provide approval along with return instructions within 24 hours.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 3: Ship the Item</h3>
                <p className="text-gray-600">
                  Pack the item securely in its original packaging and ship it to our return address. We will provide the return address upon approval.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 4: Processing</h3>
                <p className="text-gray-600">
                  Once we receive the item, we will inspect it and process your refund or exchange within 3-5 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">Refunds</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Refund Timeline</h3>
                <p className="text-gray-600">
                  Refunds will be processed within 3-5 business days after we receive the returned item. The refund will be credited to your original payment method.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Shipping Charges</h3>
                <p className="text-gray-600">
                  Original shipping charges are non-refundable unless the return is due to our error (wrong item, damaged item, or manufacturing defect).
                </p>
              </div>
            </div>
          </div>

        {/* Contact Section */}
        <div className="mt-12 text-center bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">For any questions about returns or exchanges, please contact us</p>
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

export default ReturnPolicy;
