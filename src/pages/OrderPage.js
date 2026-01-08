import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import { useCart } from "../context/cart";
import { useDispatch } from "react-redux";
import { createOrder, paymentVerification } from "../actions/orderAction";
import axiosInstance from "../services/axios";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaShoppingBag,
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaCheckCircle
} from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import toast from "react-hot-toast";

const OrderPage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "Online" // Default to Online
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const subtotal = cart.reduce((total, item) => {
    const qty = parseInt(item.quantity, 10) || 0;
    const basePrice = parseFloat(item.price) || 0;
    const fee = item.isCustomization ? (parseFloat(item.customizationFee) || 100) : 0;
    const perItemPrice = basePrice + fee;
    return total + perItemPrice * qty;
  }, 0);
  const shipping = subtotal > 500 ? 0 : 75;
  const total = subtotal + shipping;

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await proceedToPay();
  };

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    try {
      const orderPayload = {
        orderItems: cart,
        shippingInfo: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod: "Online",
        totalPrice: total,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
      };

      // Create a Razorpay order on the server
      const amountInPaise = Math.round(total * 100);
      const { data } = await axiosInstance.post("/payment/orders", { amount: amountInPaise });

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load Razorpay SDK. Please try again.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: data.key || process.env.REACT_APP_RAZORPAY_KEY,
        amount: data.order.amount,
        currency: data.order.currency || 'INR',
        name: 'Patel Gen Electronics',
        description: 'Order Payment',
        order_id: data.order.id,
        handler: async function (response) {
          try {
            // Verify payment on server
            await dispatch(paymentVerification(response));
            // Create order record after successful payment
            await dispatch(createOrder(orderPayload));
            toast.success('Payment successful and order created');
            setCart([]);
            navigate('/user/orders');
          } catch (err) {
            toast.error(err?.response?.data?.message || err.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#D4A574'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const proceedToPay = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Unified entry logic
    if (formData.paymentMethod === "Online") {
      await handleRazorpayPayment();
      return;
    }

    // COD or other non-online payments
    setIsProcessing(true);
    try {
      const orderPayload = {
        orderItems: cart,
        shippingInfo: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod: "COD",
        totalPrice: total,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
      };

      await dispatch(createOrder(orderPayload));
      toast.success('Order placed successfully via COD');
      setCart([]);
      navigate('/user/orders');
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-white py-8 mt-[100px]">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gray-50 rounded-2xl p-12 shadow-sm border border-gray-100">
              <FaShoppingBag className="mx-auto text-6xl text-gray-300 mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any items to your cart yet.</p>
              <button
                onClick={() => navigate("/")}
                className="bg-[#D4A574] text-white py-3 px-8 rounded-full font-semibold hover:bg-[#c08860] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 mt-[60px]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="mb-10">
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2 text-gray-500 hover:text-[#D4A574] transition-colors mb-4 group"
            >
              <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Cart</span>
            </button>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 border-l-4 border-[#D4A574] pl-6">
              Checkout
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Forms */}
            <div className="lg:col-span-8 space-y-8">
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">

                {/* 1. Contact Information */}
                <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-[#faefe5] flex items-center justify-center text-[#D4A574] font-bold text-lg">1</div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                      <FaUser className="text-gray-400" size={18} />
                      Contact Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all outline-none"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all outline-none"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all outline-none"
                          placeholder="+91 99999 99999"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2. Shipping Address */}
                <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-[#faefe5] flex items-center justify-center text-[#D4A574] font-bold text-lg">2</div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                      <FaMapMarkerAlt className="text-gray-400" size={18} />
                      Shipping Address
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all outline-none"
                        placeholder="House No, Street Name, Area"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all outline-none"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all outline-none appearance-none"
                        >
                          <option value="">Select State</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="West Bengal">West Bengal</option>
                          {/* Add more states as strictly needed or keep concise list */}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all outline-none"
                          placeholder="110001"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Payment Method */}
                <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-[#faefe5] flex items-center justify-center text-[#D4A574] font-bold text-lg">3</div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                      <FaCreditCard className="text-gray-400" size={18} />
                      Payment Method
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Online Payment Option */}
                    <div
                      className={`relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${formData.paymentMethod === 'Online'
                          ? 'border-[#D4A574] bg-[#faf6f3]'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'Online' }))}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'Online' ? 'border-[#D4A574]' : 'border-gray-400'}`}>
                            {formData.paymentMethod === 'Online' && <div className="w-2.5 h-2.5 rounded-full bg-[#D4A574]"></div>}
                          </div>
                          <span className="font-bold text-gray-800">Pay Online</span>
                        </div>
                        <MdPayment className="text-gray-500" size={24} />
                      </div>
                      <p className="mt-3 text-sm text-gray-500 pl-8">Cards, UPI, Net Banking, Wallet</p>
                    </div>

                    {/* COD Option */}
                    <div
                      className={`relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${formData.paymentMethod === 'COD'
                          ? 'border-[#D4A574] bg-[#faf6f3]'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'COD' }))}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'COD' ? 'border-[#D4A574]' : 'border-gray-400'}`}>
                            {formData.paymentMethod === 'COD' && <div className="w-2.5 h-2.5 rounded-full bg-[#D4A574]"></div>}
                          </div>
                          <span className="font-bold text-gray-800">Cash on Delivery</span>
                        </div>
                        <FaMoneyBillWave className="text-gray-500" size={24} />
                      </div>
                      <p className="mt-3 text-sm text-gray-500 pl-8">Pay with cash upon delivery</p>
                    </div>
                  </div>
                </section>

              </form>
            </div>

            {/* Right Column: Order Summary (Sticky) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-100">
                <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2 pb-4 border-b border-gray-100">
                  <FaShoppingBag className="text-[#D4A574]" />
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedScent}`} className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm truncate">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                        <div className="font-medium text-gray-900 mt-1">
                          ₹{(((item.isCustomization ? (item.price + (item.customizationFee || 100)) : item.price) || 0) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Breakdown */}
                <div className="space-y-3 pt-4 border-t border-gray-100 mb-6">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span className="flex items-center gap-1">Shipping <FaTruck size={12} className="text-gray-400" /></span>
                    <span className="font-semibold text-green-600">
                      {shipping === 0 ? "Free" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-[#D4A574]">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-[#D4A574] hover:bg-[#c08860] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      {formData.paymentMethod === 'COD' ? 'Place Order' : 'Pay Now'}
                      <FaCheckCircle />
                    </>
                  )}
                </button>

                {/* Trust Indicators */}
                <div className="mt-6 flex flex-col gap-3 text-center">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <FaShieldAlt className="text-green-500" />
                    <span>SSL Secure Payment</span>
                  </div>
                  <p className="text-[10px] text-gray-400">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderPage;
