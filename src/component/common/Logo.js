import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ className, size = "default" }) => {
  const sizeClasses = {
    small: "text-lg",
    default: "text-2xl",
    large: "text-4xl"
  };

  return (
    <div className={`relative ${className || ''}`}>
      <Link
        to="/"
        className="group flex items-center hover:opacity-80 transition-all duration-300"
      >
        <span className={`${sizeClasses[size]} font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 drop-shadow-sm`}>
          Patel Gen Electronics
        </span>
      </Link>
    </div>
  );
};

export default Logo;
