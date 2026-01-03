import React, { useEffect } from "react";
import Layout from "../layouts/Layout";
import ProductCard from "../component/common/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getNewArrivals } from "../actions/productAction";

const NewArrivals = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.newArrivals);



  useEffect(() => {
    dispatch(getNewArrivals());
  }, [dispatch]);

  return (
    <Layout>
      {/* Hero Image Section - 40% of screen height */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1652109/pexels-photo-1652109.jpeg"
          alt="Kavéra New Arrivals"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">New Arrivals</h1>
            <p className="text-lg md:text-xl opacity-90">Discover our latest Electronics Gadgets and home fragrances</p>
          </div>
        </div>
      </div>

      <div className="my-[20px] mx-auto w-[80%] gap-4 h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-beige">

        <div className="mt-[60px] mb-[60px] col-span-full">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#D4A574] border-t-transparent rounded-full animate-spin"></div>
                <div className="text-[#D4A574] text-lg">Loading new arrivals...</div>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-[#BC2727] text-lg">Error: {error}</div>
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product._id || index} {...product} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-600 text-lg">No new arrivals at the moment. Check back soon!</div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NewArrivals;