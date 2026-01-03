import React from "react";
import {
    SiApple,
    SiSamsung,
    SiSony,
    SiDell,
    SiHp,
    SiXiaomi,
    SiOneplus,
    SiLg,
    SiAsus,
    SiLenovo
} from "react-icons/si";

const BrandShowcase = () => {
    const brands = [
        { name: "Apple", icon: SiApple },
        { name: "Samsung", icon: SiSamsung },
        { name: "Sony", icon: SiSony },
        { name: "Dell", icon: SiDell },
        { name: "HP", icon: SiHp },
        { name: "Xiaomi", icon: SiXiaomi },
        { name: "OnePlus", icon: SiOneplus },
        { name: "LG", icon: SiLg },
        { name: "Asus", icon: SiAsus },
        { name: "Lenovo", icon: SiLenovo },
    ];

    return (
        <section className="w-full py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Top Brands</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>

            <div className="relative w-full">
                <div className="flex gap-16 animate-scroll whitespace-nowrap py-4">
                    {/* First set of brands */}
                    {brands.map((brand, index) => (
                        <div key={`brand-1-${index}`} className="flex flex-col items-center justify-center min-w-[100px] group cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <brand.icon className="text-4xl md:text-5xl text-gray-800 mb-3" />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">{brand.name}</span>
                        </div>
                    ))}

                    {/* Duplicate set for continuous scrolling */}
                    {brands.map((brand, index) => (
                        <div key={`brand-2-${index}`} className="flex flex-col items-center justify-center min-w-[100px] group cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <brand.icon className="text-4xl md:text-5xl text-gray-800 mb-3" />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">{brand.name}</span>
                        </div>
                    ))}
                </div>

                {/* Gradient masks to fade out edges */}
                <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
            </div>


        </section>
    );
};

export default BrandShowcase;
