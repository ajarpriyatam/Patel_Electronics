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
  const [step, setStep] = useState(1);

  const [existingUser, setExistingUser] = useState({
    loginId: "",
  });

  const [newUser, setNewUser] = useState({
    name: "",
    gender: "",
    inviteCode: "",
  });

  const [otp, setOtp] = useState("");

  const verifyOtp = useCallback(() => {
    // Simulate OTP verification
    if (otp.length === 0) {
      toast.error("Please enter Valid OTP");
      return;
    }
    toast.success("Login Successful");
    navigate("/");
  }, [otp, navigate]);

  const validateFields = useCallback((user) => {
    if (!user.loginId) {
      return "Email/Mobile number is required";
    }
    return null;
  }, []);

  const handleContinue = useCallback(
    (e) => {
      e.preventDefault();
      const error = validateFields(existingUser);
      if (error) {
        toast.error(error);
        return;
      }
      // If validation passes, move to step 2
      setStep(2);
      // Pre-fill email if loginId looks like an email
      if (existingUser.loginId.includes('@')) {
        setNewUser(prev => ({ ...prev, email: existingUser.loginId }));
      }
    },
    [existingUser, validateFields]
  );

  const finalSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // Validation for Step 2 can go here
      if (!newUser.name) {
        toast.error("Name is required");
        return;
      }
      if (!newUser.gender) {
        toast.error("Please select a gender");
        return;
      }

      toast.success("OTP Sent Successfully");
      // Move to Step 3 (OTP Verification)
      setStep(3);
    },
    [newUser, navigate]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (step === 1) handleContinue(e);
      else finalSubmit(e);
    }
  };

  const handleExistingUserChange = (e) => {
    setExistingUser({
      ...existingUser,
      [e.target.id]: e.target.value,
    });
  };

  const handleNewUserChange = (e) => {
    const { id, value } = e.target;
    setNewUser({
      ...newUser,
      [id]: value
    });
  };

  // Handle Radio Change manually if needed or standard logic
  const handleGenderChange = (val) => {
    setNewUser({ ...newUser, gender: val });
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

                {step === 1 ? (
                  /* STEP 1: LOGIN / IDENTIFIER */
                  <form className="loginForm" onSubmit={handleContinue} style={{ position: 'relative', transform: 'none' }}>

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
                ) : step === 2 ? (
                  /* STEP 2: ACCOUNT SETUP */
                  <form className="loginForm" onSubmit={finalSubmit} style={{ position: 'relative', transform: 'none' }}>
                    <div style={{ marginBottom: '20px' }}>
                      <h2 style={{ fontFamily: 'Playfair Display', fontSize: '24px', marginBottom: '5px' }}>Welcome to Patel Gen Electronics</h2>
                      <p style={{ fontFamily: 'Outfit', color: '#666', fontSize: '13px' }}>Please set up your account</p>
                    </div>

                    {/* Verified Input Display */}
                    <div className="verified-input-display">
                      <span>{existingUser.loginId}</span>
                      <span className="edit-link" onClick={() => setStep(1)}>Edit</span>
                      <div className="otp-note">OTP will be sent to your number for verification.</div>
                    </div>

                    {/* Gender Selection */}
                    <div className="gender-selection">
                      <label>Gender:</label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={newUser.gender === "Female"}
                          onChange={(e) => handleGenderChange(e.target.value)}
                        /> Female
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={newUser.gender === "Male"}
                          onChange={(e) => handleGenderChange(e.target.value)}
                        /> Male
                      </label>
                    </div>

                    <LoginInputField
                      placeholder="Name"
                      onKeyDown={handleKeyDown}
                      id="name"
                      value={newUser.name}
                      onChange={handleNewUserChange}
                    />

                    <LoginInputField
                      placeholder="Email"
                      onKeyDown={handleKeyDown}
                      id="email"
                      value={newUser.email}
                      onChange={handleNewUserChange}
                    />

                    <div className="terms-checkbox">
                      <input type="checkbox" id="terms" required />
                      <label htmlFor="terms">By Signing Up, I agree to <span className="link">Terms and Conditions</span>.</label>
                    </div>

                    <input type="submit" value="SEND OTP" className="loginBtn" />

                  </form>
                ) : (
                  /* STEP 3: OTP VERIFICATION */
                  <div className="loginForm">
                    <div className="step-back-header">
                      <span onClick={() => setStep(2)} className="back-link"> &lt; Back</span>
                      {/* Optional Close Icon could go here */}
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                      <h2 style={{ fontFamily: 'Playfair Display', fontSize: '24px', marginBottom: '10px' }}>Number Verification</h2>
                      <p style={{ fontFamily: 'Outfit', color: '#666', fontSize: '14px' }}>Please enter OTP sent to</p>
                      <p style={{ fontFamily: 'Outfit', color: '#333', fontSize: '16px', fontWeight: '500', marginTop: '5px' }}>
                        {existingUser.loginId}
                      </p>
                    </div>

                    <LoginInputField
                      placeholder="Enter OTP"
                      type="text"
                      onKeyDown={handleKeyDown}
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />

                    <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                      <span style={{ color: '#007bff', fontSize: '13px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}>
                        Resend OTP in 56s
                      </span>
                    </div>

                    <button onClick={verifyOtp} className="loginBtn">START SHOPPING</button>

                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};


export default LoginSignUp;
