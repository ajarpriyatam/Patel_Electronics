import React from "react";
import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";
import { FaTruck, FaHeadset, FaShieldAlt, FaUndo } from "react-icons/fa";
import videoBg from "../assets/videos/3130284-uhd_3840_2160_30fps.mp4";

const AboutUs = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <video
                    className="w-full h-full object-cover"
                    src={videoBg}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white max-w-4xl mx-auto px-6">
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6" style={{ color: "white" }}>
                            Empowering Your Digital Lifestyle
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
                            At Patel Electronics, we bring you the latest in technology with a commitment to quality and service.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-serif font-bold text-gray-900">
                            Our Story
                        </h2>
                        <div className="w-20 h-1 bg-[#D4A574]"></div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Founded with a passion for innovation, Patel Electronics has grown from a small local shop to a premier destination for consumer electronics. We believe that technology should be accessible, reliable, and enhance your daily life.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our carefully curated selection features top brands in smartphones, computing, audio, and gaming. We don't just sell products; we provide solutions that help you stay connected, productive, and entertained.
                        </p>
                    </div>
                    <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop"
                            alt="Our Store"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Why Choose Us Grid */}
            <div className="py-20 px-6 bg-[#FDF9F5]">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We strive to offer the best shopping experience possible, backed by our commitment to customer satisfaction.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: <FaShieldAlt className="w-10 h-10" />,
                            title: "Quality Guarantee",
                            description: "All our products are 100% genuine and sourced directly from manufacturers."
                        },
                        {
                            icon: <FaTruck className="w-10 h-10" />,
                            title: "Fast Delivery",
                            description: "We ensure your gadgets reach you safely and on time."
                        },
                        {
                            icon: <FaHeadset className="w-10 h-10" />,
                            title: "Expert Support",
                            description: "Our tech experts are here to help you choose the right device."
                        },
                        {
                            icon: <FaUndo className="w-10 h-10" />,
                            title: "Easy Returns",
                            description: "Hassle-free return policy for peace of mind monitoring."
                        }
                    ].map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
                            <div className="w-20 h-20 mx-auto bg-[#FDF9F5] rounded-full flex items-center justify-center text-[#D4A574] mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter/CTA Section */}
            <div className="py-20 px-6 bg-white">
                <div className="max-w-5xl mx-auto bg-[#2A2A2A] rounded-2xl p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated with Latest Tech</h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Subscribe to our newsletter for exclusive offers, new arrivals, and tech news.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <Link to="/new-arrival" className="bg-[#D4A574] hover:bg-[#C08860] text-white px-8 py-3 rounded-full font-bold transition-colors">
                                Shop New Arrivals
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AboutUs;
