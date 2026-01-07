import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import ProductCardColl from "../component/common/ProductCardColl";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../actions/productAction";
import { getCategoryContent, normalizeCategory } from "../constants/categories";
import videoBg from "../assets/videos/6466100-uhd_3840_2160_30fps.mp4";

const Products = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { products, loading, error } = useSelector((state) => state.products)
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter products based on selected category
  console.log("azsxdcd selectedCategory", selectedCategory);
  const currentCategoryContent = getCategoryContent(category);

  useEffect(() => {
    const normalizedCategory = normalizeCategory(category);
    console.log("Original category:", category);
    console.log("Normalized category:", normalizedCategory);
    dispatch(getProduct(normalizedCategory));
  }, [dispatch, category]);

  // Update selectedCategory when URL changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(normalizeCategory(category));
    } else {
      setSelectedCategory("all");
    }
  }, [category]);
  return (
    <Layout>
      {/* Hero Video Section - 40% of screen height */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        {/* YouTube Background Video */}
        <div className="absolute inset-0 pointer-events-none">
          <video
            className="w-full h-full object-cover scale-150"
            src={videoBg}
            autoPlay
            loop
            muted
            playsInline
            style={{ pointerEvents: 'none' }}
          />
        </div>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg" style={{ color: "white" }}>{currentCategoryContent.title}</h1>
            <p className="text-lg md:text-xl opacity-90 drop-shadow-md">{currentCategoryContent.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="my-[20px] mx-auto w-[95%] md:w-[80%] gap-3 md:gap-6 h-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 bg-beige">

        <div className="mt-[60px] mb-[60px] col-span-full">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#D4A574] border-t-transparent rounded-full animate-spin"></div>
                <div className="text-[#D4A574] text-lg">Loading Gadgets...</div>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-[#BC2727] text-lg">Error: {error}</div>
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {products.map((product, index) => {
                console.log("Product data for ProductCard:", product);
                return <ProductCardColl key={product._id || index} {...product} />
              })}
            </div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-600 text-lg">No Gadgets found in this category</div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;