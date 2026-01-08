import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../component/common/Logo";
import useCategory from "../hooks/useCategory";
import { CATEGORY_CONFIG } from "../constants/categories";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";

const DrawerList = ({ activeNavItem, onClose }) => {
  const location = useLocation();
  const categories = useCategory();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      onClose();
      setSearchQuery("");
    }
  };

  return (
    <div className="bg-beige w-[18rem] h-screen border-l border-gray-200 overflow-y-auto">
      <div className="flex justify-center items-center h-[73px] border-b border-gray-200 shrink-0">
        <Logo size="small" />
      </div>

      <div className="flex flex-col items-center justify-start h-full py-6 bg-beige">
        <ul className="flex flex-col items-center justify-center space-y-[20px] w-full px-6">
          {/* Mobile Search Bar */}
          <li className="w-full">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-white border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-[#D4A574]"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#D4A574]">
                <FaSearch />
              </button>
            </form>
          </li>

          <li>
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center cursor-pointer group"
            >
              <span
                className={`text-[18px] font-medium leading-[22.5px] transition-colors duration-300 ${location.pathname === "/"
                  ? "text-[#D4A574]"
                  : "text-gray-600 group-hover:text-[#D4A574]"
                  }`}
              >
                Home
              </span>
            </Link>
          </li>

          {/* Expandable Collections */}
          <li className="w-full flex flex-col items-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center cursor-pointer group gap-2 w-full"
            >
              <span
                className={`text-[18px] font-medium leading-[22.5px] transition-colors duration-300 ${location.pathname.includes('/collection')
                  ? "text-[#D4A574]"
                  : "text-gray-600 group-hover:text-[#D4A574]"
                  }`}
              >
                Collections
              </span>
              {isExpanded ? (
                <FaChevronUp className="text-gray-500 text-xs" />
              ) : (
                <FaChevronDown className="text-gray-500 text-xs" />
              )}
            </button>

            {/* Dropdown Content */}
            {isExpanded && (
              <div className="flex flex-col items-center w-full mt-4 space-y-3 bg-white/50 py-4 rounded-lg animate-in fade-in slide-in-from-top-1">
                <Link
                  to="/all/collection"
                  onClick={onClose}
                  className="text-[15px] font-medium text-gray-800 hover:text-[#D4A574]"
                >
                  All Collections
                </Link>
                {categories.map((category) => {
                  const categorySlug = typeof category === 'string' ? category : category.slug;
                  if (categorySlug === 'all') return null;
                  const displayLabel = CATEGORY_CONFIG[categorySlug]?.title || categorySlug;

                  return (
                    <Link
                      key={categorySlug}
                      to={`/${categorySlug}/collection`}
                      onClick={onClose}
                      className="text-[15px] text-gray-600 hover:text-[#D4A574]"
                    >
                      {displayLabel}
                    </Link>
                  );
                })}
              </div>
            )}
          </li>

          <li>
            <Link
              to="/new-arrival"
              onClick={onClose}
              className="flex items-center cursor-pointer group"
            >
              <span
                className={`text-[18px] font-medium leading-[22.5px] transition-colors duration-300 ${location.pathname === "/new-arrival"
                  ? "text-[#D4A574]"
                  : "text-gray-600 group-hover:text-[#D4A574]"
                  }`}
              >
                New Arrivals
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/aboutus"
              onClick={onClose}
              className="flex items-center cursor-pointer group"
            >
              <span
                className={`text-[18px] font-medium leading-[22.5px] transition-colors duration-300 ${location.pathname === "/aboutus"
                  ? "text-[#D4A574]"
                  : "text-gray-600 group-hover:text-[#D4A574]"
                  }`}
              >
                About Us
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/account"
              onClick={onClose}
              className="flex items-center cursor-pointer group"
            >
              <span
                className={`text-[18px] font-medium leading-[22.5px] transition-colors duration-300 ${location.pathname === "/account"
                  ? "text-[#D4A574]"
                  : "text-gray-600 group-hover:text-[#D4A574]"
                  }`}
              >
                Login / Account
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DrawerList;
