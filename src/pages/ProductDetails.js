import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../actions/productAction";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.slug;
  const [selectedScent, setSelectedScent] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isCustomization, setIsCustomization] = useState(false);
  const [customizationMethod, setCustomizationMethod] = useState("");
  const cartData = useCart();
  const { addToCart } = cartData[2];
  const { product, loading, error } = useSelector((state) => state.productDetails.product);
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  console.log("azsxdcd product details",product)

  // Set default scent when product loads
  useEffect(() => {
    if (product?.scent && product.scent.length > 0) {
      setSelectedScent(product.scent[0]);
      setSelectedImageIndex(0); // Reset to first image when product changes
    }
    setQuantity(1); // Reset quantity when product changes
    // Product data loaded successfully
  }, [product]);


  const handleAddToCart = () => {
    // Create base cart item with essential information
    const cartItem = {
      id: product._id, // Single ID for the entire product
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity, // Selected quantity
      image: product.productImageGallery[selectedImageIndex]?.url || product.productImageGallery[selectedImageIndex],
      tokenId: product.tokenId,

    };

    // Add scent information only if scent are available
    if (product?.scent && product.scent.length > 0) {
      cartItem.scent = product.scent; // All available scent
      cartItem.selectedScent = selectedScent; // Selected scent
    }

    // Add customization information if customization is enabled
    if (isCustomization && customizationMethod.trim()) {
      cartItem.isCustomization = true;
      cartItem.customizationMethod = customizationMethod;
      cartItem.id = cartItem.id + "-custom"
    }

    addToCart(cartItem);
    toast.success("Added to cart successfully!");
  };

  // Function to handle scent selection and update image
  const handlescentelection = (scent) => {
    setSelectedScent(scent);
    
    // Find the index of the selected scent and update image accordingly
    if (product?.scent) {
      const scentIndex = product.scent.indexOf(scent);
      if (scentIndex !== -1) {
        setSelectedImageIndex(scentIndex);
      }
    }
  };

  // Quantity control functions
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  const ScentButton = ({ scent }) => {
    return (
      <button
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border-2 ${
          selectedScent === scent
            ? "bg-[#D4A574] text-beige border-[#D4A574] shadow-lg shadow-[#D4A574]/30"
            : "bg-beige text-gray-700 border-gray-300 hover:border-[#D4A574]/50 hover:bg-gray-50"
        }`}
        onClick={() => handlescentelection(scent)}
      >
        {scent}
      </button>
    );
  };

  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="w-full py-16 bg-beige mt-[25px] md:mt-[67px]">
          <div className="max-w-7xl mx-auto px-[5%]">
            <div className="flex items-center justify-center h-64">
              <div className="text-[#D4A574] text-xl">Loading product details...</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error) {
    return (
      <Layout>
        <div className="w-full py-16 bg-beige mt-[25px] md:mt-[67px]">
          <div className="max-w-7xl mx-auto px-[5%]">
            <div className="flex items-center justify-center h-64">
              <div className="text-red-500 text-xl">Error: {error}</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Show message if product is empty
  if (!product || Object.keys(product).length === 0) {
    return (
      <Layout>
        <div className="w-full py-16 bg-beige mt-[25px] md:mt-[67px]">
          <div className="max-w-7xl mx-auto px-[5%]">
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-600 text-xl">Product not found</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full py-16 bg-beige mt-[25px] md:mt-[67px]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Images Section - Desktop: full images, Mobile/Tablet: only main image */}
          <div className="xl:w-1/2 xl:order-1 order-1">
            {/* Product Images Display */}
            {product.productImageGallery && product.productImageGallery.length > 0 ? (
              <div className="space-y-4">
                {/* Main Image - Changes based on selected scent */}
                <div className="bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden">
                  <div className="aspect-square w-full">
                    <img
                      src={product.productImageGallery[selectedImageIndex]?.url || product.productImageGallery[selectedImageIndex]}
                      alt={`${product.name} ${selectedScent}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div style={{display: 'none'}} className="text-center text-gray-500 p-4">
                      <p>Main image failed to load</p>
                      <p className="text-xs">URL: {product.productImageGallery[selectedImageIndex]?.url || product.productImageGallery[selectedImageIndex]}</p>
                    </div>
                  </div>
                </div>

                {/* Remaining Images - Desktop: 2 Column Grid, Mobile/Tablet: Hidden (shown at bottom) */}
                <div className="hidden xl:block">
                  {product.productImageGallery.length > 1 && (
                    <div className="grid grid-cols-2 gap-4">
                      {product.productImageGallery
                        .filter((_, index) => index !== selectedImageIndex)
                        .map((img, index) => {
                          const originalIndex = product.productImageGallery.findIndex(item => item === img);
                          const scentName = product.scent[originalIndex] || `Image ${originalIndex + 1}`;
                          return (
                            <div key={originalIndex} className="bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden">
                              <div className="aspect-square w-full">
                                <img
                                  src={img.url || img}
                                  alt={`${product.name} ${scentName}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                  }}
                                />
                                <div style={{display: 'none'}} className="text-center text-gray-500 p-2">
                                  <p>Image failed to load</p>
                                  <p className="text-xs">URL: {img.url || img}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl border-2 border-gray-200 text-center">
                <p className="text-gray-600">No images available for this product</p>
                <p className="text-xs text-gray-400 mt-2">productImageGallery: {JSON.stringify(product.productImageGallery)}</p>
              </div>
            )}
          </div>

          {/* Product Details Section - Order 2 on mobile, 2 on desktop */}
          <div className="xl:w-1/2 px-4 sm:px-0 xl:order-2 order-2">
            {/* Product Title and Price */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-[#D4A574] text-2xl sm:text-3xl font-bold">
                  Rs. {product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  Inclusive of all taxes
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Shipping calculated at checkout.
              </p>
            </div>

            {/* Scent Selection */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-900 mb-3 text-left">Scent</h5>
              <div className="flex flex-wrap gap-2">
                {product.scent && product.scent.map((scent) => (
                  <ScentButton key={scent} scent={scent} />
                ))}
              </div>
              {selectedScent && (
                <p className="text-xs text-gray-600 mt-2">
                  Selected: {selectedScent}
                </p>
              )}
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-900 mb-3 text-left">Quantity</h5>
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-[#D4A574] hover:bg-[#D4A574]/10 transition-all duration-300"
                  disabled={quantity <= 1}
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 h-10 text-center border-2 border-gray-300 rounded-lg focus:border-[#D4A574] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min="1"
                  max="99"
                />
                
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-[#D4A574] hover:bg-[#D4A574]/10 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Total: Rs. {((isCustomization ? product.price + 100: product.price)* quantity).toFixed(2)}
              </p>
            </div>

            {/* Customization Checkbox */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCustomization}
                  onChange={(e) => {
                    setIsCustomization(e.target.checked);
                    if (!e.target.checked) {
                      setCustomizationMethod("");
                    }
                  }}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-[#D4A574] focus:ring-2 focus:ring-[#D4A574] cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-900">Add Customization</span>
              </label>
            </div>

            {/* Customization Input Field - Appears when checkbox is marked */}
            {isCustomization && (
              <div className="mb-6 p-4 bg-[#D4A574]/10 border-2 border-[#D4A574]/30 rounded-lg">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Customization Method
                </label>
                <textarea
                  value={customizationMethod}
                  onChange={(e) => setCustomizationMethod(e.target.value)}
                  placeholder="Enter your customization method or requirements (e.g.,scent, engraving, packaging style, color preference, etc.)"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#D4A574] focus:outline-none resize-none"
                  rows="4"
                />
                <p className="text-xs text-gray-600 mt-2">
                  - Please describe how you'd like to customize this product
                </p>
                <div className="mt-2">
                  <p className="text-xs text-gray-600">
                    - Rs. 100 extra will be added for customization.
                  </p>
                  <div className="inline-flex items-center gap-3 mt-1">
                    <span className="text-sm font-medium text-gray-700">Now total price per item:</span>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#D4A574]/10 border border-[#D4A574]/20">
                      <span className="text-sm font-semibold text-[#D4A574]">Rs. </span>
                      <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D4A574] to-[#C08860]">{(product.price + 100).toFixed(2)}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 mt-14">
              <button 
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 border-2 border-[#D4A574] text-[#D4A574] hover:bg-[#D4A574] hover:text-black transition-all duration-300 rounded-lg font-medium"
              >
                ADD TO CART
              </button>
              {/* <button
                onClick={() => navigate("/checkout")}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-[#D4A574] to-[#C08860] text-beige hover:opacity-90 transition-all duration-300 rounded-lg font-medium"
              >
                BUY NOW
              </button> */}
            </div>

            {/* Security Badge */}
            <div className="flex justify-center sm:justify-start mb-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#D4A574]/20 rounded-full flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#D4A574]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Secure Payment</span>
              </div>
            </div>

            {/* Product Description */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3 text-left">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Remaining Images - Mobile/Tablet only (shown in column after description) */}
            <div className="xl:hidden">
              {product.productImageGallery && product.productImageGallery.length > 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3 text-left">More Images</h3>
                  <div className="flex flex-col gap-0">
                    {product.productImageGallery
                      .filter((_, index) => index !== selectedImageIndex)
                      .map((img, index) => {
                        const originalIndex = product.productImageGallery.findIndex(item => item === img);
                        const scentName = product.scent[originalIndex] || `Image ${originalIndex + 1}`;
                        return (
                          <div key={originalIndex} className="bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden">
                            <div className="aspect-square w-full">
                              <img
                                src={img.url || img}
                                alt={`${product.name} ${scentName}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'block';
                                }}
                              />
                              <div style={{display: 'none'}} className="text-center text-gray-500 p-2">
                                <p>Image failed to load</p>
                                <p className="text-xs">URL: {img.url || img}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
        </div>
      </div>
    </Layout>
  );

  // ...existing code...
};

export default ProductDetails;
