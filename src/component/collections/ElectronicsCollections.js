import React from "react";
import { Link } from "react-router-dom";
import {
    CATEGORY_CONFIG,
    CATEGORIES
} from "../../constants/categories";

const ElectronicsCollections = () => {
    // Define collections to display
    const collections = [
        {
            id: 1,
            image: CATEGORY_CONFIG[CATEGORIES.LAPTOPS].image,
            name: CATEGORY_CONFIG[CATEGORIES.LAPTOPS].title,
            link: `/${CATEGORIES.LAPTOPS}/collection`,
        },
        {
            id: 2,
            image: CATEGORY_CONFIG[CATEGORIES.SMARTPHONES].image,
            name: CATEGORY_CONFIG[CATEGORIES.SMARTPHONES].title,
            link: `/${CATEGORIES.SMARTPHONES}/collection`,
        },
        {
            id: 3,
            image: CATEGORY_CONFIG[CATEGORIES.AUDIO].image,
            name: CATEGORY_CONFIG[CATEGORIES.AUDIO].title,
            link: `/${CATEGORIES.AUDIO}/collection`,
        },
        {
            id: 4,
            image: CATEGORY_CONFIG[CATEGORIES.ACCESSORIES].image,
            name: CATEGORY_CONFIG[CATEGORIES.ACCESSORIES].title,
            link: `/${CATEGORIES.ACCESSORIES}/collection`,
        },
    ];

    return (
        <div className="w-full bg-[#f8f9fa] py-20 px-4">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                        Our Collections
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl text-center">
                        Discover premium electronics for your modern lifestyle
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {collections.map((collection) => (
                        <Link
                            to={collection.link}
                            key={collection.id}
                            className="group block relative w-full h-[320px] overflow-hidden bg-gray-100"
                        >
                            {/* Background Image */}
                            <img
                                src={collection.image}
                                alt={collection.name}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-end pb-10">
                                <h3 className="text-white text-xl md:text-2xl font-bold mb-6 text-center px-4 tracking-wide shadow-black drop-shadow-md">
                                    {collection.name}
                                </h3>

                                <span className="inline-block px-8 py-2.5 border border-white text-white text-xs font-semibold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300">
                                    Explore
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ElectronicsCollections;
