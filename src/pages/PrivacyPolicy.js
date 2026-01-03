import React from "react";
import Layout from "../layouts/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      {/* Hero Image Section */}
      <div className="relative h-[40vh] w-full overflow-hidden mt-[25px] md:mt-[67px]">
        <img 
          src="https://images.pexels.com/photos/278549/pexels-photo-278549.jpeg"
          alt="Privacy Policy Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg md:text-xl opacity-90">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm opacity-75 mt-2">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </div>

      <div className="w-full py-16 bg-beige">
        <div className="max-w-7xl mx-auto px-[5%]">

        <div className="space-y-8">
          {/* Information We Collect */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">1. Information We Collect</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Personal Information</h3>
                <p className="text-gray-600 mb-2">We collect information you provide directly to us, such as when you:</p>
                <ul className="text-gray-600 list-disc list-inside space-y-1 ml-4">
                  <li>Create an account or make a purchase</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us for customer support</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p className="text-gray-600 mt-2">This may include your name, email address, phone number, shipping address, and payment information.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Automatically Collected Information</h3>
                <p className="text-gray-600 mb-2">We automatically collect certain information when you visit our website:</p>
                <ul className="text-gray-600 list-disc list-inside space-y-1 ml-4">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">2. How We Use Your Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Order Processing</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Handle returns and exchanges</li>
                  <li>Provide customer support</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Communication</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Send promotional emails and newsletters (with your consent)</li>
                  <li>Respond to your inquiries and feedback</li>
                  <li>Notify you about important changes to our services</li>
                  <li>Send order-related communications</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Website Improvement</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Analyze website usage and performance</li>
                  <li>Improve our products and services</li>
                  <li>Personalize your shopping experience</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">3. Information Sharing</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">We Do Not Sell Your Information</h3>
                <p className="text-gray-600">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Service Providers</h3>
                <p className="text-gray-600 mb-2">We may share your information with trusted third-party service providers who assist us in:</p>
                <ul className="text-gray-600 list-disc list-inside space-y-1 ml-4">
                  <li>Payment processing</li>
                  <li>Shipping and delivery</li>
                  <li>Email marketing services</li>
                  <li>Website analytics</li>
                  <li>Customer support</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Legal Requirements</h3>
                <p className="text-gray-600">
                  We may disclose your information if required by law or to protect our rights, property, or safety, or that of our customers or others.
                </p>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">4. Data Security</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Security Measures</h3>
                <p className="text-gray-600">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Secure Payment Processing</h3>
                <p className="text-gray-600">
                  All payment information is encrypted and processed through secure payment gateways. We do not store your complete payment card information on our servers.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Data Retention</h3>
                <p className="text-gray-600">
                  We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
                </p>
              </div>
            </div>
          </div>

          {/* Cookies and Tracking */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">5. Cookies and Tracking Technologies</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">What Are Cookies?</h3>
                <p className="text-gray-600">
                  Cookies are small text files stored on your device that help us improve your browsing experience and analyze website traffic.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Types of Cookies We Use</h3>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand website usage</li>
                  <li><strong>Marketing Cookies:</strong> Used for targeted advertising (with consent)</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Managing Cookies</h3>
                <p className="text-gray-600">
                  You can control cookie settings through your browser preferences. However, disabling certain cookies may affect website functionality.
                </p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">6. Your Rights</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Access and Update</h3>
                <p className="text-gray-600">
                  You have the right to access, update, or correct your personal information. You can do this through your account settings or by contacting us.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Data Portability</h3>
                <p className="text-gray-600">
                  You can request a copy of your personal data in a structured, commonly used format.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Deletion</h3>
                <p className="text-gray-600">
                  You can request deletion of your personal information, subject to certain legal and business requirements.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Marketing Communications</h3>
                <p className="text-gray-600">
                  You can opt out of marketing emails by clicking the unsubscribe link in any email or by contacting us directly.
                </p>
              </div>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">7. Children's Privacy</h2>
            <p className="text-gray-600">
              Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
            </p>
          </div>

          {/* Changes to Privacy Policy */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#D4A574] mb-6">8. Changes to This Privacy Policy</h2>
            <p className="text-gray-600">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </div>

        {/* Contact Section */}
        <div className="mt-12 text-center bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-[#D4A574] mb-4">Questions About Privacy?</h2>
          <p className="text-gray-600 mb-6">If you have any questions about this Privacy Policy or our data practices, please contact us</p>
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

export default PrivacyPolicy;
