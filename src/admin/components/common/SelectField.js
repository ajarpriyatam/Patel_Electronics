import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SelectField = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.value || null);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleClickOutside, true);
    };
  }, []);

  const handleToggle = (e) => {
    setIsOpen(!isOpen);
  };

  const onOptionClicked = (item) => () => {
    setSelectedOption(item.label);
    setIsOpen(false);
    props.onChange(props.id, item.value);
  };

  return (
    <div className="flex flex-col space-y-2" ref={selectRef}>
      <label className="block text-sm font-semibold text-black-300">
        {props.label}
      </label>
      <div className="relative">
        <div
          className={`w-full h-12 px-4 rounded-xl border focus:outline-none focus:ring-2 bg-beige/90 text-gray-800 cursor-pointer flex items-center justify-between transition-all duration-200 ${
            props.className || ""
          } ${
            isOpen
              ? "border-[#D4A574] focus:border-[#D4A574] focus:ring-[#D4A574]/20"
              : "border-gray-300 hover:border-[#D4A574]/50"
          }`}
          onClick={handleToggle}
        >
          <span className={`${selectedOption ? "text-gray-800" : "text-gray-500"}`}>
            {selectedOption || props.placeholder || "Select an option"}
          </span>
          <div className="flex items-center">
            {isOpen ? (
              <IoIosArrowUp className="text-[#D4A574] transition-transform duration-200" />
            ) : (
              <IoIosArrowDown className="text-gray-400 transition-transform duration-200" />
            )}
          </div>
        </div>

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-50 left-0 right-0 mt-1 w-full origin-top rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg border border-gray-200"
          >
            {props.items.map((item) => (
              <button
                type="button"
                onClick={onOptionClicked(item)}
                key={item.value}
                className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-[#D4A574]/10 hover:text-[#D4A574] focus:outline-none transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectField;
