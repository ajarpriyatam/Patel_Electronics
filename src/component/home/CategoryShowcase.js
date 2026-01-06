import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../common/ProductCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getProduct, getShowcaseProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";

const CategoryShowcase = ({ title, category, flag }) => {
    const dispatch = useDispatch();
    const [isPaused, setIsPaused] = useState(false);
    const scrollContainerRef = useRef(null);

    // Local state for products to avoid global store race conditions
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    // Auto-scroll functionality
    useEffect(() => {
        let intervalId;

        if (!isPaused && !loading && products.length > 0) {
            intervalId = setInterval(() => {
                if (scrollContainerRef.current) {
                    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

                    // Check if we've reached the end (approximate with a small buffer)
                    if (scrollLeft + clientWidth >= scrollWidth - 10) {
                        // Reset to start smoothly
                        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
                    } else {
                        // Scroll forward
                        scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
                    }
                }
            }, 3000); // Scroll every 3 seconds
        }

        return () => clearInterval(intervalId);
    }, [isPaused, loading, products.length]);


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Use the action directly but don't dispatch to store
                const result = await dispatch(getShowcaseProducts(category));
                if (result.success) {
                    setProducts(result.products || []);
                } else {
                    setError(result.error);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [dispatch, category]);

    if (loading) return null; // Or a skeleton loader
    if (products.length === 0) return null;
    console.log("CategoryShowcase products:", products);

    return (
        <section className="w-full py-5 px-[5%] bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header with lines */}
                <div className="flex items-center justify-center gap-4 mb-10">
                    <div className="h-[1px] bg-gray-200 flex-1 max-w-[200px]"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-wide text-center">
                        {title}
                    </h2>
                    <div className="h-[1px] bg-gray-200 flex-1 max-w-[200px]"></div>
                </div>

                {/* Product Carousel */}
                <div
                    className="relative group"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Navigation Arrows */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100"
                        aria-label="Scroll left"
                    >
                        <IoIosArrowBack className="text-gray-700 text-lg" />
                    </button>

                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100"
                        aria-label="Scroll right"
                    >
                        <IoIosArrowForward className="text-gray-700 text-lg" />
                    </button>

                    {/* Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto hide-scrollbar scroll-smooth pb-4 px-2"
                    >
                        {products.map((product) => (
                            <div key={product._id} className="min-w-[240px] md:min-w-[260px] h-[230px]">
                                <ProductCard {...product} compact={true} flag={flag} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
