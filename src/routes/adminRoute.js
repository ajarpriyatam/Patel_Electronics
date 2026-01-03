import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../component/Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for hardcoded admin authentication
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("admin");
    
    if (token === "admin-token-12345" && admin === "true") {
      setOk(true);
    } else {
      setOk(false);
      navigate("/admin/signin");
    }
  }, [navigate]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
