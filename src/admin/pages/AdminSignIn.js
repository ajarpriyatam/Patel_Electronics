import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaLock, FaUser, FaEye, FaEyeSlash, FaLaptopCode } from "react-icons/fa";

const AdminSignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Hardcoded admin credentials
    const adminEmail = "admin@electronics.com";
    const adminPassword = "admin123";

    // Simulate API delay
    setTimeout(() => {
      if (formData.email === adminEmail && formData.password === adminPassword) {
        localStorage.setItem("token", "admin-token-12345");
        localStorage.setItem("admin", "true");
        toast.success("Admin login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid email or password. Use admin@electronics.com / admin123");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4 shadow-lg shadow-blue-500/20">
            <FaLaptopCode className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Admin Panel
          </h1>
          <p className="text-gray-400 mt-2">Sign in to manage your store</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all focus:outline-none"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all focus:outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <FaLock className="w-4 h-4" />
                  Sign In to Admin Panel
                </>
              )}
            </button>
          </form>

          {/* Back to Website */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              ← Back to Website
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-blue-900/20 border border-blue-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-400">
            <FaLock className="w-4 h-4" />
            <span className="text-sm font-medium">Secure Admin Access</span>
          </div>
          <p className="text-xs text-blue-300/80 mt-1">
            This is a secure admin area. Only authorized personnel should access this page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
