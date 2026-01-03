import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import ProductsPage from "./pages/Products";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import TrackOrder from "./pages/TrackOrder";
import LoginSignUp from "./pages/signup/LoginSignUp";
import PrivateRoute from "./routes/private";
import AdminRoute from "./routes/adminRoute";
import Layout from "./admin/layout/Layout";
import AdminSignIn from "./admin/pages/AdminSignIn";
import PageNotFound from "./pages/PageNotFound";
import Orders from "./pages/user/Order";
import Profile from "./pages/user/Profile";
import NewArrivals from "./pages/NewArrivals";
import DiwaliSale from "./pages/DiwaliSale";
import FAQ from "./pages/FAQ";
import ReturnPolicy from "./pages/ReturnPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/:category/collection" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<OrderPage />} />
      <Route path="/orders/tracking" element={<TrackOrder />} />
      <Route path="/account" element={<LoginSignUp />} />
      <Route path="/new-arrival" element={<NewArrivals />} />
      <Route path="/sale" element={<DiwaliSale />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/returns" element={<ReturnPolicy />} />
      <Route path="/shipping" element={<ShippingPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/refund" element={<RefundPolicy />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>
      <Route path="/admin/signin" element={<AdminSignIn />} />
      <Route path="/" element={<AdminRoute />}>
        <Route path="admin/*" element={<Layout />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
