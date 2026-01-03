import React from "react";
import ProductCard from "../common/ProductCard";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const DynamicProductShowcase = ({
    title,
    products = [],
    bannerTitle,
    bannerSubtitle,
    bannerImage,
    bannerLink = "#",
    bannerColor = "bg-black"
}) => {
    if (!products || products.length === 0) return null;

    return (
        <section className="w-full py-12 px-[5%] bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 h-auto lg:h-[600px]">

                    {/* Left Side - Product Grid */}
                    <div className="w-full lg:w-1/3 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                            {/* Optional: Add View All link */}
                            <Link to="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium">
                                <IoIosArrowForward className="text-xl" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4 flex-1">
                            {products.slice(0, 4).map((product) => (
                                <div key={product._id} className="h-full">
                                    {/* 
                      Note: We are using the ProductCard with reduced height (compact mode).
                      The parent container height constraint might need adjustment if cards are too tall.
                   */}
                                    <ProductCard {...product} compact={true} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Big Banner */}
                    <div className="w-full lg:w-2/3 relative rounded-2xl overflow-hidden group">
                        <Link to={bannerLink} className="block w-full h-full">
                            <div className={`w-full h-full ${bannerColor} relative`}>
                                <img
                                    src={bannerImage}
                                    alt={bannerTitle}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Banner Overlay/Content */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                                    <h3 className="text-white text-3xl md:text-5xl font-bold mb-4 leading-tight">
                                        {bannerTitle}
                                    </h3>
                                    {bannerSubtitle && (
                                        <p className="text-gray-200 text-lg md:text-xl font-light mb-6 max-w-lg">
                                            {bannerSubtitle}
                                        </p>
                                    )}
                                    <span className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full w-fit hover:bg-gray-100 transition-colors">
                                        Shop Now
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DynamicProductShowcase;
