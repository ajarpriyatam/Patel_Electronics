import React, { useEffect, useState } from "react";
import Logo from "../component/common/Logo";
import { Drawer, ThemeProvider, createTheme } from "@mui/material";
import DrawerList from "./DrawerList";
import { HiOutlineBars2 } from "react-icons/hi2";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import useCategory from "../hooks/useCategory";
import { CATEGORY_CONFIG } from "../constants/categories";

const theme = createTheme();

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, , cartContext] = useCart();
  const categories = useCategory();
  const { cart } = cartContext;

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const updateActiveNav = () => {
      const currentPath = window.location.hash.replace("#", "") || "";
      setActiveNavItem(currentPath);

      if (currentPath === "") {
        window.history.replaceState(null, "", window.location.pathname);
      }
    };

    updateActiveNav();

    window.addEventListener("hashchange", updateActiveNav);
    return () => window.removeEventListener("hashchange", updateActiveNav);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div
        className={`flex fixed z-50 h-[67px] w-full justify-between items-center min-w-[100%] sm:max-w-[90%] mx-auto px-4 lg:px-[40px] ${isScrolled ? "border-b border-gray-200 bg-[#FDF9F5]/95 shadow-md" : "bg-[#FDF9F5]/90"
          } backdrop-blur-sm transition-all duration-300`}
      >
        {/* Mobile/Tablet: Menu Button on Left */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-[#D4A574] transition-colors duration-300 p-1">
            <HiOutlineBars2 className="h-[24px] w-[24px]" />
          </button>
        </div>

        {/* Desktop: Logo on Left */}
        <div className="hidden lg:block">
          <Logo />
        </div>

        {/* Mobile/Tablet: Logo in Center */}
        <div className={`lg:hidden absolute left-1/2 transform -translate-x-1/2 ${showSearch ? 'hidden' : ''}`}>
          <Logo />
        </div>

        {/* Desktop: Navigation Links */}
        <div className="hidden lg:flex">
          <ul className="flex justify-center space-x-[50px]">
            <Link
              className="flex items-center cursor-pointer group"
              to='/'
            >
              <span
                className={`text-[18px] font-medium leading-[22.5px] transition-colors duration-300 ${activeNavItem === '/'
                  ? "text-[#D4A574]"
                  : isScrolled
                    ? "text-gray-700 group-hover:text-[#D4A574]"
                    : "text-gray-600 group-hover:text-[#D4A574]"
                  }`}
              >
                Home
              </span>
            </Link>
            {/* Collections Dropdown */}
            <div className="relative group flex items-center h-full">
              <Link
                className="flex items-center cursor-pointer"
                to='/all/collection'
              >
                <span
                  className={`text-[18px] font-medium leading-[22.5px] transition-colors duration-300 ${activeNavItem === '/all/collections'
                    ? "text-[#D4A574]"
                    : isScrolled
                      ? "text-gray-700 group-hover:text-[#D4A574]"
                      : "text-gray-600 group-hover:text-[#D4A574]"
                    }`}
                >
                  Collections
                </span>
              </Link>

              {/* Dropdown Menu */}
              <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 hidden group-hover:block w-[220px] pt-4 z-[999]">
                <div className="bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-xl border border-gray-100 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="flex flex-col">
                    {categories.map((category) => {
                      const categorySlug = typeof category === 'string' ? category : category.slug;
                      const displayLabel = CATEGORY_CONFIG[categorySlug]?.title || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/_/g, " ");

                      if (categorySlug === 'all') return null; // Skip 'all' as it's the main link

                      return (
                        <Link
                          key={categorySlug}
                          to={`/${categorySlug}/collection`}
                          className="px-5 py-3 text-sm font-medium text-gray-600 hover:text-[#D4A574] hover:bg-[#FDF9F5] transition-colors text-left flex items-center justify-between group/item"
                        >
                          {displayLabel}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <Link
              className="flex items-center cursor-pointer group"
              to='/new-arrival'
            >
              <span
                className={`text-[18px] font-medium leading-[22.5px] transition-colors duration-300 ${activeNavItem === '/new-arrival'
                  ? "text-[#D4A574]"
                  : isScrolled
                    ? "text-gray-700 group-hover:text-[#D4A574]"
                    : "text-gray-600 group-hover:text-[#D4A574]"
                  }`}
              >
                New Arrivals
              </span>
            </Link>
            <Link
              className="flex items-center cursor-pointer group"
              to='/aboutus'
            >
              <span
                className={`text-[18px] font-medium leading-[22.5px] transition-colors duration-300 ${activeNavItem === '/aboutus'
                  ? "text-[#D4A574]"
                  : isScrolled
                    ? "text-gray-700 group-hover:text-[#D4A574]"
                    : "text-gray-600 group-hover:text-[#D4A574]"
                  }`}
              >
                About Us
              </span>
            </Link>
          </ul>
        </div>

        {/* Search and Cart Button on Right (All Screens) */}
        <div className="flex flex-row gap-5 items-center">
          {/* Search Bar */}
          <div className="flex items-center relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                  setShowSearch(false);
                  setSearchQuery("");
                }
              }}
              className={`flex items-center transition-all duration-300 ${showSearch ? 'w-[140px] sm:w-[200px] opacity-100 mr-2' : 'w-0 opacity-0 overflow-hidden'}`}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent border-b border-gray-600 focus:border-[#D4A574] text-gray-700 placeholder-gray-500 focus:outline-none text-sm pb-1"
                autoFocus={showSearch}
              />
            </form>
            <button
              onClick={() => {
                if (showSearch && searchQuery.trim()) {
                  navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                  setShowSearch(false);
                  setSearchQuery("");
                } else {
                  setShowSearch(!showSearch);
                }
              }}
              className="p-1 text-gray-700 hover:text-[#D4A574] transition-colors duration-300"
            >
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
          <Link to={"/account"} className="p-1 text-gray-700 hover:text-[#D4A574] transition-colors duration-300">
            <FaUser className="h-5 w-5" />
          </Link>
          <Link to={"/cart"} className="relative p-1 text-gray-700 hover:text-[#D4A574] transition-colors duration-300">
            <FaShoppingCart className="h-6 w-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C08860] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        className="lg:hidden"
        PaperProps={{
          sx: {
            backgroundColor: '#ffffff',
            color: '#333333'
          }
        }}
      >
        <DrawerList activeNavItem={activeNavItem} onClose={toggleDrawer(false)} />
      </Drawer>
    </ThemeProvider>
  );
};

export default Navbar;
