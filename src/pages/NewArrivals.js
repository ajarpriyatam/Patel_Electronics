import React, { useEffect } from "react";
import Layout from "../layouts/Layout";
import ProductCard from "../component/common/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getNewArrivals } from "../actions/productAction";
import videoBg from "../assets/videos/11041433-hd_1920_1080_30fps.mp4";
import { FaBoxOpen, FaExclamationCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
// Removed duplicate CSS imports as they are in index.js

// Custom Arrow Components for Slick Slider
const NextArrow = ({ onClick, style, className }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white shadow-lg rounded-full text-gray-800 hover:bg-[#D4A574] hover:text-white transition-all duration-300 -mr-4 md:-mr-6"
    style={{ ...style, display: "flex" }}
    aria-label="Next"
  >
    <FaChevronRight size={16} />
  </button>
);

const PrevArrow = ({ onClick, style, className }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white shadow-lg rounded-full text-gray-800 hover:bg-[#D4A574] hover:text-white transition-all duration-300 -ml-4 md:-ml-6"
    style={{ ...style, display: "flex" }}
    aria-label="Previous"
  >
    <FaChevronLeft size={16} />
  </button>
);

// Helper component to handle per-category slider logic
const CategorySlider = ({ products }) => {
  const productCount = products?.length || 0;

  // Disable infinite scroll if we don't have enough items to fill the view
  // or if we have very few items, to avoid cloning issues if CSS fails slightly.
  const settings = {
    dots: false,
    infinite: productCount > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: productCount > 4, // Only autoplay if we have enough items
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          infinite: productCount > 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: productCount > 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          infinite: productCount > 2,
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <div key={product._id} className="px-3 py-2 h-full">
          <ProductCard {...product} />
        </div>
      ))}
    </Slider>
  );
};

const NewArrivals = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.newArrivals);

  useEffect(() => {
    dispatch(getNewArrivals());
  }, [dispatch]);

  return (
    <Layout>
      {/* Hero Video Section */}
      <div className="relative h-[40vh] w-full overflow-hidden mt-[67px]">
        <div className="absolute inset-0 pointer-events-none">
          <video
            className="w-full h-full object-cover"
            src={videoBg}
            autoPlay
            loop
            muted
            playsInline
            style={{ pointerEvents: 'none' }}
          />
        </div>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-light mb-4 drop-shadow-xl tracking-wider text-white" style={{ color: 'white' }}>New Arrivals</h1>
            <p className="text-lg md:text-xl font-light tracking-wider text-gray-100 drop-shadow-md">Discover our latest Electronics Gadgets</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Just Dropped</h2>
            <div className="h-1 w-20 bg-[#D4A574] mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Explore the freshest additions to our collection. From latest Mobiles to Cameras, be the first to own our newest products.
            </p>
          </div>

          {/* Categories & Sliders */}
          <div className="min-h-[400px] space-y-16">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64 gap-4">
                <div className="w-12 h-12 border-4 border-[#D4A574] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium animate-pulse">Loading amazing products...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col justify-center items-center h-64 gap-4 text-red-500 bg-red-50 rounded-xl p-8 border border-red-100 max-w-lg mx-auto">
                <FaExclamationCircle size={40} />
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-1">Oops! Something went wrong</h3>
                  <p className="text-sm opacity-80">{error}</p>
                </div>
                <button
                  onClick={() => dispatch(getNewArrivals())}
                  className="px-6 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full text-sm font-semibold transition-colors mt-2"
                >
                  Try Again
                </button>
              </div>
            ) : products && products.length > 0 ? (
              products.map((categoryGroup, index) => (
                <div key={index} className="space-y-6">
                  {/* Category Title with Line */}
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wide border-l-4 border-[#D4A574] pl-4">
                      {categoryGroup.category}
                    </h3>
                    <div className="h-[1px] bg-gray-200 flex-1"></div>
                  </div>

                  {/* Slider Container */}
                  <div className="px-4">
                    {categoryGroup.products && categoryGroup.products.length > 0 ? (
                      <CategorySlider products={categoryGroup.products} />
                    ) : (
                      <div className="text-gray-500 italic ml-4">No products in this category yet.</div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center h-64 gap-4 text-gray-400">
                <div className="bg-gray-100 p-6 rounded-full">
                  <FaBoxOpen size={40} />
                </div>
                <p className="text-lg font-medium">No new arrivals found</p>
                <p className="text-sm">Check back quickly for updates!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewArrivals;