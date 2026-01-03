import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const BentoItem = ({
    title,
    subtitle,
    buttonText,
    image,
    link = "#",
    className = "",
    textColor = "text-gray-900",
    overlayColor = "from-black/50 via-transparent to-transparent" // Default gradient
}) => {
    return (
        <Link to={link} className={`relative block overflow-hidden rounded-3xl group ${className}`}>
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${overlayColor} transition-opacity duration-300`}></div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6 md:p-8 z-10">
                {subtitle && (
                    <span className={`text-sm md:text-base font-medium mb-2 ${textColor} opacity-90 uppercase tracking-wider`}>
                        {subtitle}
                    </span>
                )}
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${textColor} leading-tight max-w-[80%]`}>
                    {title}
                </h3>
                <div className={`inline-flex items-center gap-2 text-sm font-bold ${textColor} group-hover:underline decoration-2 underline-offset-4`}>
                    {buttonText || "Shop Now"}
                    <IoIosArrowForward />
                </div>
            </div>
        </Link>
    );
};

const BentoGrid = () => {
    return (
        <section className="w-full py-12 px-[5%] bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[600px]">

                {/* Left Column - Large Vertical Banner */}
                <BentoItem
                    title="Dare to Click"
                    subtitle="New Camera's"
                    buttonText="Shop Camera's"
                    image="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1000&auto=format&fit=crop"
                    link="/Cameras/collection"
                    className="h-[400px] lg:h-full"
                    textColor="text-white"
                    overlayColor="from-black/80 via-black/20 to-transparent"
                />

                {/* Right Column */}
                <div className="flex flex-col gap-6 h-full">

                    {/* Top Wide Banner */}
                    <BentoItem
                        title="With prices you love"
                        subtitle="From lenses"
                        buttonText="Shop Now"
                        image="https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=1000&auto=format&fit=crop"
                        link="/Accessories/collection"
                        className="flex-1 h-[250px]"
                        textColor="text-white"
                        overlayColor="from-black/70 via-black/10 to-transparent"
                    />

                    {/* Bottom Row - Split */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1 h-auto sm:h-[250px]">
                        <BentoItem
                            title="Steady shots, perfect price!"
                            subtitle="Shop tripod's"
                            buttonText="Shop Now"
                            image="https://images.unsplash.com/photo-1587575494201-11fe74d90d38?q=80&w=1000&auto=format&fit=crop"
                            link="/Accessories/collection"
                            className="h-[250px] sm:h-full"
                            textColor="text-white"
                            overlayColor="from-black/70 via-transparent to-transparent"
                        />

                        <BentoItem
                            title="Brighten your shots with ease!"
                            subtitle="Flash & Lighting"
                            buttonText="Shop Now"
                            image="https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=1000&auto=format&fit=crop"
                            link="/Accessories/collection"
                            className="h-[250px] sm:h-full"
                            textColor="text-white"
                            overlayColor="from-black/70 via-transparent to-transparent"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
