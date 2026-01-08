import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const LoginInputField = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative h-[55px] w-full group">
      {props.leading && (
        <div
          className="absolute top-1/2 transform -translate-y-1/2 text-[#999999] text-[18px] left-[16px] 
        w-6 h-6 flex items-center justify-center pointer-events-none transition-colors duration-300 group-focus-within:text-[#D4A574]"
        >
          {props.leading}
        </div>
      )}
      <input
        type={isPasswordVisible ? "text" : props.type}
        placeholder={props.placeholder}
        className="login-input h-full w-full outline-none placeholder:text-[#999999] placeholder:font-normal"
        onKeyDown={props.onKeyDown}
        style={{
          letterSpacing: "0.5px",
        }}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
      {props.type === "password" && (
        <div
          className="absolute right-[16px] top-1/2 transform -translate-y-1/2 cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors text-[#999999] hover:text-[#555555]"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <IoMdEye size={20} />
          ) : (
            <IoMdEyeOff size={20} />
          )}
        </div>
      )}
    </div>
  );
};

export default LoginInputField;
