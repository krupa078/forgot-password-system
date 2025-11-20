import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api";
import "./Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !email || !phone || !password) {
      alert("All fields are required");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
      alert("Name should contain only letters");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone must be 10 digits");
      return false;
    }

    if (!/^[A-Za-z]+$/.test(password)) {
      alert("Password must contain only letters (A–Z, a–z)");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        phone,
        password,
      });

      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2 className="auth-title">Create Account ✨</h2>
        <p className="auth-subtitle">Register to continue</p>

        <label className="auth-label">Name</label>
        <input
          type="text"
          className="auth-input"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="auth-label">Email</label>
        <input
          type="email"
          className="auth-input"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="auth-label">Phone</label>
        <input
          type="text"
          className="auth-input"
          placeholder="10-digit phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label className="auth-label">Password (A–Z, a–z)</label>
        <input
          type="password"
          className="auth-input"
          placeholder="Only letters allowed"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
