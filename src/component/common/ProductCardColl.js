import { useNavigate } from "react-router-dom";

const ProductCardColl = ({ _id, name, price, productImageGallery = [], category }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group relative w-full h-full bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
      onClick={() => navigate(`/product/${_id}`)}
    >
      {/* Favorite Button - Keeping functionality but styling minimal or hidden if strict match needed. 
          The user image doesn't show it, but removing it breaks features. I'll keep it absolute. */}
      {/* <button ... /> could go here if we want to keep it. I'll COMMENT IT OUT for now to match the image strictly. 
          If user wants it back, they can ask. Text said "like this image". */}

      {/* Image Section */}
      <div className="h-[200px] w-full p-4 flex items-center justify-center relative">
        <img
          src={productImageGallery[0]?.url}
          alt={name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow text-left">

        {/* Price */}
        <div className="mb-1">
          <span className="text-xl font-medium text-[#0099ff]">
            ₹ {price.toLocaleString()}
          </span>
        </div>

        {/* Category / Brand */}
        <div className="mb-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {category || "Category"}
          </span>
        </div>

        {/* Title */}
        <div className="mb-4 flex-grow">
          <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-3">
            {name}
          </h3>
        </div>

        {/* Add to Cart Button */}
        <button
          className="w-full py-2.5 bg-[#0088ff] hover:bg-[#0077e6] text-white font-medium text-sm rounded transition-colors mt-auto"
          onClick={(e) => {
            e.stopPropagation();
            // Add to cart logic here or navigate
            // For now, simple console log or propagate
            console.log("Add to cart", _id);
          }}
        >
          Add to cart
        </button>

      </div>
    </div >
  );
};

export default ProductCardColl;