import React from "react";
import Layout from "../layouts/Layout";

const RefundPolicy = () => {
  return (
    <Layout>
      {/* Hero Image Section */}
      <div className="relative h-[40vh] w-full overflow-hidden mt-[25px] md:mt-[67px]">
        <img 
          src="https://images.pexels.com/photos/1652109/pexels-photo-1652109.jpeg"
          alt="Refund Policy Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Refund Policy</h1>
            <p className="text-lg md:text-xl opacity-90">
              Learn about our refund process, timelines, and conditions for getting your money back.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full py-16 bg-beige">
        <div className="max-w-7xl mx-auto px-[5%]">

        <div className="space-y-8">
          {/* Refund Eligibility */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">Refund Eligibility</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Eligible for Refund</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Items returned within 7 days of delivery</li>
                  <li>Unused products in original packaging</li>
                  <li>Manufacturing defects or damaged items</li>
                  <li>Wrong items sent due to our error</li>
                  <li>Items damaged during shipping</li>
                  <li>Order cancelled before dispatch</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Not Eligible for Refund</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Used or partially used products</li>
                  <li>Items damaged by customer</li>
                  <li>Personalized or custom-made items</li>
                  <li>Items returned after 7 days</li>
                  <li>Products without original packaging</li>
                  <li>Items purchased during clearance sales</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Refund Process */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">Refund Process</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 1: Initiate Return</h3>
                <p className="text-gray-600">
                  Contact us via WhatsApp at +91 88528 22025 or email at Kaveraluxury@gmail.com with your order number and reason for return. Include photos if the item is damaged.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 2: Get Approval</h3>
                <p className="text-gray-600">
                  We will review your request and provide approval within 24 hours. You will receive return instructions and a return authorization number.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 3: Return the Item</h3>
                <p className="text-gray-600">
                  Pack the item securely in its original packaging and ship it to our return address. Keep the tracking number for your records.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Step 4: Inspection and Processing</h3>
                <p className="text-gray-600">
                  Once we receive the item, we will inspect it within 2-3 business days. If approved, we will process your refund within 3-5 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Refund Timeline */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">Refund Timeline</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Processing Time</h3>
                <p className="text-gray-600">
                  Refunds are processed within 3-5 business days after we receive and approve the returned item.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Credit to Account</h3>
                <p className="text-gray-600">
                  The time it takes for the refund to appear in your account depends on your payment method:
                </p>
                <ul className="text-gray-600 list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Credit/Debit Cards: 5-10 business days</li>
                  <li>Net Banking: 3-5 business days</li>
                  <li>UPI: 2-3 business days</li>
                  <li>PayPal: 3-5 business days</li>
                  <li>Bank Transfer: 5-7 business days</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Refund Amount */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">Refund Amount</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Full Refund</h3>
                <p className="text-gray-600">
                  You will receive a full refund (including shipping charges) if the return is due to our error, manufacturing defect, or damaged item during shipping.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Partial Refund</h3>
                <p className="text-gray-600">
                  For customer-initiated returns, the refund amount will be the product price minus original shipping charges. COD charges (if applicable) are non-refundable.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Payment Gateway Charges</h3>
                <p className="text-gray-600">
                  Payment gateway processing charges (typically 2-3%) are non-refundable and will be deducted from the refund amount.
                </p>
              </div>
            </div>
          </div>

          {/* Refund Methods */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">Refund Methods</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Original Payment Method</h3>
                <p className="text-gray-600">
                  Refunds are processed to the original payment method used for the purchase. We cannot refund to a different account or method.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Store Credit</h3>
                <p className="text-gray-600">
                  In some cases, we may offer store credit instead of a cash refund. Store credit is valid for 6 months from the date of issue and can be used for future purchases.
                </p>
              </div>
            </div>
          </div>

          {/* Special Cases */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">Special Cases</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Duplicate Orders</h3>
                <p className="text-gray-600">
                  If you accidentally place a duplicate order, contact us immediately. We will cancel the duplicate order and process a full refund if payment has been charged.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Wrong Items</h3>
                <p className="text-gray-600">
                  If you receive the wrong item due to our error, we will arrange for pickup of the wrong item and delivery of the correct item at no additional cost.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Damaged Items</h3>
                <p className="text-gray-600">
                  If you receive a damaged item, please contact us immediately with photos. We will arrange for a replacement or full refund including shipping charges.
                </p>
              </div>
            </div>
          </div>

        {/* Contact Section */}
        <div className="mt-12 text-center bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Need Help with Refunds?</h2>
          <p className="text-gray-600 mb-6">For any questions about refunds or to initiate a return, please contact us</p>
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

export default RefundPolicy;
