import React, { useState, useEffect, useRef } from "react";

// Video URLs for the slider
// Moved outside component to prevent re-creation on renders
import circuitBoardVideo from "../assets/videos/0_Circuit_Board_Technology_3840x2160.mp4";
import mobilePhoneVideo from "../assets/videos/0_Mobile_Phone_Smartphone_3840x2160.mov";
import keyboardLaptopVideo from "../assets/videos/6036378_Keyboard_Laptop_3840x2160.mp4";

const sliderVideos = [
  circuitBoardVideo, // Circuit board close up
  mobilePhoneVideo, // Mobile Phone / Smartphone
  keyboardLaptopVideo, // Keyboard Laptop / Coding
];

const MainSection = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef([]);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === sliderVideos.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Change video every 6 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle video playback when index changes
  useEffect(() => {
    // Play the current video
    if (videoRefs.current[currentVideoIndex]) {
      const playPromise = videoRefs.current[currentVideoIndex].play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Auto-play was prevented:", error);
        });
      }
    }

    // Optional: Pause others to save resources, but keep them ready for smooth transition
    sliderVideos.forEach((_, index) => {
      if (index !== currentVideoIndex && videoRefs.current[index]) {
        // We can pause them, but for cross-fade to look good, 
        // it might be better to let them run or pause after transition.
        // For simplicity and performance, we'll just ensure the active one is playing.
      }
    });
  }, [currentVideoIndex]);

  return (
    <section
      id="home"
      className="w-full min-h-[100vh] flex flex-col justify-center items-center bg-gray-900 relative overflow-hidden pt-20"
    >
      {/* Background Video Slider */}
      <div className="absolute inset-0 overflow-hidden">
        {sliderVideos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentVideoIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
          >
            <video
              ref={el => videoRefs.current[index] = el}
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src={video} type="video/mp4" />
            </video>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-purple-900/30 pointer-events-none z-10" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-[5%] relative z-20">
        <div className="flex flex-col items-center backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/10 bg-black/20">

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-2xl mb-6 text-center tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200">
            Patel Gen Electronics
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 text-center mb-8 max-w-3xl font-light tracking-wide shadow-black drop-shadow-md">
            Upgrade your life with premium gadgets and smart devices
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a
              href="#collection"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              Shop Now
            </a>
            <a
              href="#featured"
              className="px-8 py-4 border-2 border-white/80 text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              View Collections
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 text-center w-full max-w-2xl border-t border-white/20 pt-8">
            <div className="flex flex-col items-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-400">1000+</p>
              <p className="text-sm md:text-base text-gray-400">Products</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-400">Latest</p>
              <p className="text-sm md:text-base text-gray-400">Tech</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-400">24/7</p>
              <p className="text-sm md:text-base text-gray-400">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {sliderVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideoIndex(index)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${index === currentVideoIndex
              ? 'bg-blue-500 box-shadow-[0_0_10px_rgba(59,130,246,0.8)]'
              : 'bg-white/30 hover:bg-white/50'
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default MainSection;
