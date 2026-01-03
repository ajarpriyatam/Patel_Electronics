import React, { useEffect, useState } from "react";
import Logo from "../component/common/Logo";
import { Drawer, ThemeProvider, createTheme } from "@mui/material";
import DrawerList from "./DrawerList";
import { HiOutlineBars2 } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";

const theme = createTheme();

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [, , cartContext] = useCart();
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
        <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2">
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
            <Link
              className="flex items-center cursor-pointer group"
              to='/all/collections'
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
              to='/sale'
            >
              <span
                className={`text-[18px] font-medium leading-[22.5px] transition-colors duration-300 ${activeNavItem === '/sale'
                  ? "text-[#D4A574]"
                  : isScrolled
                    ? "text-gray-700 group-hover:text-[#D4A574]"
                    : "text-gray-600 group-hover:text-[#D4A574]"
                  }`}
              >
                Sale
              </span>
            </Link>
          </ul>
        </div>

        {/* Cart Button on Right (All Screens) */}
        <div className="flex flex-row gap-5">
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
        <DrawerList activeNavItem={activeNavItem} />
      </Drawer>
    </ThemeProvider>
  );
};

export default Navbar;
