
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../actions/productAction";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { FaShoppingCart, FaShoppingBag, FaHeart, FaShareAlt, FaShieldAlt, FaUndo, FaTruck, FaCheckCircle, FaStar, FaMapMarkerAlt } from "react-icons/fa";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.slug;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const cartData = useCart();
  const { addToCart } = cartData[2];
  const { product, loading, error } = useSelector((state) => state.productDetails.product);

  // Use product from Redux state
  const displayProduct = product;

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Reset to first image and quantity when product changes
    setSelectedImageIndex(0);
    setQuantity(1);
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

    addToCart(cartItem);
    toast.success("Added to cart successfully!");
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



  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh] text-red-500">
          Error: {error}
        </div>
      </Layout>
    );
  }

  // Show message if product is empty
  if (!product || Object.keys(product).length === 0) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
          Product not found
        </div>
      </Layout>
    );
  }

  // Calculate discount if MRP exists (dummy logic or if originalPrice exists in real data)
  // Assuming product.price is selling price. We might need a fake MRP if not provided.
  const mrp = product.originalPrice || product.price * 1.2;
  const discount = Math.round(((mrp - product.price) / mrp) * 100);

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8 mt-[67px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <a href="/" className="hover:text-blue-600">Home</a>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <a href="/products" className="hover:text-blue-600">{product.category || "Electronics"}</a>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-800 font-medium truncate max-w-[200px]">{product.name}</li>
            </ol>
          </nav>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* LEFT: Image Gallery */}
              <div className="flex flex-col gap-4">
                {/* Main Image */}
                <div className="w-full aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center relative group">
                  <img
                    src={product.productImageGallery[selectedImageIndex]?.url || product.productImageGallery[selectedImageIndex]}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  {discount > 0 && (
                    <span className="absolute top-4 left-4 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                {product.productImageGallery && product.productImageGallery.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {product.productImageGallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 border-2 rounded-md overflow-hidden p-1 ${selectedImageIndex === idx ? "border-blue-500" : "border-gray-200 hover:border-blue-300"
                          }`}
                      >
                        <img
                          src={img?.url || img}
                          alt={`Thumbnail ${idx}`}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT: Product Info */}
              <div className="flex flex-col">

                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-orange-400 text-sm">
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  {/* <span className="text-sm text-gray-500">(No reviews yet)</span> */}
                </div>

                <h6 className="text-xl md:text-2xl font-semibold text-gray-800 leading-tight mb-2">
                  <span className="text-green-600 font-bold">NEW</span> | {product.name}
                </h6>

                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-600">Brand : </span>
                  <span className="text-sm font-bold text-gray-900 uppercase">{product.brand || "General"}</span>
                </div>

                <div className="py-2 my-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-3xl font-bold text-green-600">
                      ₹{product.price.toLocaleString()}.00
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>M.R.P : <span className="line-through">₹{mrp.toLocaleString()}.00</span></span>
                    <span className="bg-yellow-400 text-black px-2 py-0.5 text-xs font-bold rounded">{discount}% OFF</span>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-sm font-medium text-gray-600">Availability : </span>
                  <span className="text-sm font-bold text-green-600">In Stock</span>
                </div>

                {/* Delivery Check */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-bold text-gray-900">Delivery :</span>
                  <div className="flex items-center border-b border-gray-300 pb-1">
                    <FaMapMarkerAlt className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Pincode"
                      className="outline-none text-sm w-32 text-gray-700"
                    />
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Check</button>
                </div>

                {/* Customization & Quantity */}
                <div className="py-2 space-y-6">

                  {/* Quantity */}
                  <div className="flex items-start flex-col gap-2">
                    <span className="font-medium text-gray-700">Quantity</span>
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden w-32">
                      <button
                        onClick={decreaseQuantity}
                        className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 border-r border-gray-300 transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="w-12 text-center py-2 focus:outline-none text-gray-800"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                      />
                      <button
                        onClick={increaseQuantity}
                        className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 border-l border-gray-300 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-50 font-bold py-3 px-6 rounded transition-colors flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => navigate("/cart")} // Assuming Buy Now goes to cart or checkout
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-colors flex items-center justify-center gap-2"
                    >
                      <FaShoppingBag />
                      Buy Now
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Bottom Specifications Section */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6 md:p-8">

            {/* PRODUCT SPECIFICATIONS */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 uppercase">Product Specifications</h3>
              <div className="border rounded-sm overflow-hidden text-sm">

                {/* Static / Standard Fields */}
                <div className="flex border-b bg-gray-50">
                  <div className="w-1/3 p-3 font-semibold text-gray-700 border-r">Condition</div>
                  <div className="w-2/3 p-3 text-gray-800">New</div>
                </div>
                <div className="flex border-b">
                  <div className="w-1/3 p-3 font-semibold text-gray-700 border-r">Brand</div>
                  <div className="w-2/3 p-3 text-gray-800">{product.brand || product.category || "Generic"}</div>
                </div>

                {/* Dynamic Specifications */}
                {product.product_specifications && Object.entries(product.product_specifications).map(([key, value], index) => (
                  <div key={key} className={`flex border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                    <div className="w-1/3 p-3 font-semibold text-gray-700 border-r capitalize">{key.replace(/_/g, ' ')}</div>
                    <div className="w-2/3 p-3 text-gray-800">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 uppercase">PRODUCT DETAILS</h3>
              <div className="space-y-2 text-sm text-gray-700">
                {product.product_details ? (
                  product.product_details.split('\n').map((line, index) => (
                    line.trim() && (
                      <p key={index} className="flex items-start gap-2">
                        <FaCheckCircle className="mt-0.5 text-gray-800 flex-shrink-0" size={12} />
                        {line}
                      </p>
                    )
                  ))
                ) : (
                  <p className="text-gray-500 italic">No additional details available.</p>
                )}
              </div>
            </div>

            {/* PRODUCT DESCRIPTION */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 uppercase">PRODUCT DESCRIPTION</h3>
              <div className="space-y-2 text-sm text-gray-700 whitespace-pre-line">
                <p className="flex items-start gap-2">
                  {/* <FaCheckCircle className="mt-0.5 text-gray-800 flex-shrink-0" size={12} /> */}
                  {product.product_description || product.description || "No description available."}
                </p>
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
