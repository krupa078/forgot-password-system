import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api";
import "./Auth.css";

function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailOrPhone || !password) {
      alert("Email and password required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        emailOrPhone,
        password,
      });

      alert("Login Successful!");

      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to your account</p>

        <label className="auth-label">Email or Phone</label>
        <input
          type="text"
          className="auth-input"
          placeholder="Enter email or phone"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
        />

        <label className="auth-label">Password</label>
        <input
          type="password"
          className="auth-input"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button" disabled={loading}>
          {loading ? "Processing..." : "Login"}
        </button>

        <div className="auth-footer">
          <Link to="/forgot-password">Forgot Password?</Link> |{" "}
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
