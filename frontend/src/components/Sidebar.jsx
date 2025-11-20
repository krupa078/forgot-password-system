import React from "react";
import { useNavigate } from "react-router-dom";

const sidebarBtn = {
  width: "100%",
  padding: "12px 15px",
  borderRadius: "8px",
  background: "rgba(255,255,255,0.18)",
  color: "white",
  border: "none",
  textAlign: "left",
  marginBottom: "12px",
  fontSize: "15px",
  cursor: "pointer",
  transition: "background 0.15s ease",
};

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "240px",
        background: "#0a3d99",
        padding: "28px 20px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2 style={{ marginBottom: "32px", textAlign: "center" }}>MyApp</h2>

        <button style={sidebarBtn} onClick={() => navigate("/dashboard")}>
          🏠 Dashboard
        </button>

        <button style={sidebarBtn} onClick={() => navigate("/profile")}>
          👤 Profile
        </button>

        <button style={sidebarBtn} onClick={() => navigate("/settings")}>
          ⚙️ Settings
        </button>
      </div>

      <button
        style={{
          ...sidebarBtn,
          background: "#f97373",
          marginTop: "20px",
        }}
        onClick={handleLogout}
      >
        🔒 Logout
      </button>
    </div>
  );
}
