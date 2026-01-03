import React from "react";
import Layout from "../layouts/Layout";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaMinus, FaPlus, FaShippingFast } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart, cartContext] = useCart();
  const { MINIMUM_ORDER_QUANTITY } = cartContext;
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) => {
      const perItemPrice = item.isCustomization ? (item.price + (item.customizationFee || 100)) : item.price;
      return total + perItemPrice * item.quantity;
    },
    0
  );
  const total = subtotal + 15;

  const updateQuantity = (id, selectedScent, newQuantity) => {
    if (newQuantity < MINIMUM_ORDER_QUANTITY) {
      toast.error(`Minimum order quantity is ${MINIMUM_ORDER_QUANTITY} units`);
      return;
    }

    setCart(
      cart.map((item) => {
        // Match by both ID and scent (if both have scents)
        const sameId = item.id === id;
        const sameScent = (item.selectedScent || '') === (selectedScent || '');
        return (sameId && sameScent) ? { ...item, quantity: newQuantity } : item;
      })
    );
  };

  const removeItem = (id, selectedScent) => {
    setCart(cart.filter((item) => {
      // Match by both ID and scent (if both have scents)
      const sameId = item.id === id;
      const sameScent = (item.selectedScent || '') === (selectedScent || '');
      return !(sameId && sameScent);
    }));
    toast.success("Item removed from cart");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-beige via-[#FFF8F3] to-beige py-8 mt-[100px]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 mt-8">
            <div className="flex items-center gap-3 mb-2">
              <FaShoppingCart className="text-[#D4A574] text-4xl" />
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#D4A574] to-[#C08860] bg-clip-text text-transparent">
                Shopping Cart
              </h1>
            </div>
            <p className="text-gray-600 text-lg ml-1">
              {cart.length > 0 ? `${cart.reduce((acc, item) => acc + item.quantity, 0)} ${cart.reduce((acc, item) => acc + item.quantity, 0) === 1 ? 'item' : 'items'} in your cart` : 'Your cart is waiting for Electronics Gadgets'}
            </p>
          </div>

          {/* Minimum Order Notice */}
          {cart.length > 0 && (
            <div className="mb-6 bg-gradient-to-r from-[#D4A574]/10 to-[#C08860]/10 border-2 border-[#D4A574]/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#D4A574]/20 rounded-full flex items-center justify-center">
                  <span className="text-[#D4A574] font-bold text-sm">!</span>
                </div>
                <div>
                  <h3 className="text-[#D4A574] font-semibold text-sm">Minimum Order Policy</h3>
                  <p className="text-gray-700 text-xs">
                    Each product requires a minimum order of {MINIMUM_ORDER_QUANTITY} units. This ensures wholesale pricing and efficient fulfillment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {cart.length === 0 ? (
            <div className="bg-beige rounded-2xl p-12 sm:p-16 shadow-2xl text-center border-2 border-gray-200">
              <div className="max-w-md mx-auto">
                <div className="mb-6 inline-block p-6 bg-[#D4A574]/10 rounded-full">
                  <FaShoppingCart className="text-6xl text-[#D4A574]" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Cart is Empty</h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Discover Electronics Gadgets and add your favorites to get started!
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="bg-gradient-to-r from-[#D4A574] to-[#C08860] text-beige py-4 px-8 rounded-xl hover:opacity-90 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-[#D4A574]/50 transform hover:scale-105"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3 space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-beige rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:border-[#D4A574]/50 transition-all duration-300 transform hover:scale-[1.02] relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Token ID Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-[#D4A574] text-beige font-bold text-xs px-3 py-1 rounded-br-lg rounded-tl-lg shadow-lg">
                        #{item.isCustomization ? item.tokenId + '*' : item.tokenId}
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="sm:w-1/3 lg:w-1/4">
                        <div className="relative group overflow-hidden rounded-xl bg-gray-100 aspect-square">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-beige/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="sm:w-2/3 lg:w-3/4 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center gap-3">
                                <h3 className="font-bold text-xl text-gray-800 mb-1 hover:text-[#D4A574] transition-colors cursor-pointer">
                                  {item.name}
                                </h3>
                                {item.isCustomization && (
                                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A574]/10 text-[#D4A574] text-xs font-semibold border border-[#D4A574]/20">
                                    Customized
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold bg-gradient-to-r from-[#D4A574] to-[#C08860] bg-clip-text text-transparent">
                                ₹{((item.isCustomization ? item.price + 100 : item.price) * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-gray-600 text-sm">₹{(item.isCustomization ? item.price + 100 : item.price).toFixed(2)} each</p>
                            </div>
                          </div>

                          {/* Scent Information */}
                          {item.selectedScent && (
                            <div className="flex flex-wrap gap-3 mb-4">
                              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                                <span className="text-gray-600 text-sm">Scent:</span>
                                <span className="text-gray-800 font-medium">
                                  {item.selectedScent}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Customization Display */}
                          {item.isCustomization && item.customizationMethod && (
                            <div className="mb-4">
                              <div className="bg-[#D4A574]/5 border border-[#D4A574]/20 rounded-lg p-3 text-sm text-gray-700">
                                <div className="font-medium text-[#D4A574] mb-1">Customization</div>
                                <div className="text-sm text-gray-800">{item.customizationMethod}</div>
                                <div className="text-xs text-gray-600 mt-2">Customization Fee: ₹{item.customizationFee || 100} per item</div>
                              </div>
                            </div>
                          )}

                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-600 text-sm">Quantity:</span>
                            <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden border-2 border-gray-200">
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedScent, item.quantity - 1)}
                                className={`px-4 py-2 text-gray-700 transition-colors duration-200 ${item.quantity > MINIMUM_ORDER_QUANTITY
                                  ? "hover:bg-[#D4A574] hover:text-beige"
                                  : "cursor-not-allowed opacity-50"
                                  }`}
                                disabled={item.quantity <= MINIMUM_ORDER_QUANTITY}
                              >
                                <FaMinus className="text-sm" />
                              </button>
                              <span className="px-6 py-2 text-gray-800 font-bold bg-beige">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedScent, item.quantity + 1)}
                                className="px-4 py-2 hover:bg-[#D4A574] hover:text-beige text-gray-700 transition-colors duration-200"
                              >
                                <FaPlus className="text-sm" />
                              </button>
                            </div>
                            <span className="text-xs text-[#D4A574] bg-[#D4A574]/10 px-2 py-1 rounded-full font-medium">
                              Min: {MINIMUM_ORDER_QUANTITY}
                            </span>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.selectedScent)}
                            className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                          >
                            <FaTrash />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping Button */}
                <button
                  onClick={() => navigate("/")}
                  className="w-full bg-beige hover:bg-gray-50 text-gray-800 py-4 rounded-xl transition-all duration-300 font-semibold border-2 border-gray-200 hover:border-[#D4A574]"
                >
                  ← Continue Shopping
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-beige rounded-2xl shadow-2xl p-6 sticky top-24 border-2 border-gray-200">
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#D4A574] to-[#C08860] bg-clip-text text-transparent">
                    Order Summary
                  </h2>

                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-2">
                        <MdLocalOffer className="text-[#D4A574]" />
                        Subtotal
                      </span>
                      <span className="font-semibold text-gray-800">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-2">
                        <FaShippingFast className="text-[#D4A574]" />
                        Convenience fee
                      </span>
                      <span className="font-semibold text-gray-800">₹{15}</span>
                    </div>
                    {/* <div className="flex justify-between text-gray-600">
                      <span>GST (8%)</span>
                      <span className="font-semibold text-gray-800">₹{gst.toFixed(2)}</span>
                    </div> */}

                    <div className="border-t-2 border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-800">Total</span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-[#D4A574] to-[#C08860] bg-clip-text text-transparent">
                          ₹{total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-gradient-to-r from-[#D4A574] to-[#C08860] text-beige rounded-xl py-4 font-bold text-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-[#D4A574]/50 transform hover:scale-105 mb-4"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
