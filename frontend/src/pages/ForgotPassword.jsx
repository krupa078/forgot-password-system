import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email && !phone) {
      alert("Please enter email or phone number");
      return;
    }

    try {
      setLoading(true);
      setNewPassword("");

      const res = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
        email,
        phone,
      });

      alert(res.data.message || "Password reset success");

      if (res.data.newPassword) {
        setNewPassword(res.data.newPassword);
      }
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Server error";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!newPassword) return;
    navigator.clipboard.writeText(newPassword);
    alert("Password copied to clipboard!");
  };

  const passwordBox = {
    marginTop: "18px",
    padding: "12px",
    borderRadius: "10px",
    backgroundColor: "#f9fafb",
    border: "1px dashed #cbd5f5",
  };

  const passwordText = {
    fontFamily: "monospace",
    fontSize: "15px",
    padding: "8px 10px",
    borderRadius: "6px",
    backgroundColor: "#111827",
    color: "#f9fafb",
    textAlign: "center",
    marginBottom: "8px",
  };

  const copyButton = {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#10b981",
    color: "#fff",
    fontSize: "13px",
    cursor: "pointer",
  };

  const backButtonStyle = {
    marginTop: "10px",
    width: "100%",
    padding: "9px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    backgroundColor: "#fff",
    color: "#374151",
    fontSize: "13px",
    cursor: "pointer",
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-subtitle">
          Enter <b>email or phone number</b>. We’ll generate a new password for
          you.
        </p>

        <form onSubmit={handleReset}>
          <label className="auth-label">Email</label>
          <input
            type="email"
            className="auth-input"
            placeholder="example@mail.com (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="auth-label">Phone Number</label>
          <input
            type="text"
            className="auth-input"
            placeholder="9876543210 (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>

        <button
          type="button"
          style={backButtonStyle}
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>

        {newPassword && (
          <div style={passwordBox}>
            <div style={{ fontSize: "13px", marginBottom: "6px" }}>
              Your new password:
            </div>
            <div style={passwordText}>{newPassword}</div>
            <button type="button" style={copyButton} onClick={handleCopy}>
              Copy Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
