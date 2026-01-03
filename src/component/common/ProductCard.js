import React, { useState } from "react";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ _id, name, price, originalPrice, productImageGallery = [], category, compact = false, flag }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="group relative w-full h-full bg-white rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${_id}`)}
    >

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        className="absolute right-3 top-3 z-40 bg-white/90 p-2 rounded-full shadow-md transition-transform duration-200 hover:scale-110 border border-gray-100 text-gray-400 hover:text-red-500"
      >
        {isFavorite ? (
          <FaHeart className="w-5 h-5 text-red-500" />
        ) : (
          <FaRegHeart className="w-5 h-5" />
        )}
      </button>

      {/* Image Section */}
      <div className="h-[120px] w-full overflow-hidden bg-white/50 relative p-2 flex items-center justify-center">
        <img
          src={productImageGallery[0]?.url}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="p-2 bg-white text-center">
        {/* Stars */}
        <div className="flex justify-center mb-2 gap-0.5">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="w-3 h-3 text-yellow-400" />
          ))}
        </div>

        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {name.length > 25 ? `${name.substring(0, 25)}...` : name}
          </h3>
        </div>

        <div className="flex items-center justify-center gap-2">
          <p className="text-lg font-bold text-gray-900">
            Rs. {price.toLocaleString()}
          </p>
          {originalPrice && (
            <p className="text-sm text-gray-400 line-through">
              Rs. {originalPrice.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div >
  );
};

export default ProductCard;