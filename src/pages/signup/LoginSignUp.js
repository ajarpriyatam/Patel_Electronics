import React, { useCallback, useRef, useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaUnlock, FaUser } from "react-icons/fa6";
import { FaRegFaceGrin } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../layouts/Layout";
import LoginInputField from "../../component/common/LoginInputField";

import LoginBg from "../../assets/login_bg.png";
import LoginVideo from "../../assets/videos/14471387_1920_1080_30fps.mp4";

const LoginSignUp = () => {
  const navigate = useNavigate();

  const [existingUser, setExistingUser] = useState({
    loginId: "",
  });

  const validateFields = useCallback((user) => {
    if (!user.loginId) {
      return "Email/Mobile number is required";
    }
    return null;
  }, []);

  const loginSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const error = validateFields(existingUser);
      if (error) {
        toast.error(error);
        return;
      }

      try {
        // Temporary logic for "Continue" - likely to be replaced by OTP flow
        if (existingUser.loginId === "admin@gmail.com") {
          toast.success("Welcome back");
          navigate("/admin");
        } else {
          toast.success("Please verify OTP (Simulation)");
          // simulate moving to next step or logging in
          navigate("/");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [existingUser, validateFields, navigate]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loginSubmit(e);
    }
  };

  const handleExistingUserChange = (e) => {
    setExistingUser({
      ...existingUser,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">

          {/* Left Side - Image/Video */}
          <div className="LoginImageSide">
            <video
              src={LoginVideo}
              autoPlay
              loop
              muted
              playsInline
              className="login-video-bg"
            />
            <div className="image-overlay-center">
              <h1>Patel Gen Electronics</h1>
            </div>
            <div className="image-overlay-bottom">
              <p>Join our exclusive community based on elegance.</p>
            </div>
          </div>

          {/* Right Side - Forms */}
          <div className="LoginFormSide">
            <div className="form-content-wrapper">

              <div className="forms-container" style={{ marginTop: '0' }}>
                <form className="loginForm" onSubmit={loginSubmit} style={{ position: 'relative', transform: 'none' }}>

                  <div style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontFamily: 'Playfair Display', fontSize: '24px', marginBottom: '10px' }}>LOGIN</h2>
                    <p style={{ fontFamily: 'Outfit', color: '#888', fontSize: '14px' }}>Enter your details to proceed</p>
                  </div>

                  <LoginInputField
                    label="E-mail/Mobile"
                    placeholder="E-mail/Mobile"
                    onKeyDown={handleKeyDown}
                    id="loginId"
                    value={existingUser.loginId}
                    onChange={handleExistingUserChange}
                  />

                  <input type="submit" value="Continue" className="loginBtn" />

                  <div className="legal-text">
                    <span>By clicking through, I agree with the</span>
                    <br />
                    <span
                      className="link"
                      onClick={() => window.open("/terms-and-conditions", "_blank")}
                    >
                      Terms &amp; Conditions
                    </span>
                    <span> and </span>
                    <span
                      className="link"
                      onClick={() => window.open("/privacy-policy", "_blank")}
                    >
                      Privacy Policy
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};


export default LoginSignUp;
