import React from "react";
import Layout from "../layouts/Layout";

const ShippingPolicy = () => {
  return (
    <Layout>
      {/* Hero Image Section */}
      <div className="relative h-[40vh] w-full overflow-hidden mt-[25px] md:mt-[67px]">
        <img 
          src="https://images.pexels.com/photos/243125/pexels-photo-243125.jpeg"
          alt="Shipping Policy Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Shipping & Cancellations</h1>
            <p className="text-lg md:text-xl opacity-90">
              Learn about our shipping policies, delivery times, and cancellation procedures.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full py-16 bg-beige">
        <div className="max-w-7xl mx-auto px-[5%]">

        <div className="space-y-8">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">Shipping Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Processing Time</h3>
                <p className="text-gray-600">
                  We usually dispatch orders within 24 hours of receiving your order. During peak seasons or sales, processing may take up to 48 hours.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Shipping Charges</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Shipping just Rs. 75 for orders up to Rs. 500!</li>
                  <li>Free shipping on orders above Rs. 500</li>
                  <li>Express delivery available at additional charges</li>
                  <li>International shipping available (charges apply)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Delivery Timeframes</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Metro cities: 2-3 business days</li>
                  <li>Other cities: 3-5 business days</li>
                  <li>Remote areas: 5-7 business days</li>
                  <li>International: 7-14 business days</li>
                </ul>
              </div>
            </div>
          </div>

          {/* COD Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">Cash on Delivery (COD)</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">COD Availability</h3>
                <p className="text-gray-600">
                  COD is available for orders up to Rs. 2,500. For orders above this amount, advance payment is required.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">COD Charges</h3>
                <p className="text-gray-600">
                  Additional COD charges of Rs. 30 apply to all Cash on Delivery orders.
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Partners */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">Shipping Partners</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Domestic Shipping</h3>
                <p className="text-gray-600">
                  We partner with leading courier services including Blue Dart, Delhivery, and India Post for reliable and timely delivery across India.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">International Shipping</h3>
                <p className="text-gray-600">
                  For international orders, we use DHL, FedEx, and other international courier services. Shipping charges vary by destination and weight.
                </p>
              </div>
            </div>
          </div>

          {/* Order Cancellation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">Order Cancellation</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Cancellation Timeframe</h3>
                <p className="text-gray-600">
                  You can cancel your order within 2 hours of placing it, provided the order hasn't been dispatched yet.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">How to Cancel</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Contact us via WhatsApp at +91 88528 22025</li>
                  <li>Email us at Kaveraluxury@gmail.com</li>
                  <li>Provide your order number and reason for cancellation</li>
                  <li>We will process the cancellation and refund within 24 hours</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Cancellation Charges</h3>
                <p className="text-gray-600">
                  No cancellation charges apply if cancelled within the allowed timeframe. Payment gateway charges (if any) will be deducted from the refund amount.
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Issues */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">Delivery Issues</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Failed Delivery</h3>
                <p className="text-gray-600">
                  If delivery fails due to incorrect address, recipient not available, or other reasons, the package will be returned to us. We will contact you to arrange re-delivery or refund.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Damaged Package</h3>
                <p className="text-gray-600">
                  If you receive a damaged package, please contact us immediately with photos. We will arrange for a replacement or full refund.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Wrong Address</h3>
                <p className="text-gray-600">
                  Please ensure your shipping address is correct at the time of checkout. We are not responsible for packages delivered to incorrect addresses provided by the customer.
                </p>
              </div>
            </div>
          </div>

        {/* Contact Section */}
        <div className="mt-12 text-center bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Need Help with Shipping?</h2>
          <p className="text-gray-600 mb-6">For any shipping-related queries or issues, please contact us</p>
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

export default ShippingPolicy;
