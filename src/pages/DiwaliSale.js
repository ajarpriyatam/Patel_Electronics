import React, { useEffect } from "react";
import Layout from "../layouts/Layout";
import ProductCard from "../component/common/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../actions/productAction";

const DiwaliSale = () => {
  const dispatch = useDispatch();
  const { products: allProducts, loading, error } = useSelector((state) => state.products);

  // Filter products for Diwali sale
  const diwaliProducts = allProducts ? allProducts.filter((product) => {
    // Filter products that have Diwali-related tags or are on sale
    return product.tag === "diwali" || product.isDiwali === true || product.originalPrice > product.price;
  }) : [];

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Layout>
      {/* Diwali Sale Banner - 75vh */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/1652109/pexels-photo-1652109.jpeg"
          alt="Kavéra Diwali Sale"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-[#D4A574] to-[#C08860] text-white px-6 py-2 rounded-full text-lg font-bold mb-4 shadow-lg">
                🪔 DIWALI SPECIAL OFFER 🪔
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-[#D4A574] via-[#C08860] to-[#D4A574] bg-clip-text text-transparent">
              Festival of Lights Sale
            </h1>
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              Illuminate your home with our premium candles and fragrances
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-gradient-to-r from-[#D4A574] to-[#C08860] text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg">
                Up to 50% OFF
              </div>
              {/* <div className="text-[#D4A574] text-lg font-medium">
                Free shipping on orders above ₹999
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Diwali Products Section */}
      <div className="my-[20px] mx-auto w-[80%] gap-4 h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-beige">
        <div className="mt-[30px] mb-[60px] col-span-full">
           {loading ? (
             <div className="flex justify-center items-center py-20">
               <div className="flex flex-col items-center gap-4">
                 <div className="w-12 h-12 border-4 border-[#D4A574] border-t-transparent rounded-full animate-spin"></div>
                 <div className="text-[#D4A574] text-lg">Loading Diwali offers...</div>
               </div>
             </div>
           ) : error ? (
             <div className="flex justify-center items-center py-20">
               <div className="text-red-500 text-lg">Error: {error}</div>
             </div>
           ) : diwaliProducts && diwaliProducts.length > 0 ? (
             <div className="space-y-8">
               <div className="text-center">
                 <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#000000] mb-4">
                   🪔 Diwali Collection 🪔
                 </h2>
                 <p className="text-lg text-[#D4A574]">
                   Special candles and fragrances for the festival of lights
                 </p>
               </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {diwaliProducts.map((product, index) => (
                  <ProductCard key={product._id || index} {...product} />
                ))}
              </div>
            </div>
           ) : (
             <div className="flex justify-center items-center py-20">
               <div className="text-center">
                 <div className="text-6xl mb-4">🪔</div>
                 <div className="text-[#D4A574] text-lg">Diwali special offers coming soon!</div>
                 <div className="text-[#C08860] text-sm mt-2">Check back for amazing deals</div>
               </div>
             </div>
           )}
        </div>
      </div>
    </Layout>
  );
};

export default DiwaliSale;
