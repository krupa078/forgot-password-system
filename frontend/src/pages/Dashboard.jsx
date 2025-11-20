import React from "react";
import Layout from "../components/Layout";
import "./Dashboard.css";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Layout>
      <h1 className="dashboard-title">Welcome to Your Dashboard 🚀</h1>
      <p className="dashboard-subtitle">You are logged in successfully!</p>

      <div className="dashboard-card">
        <h3 style={{ marginBottom: "10px" }}>User Information</h3>

        <p>
          <b>Name:</b> {user?.name || "-"}
        </p>
        <p>
          <b>Email:</b> {user?.email || "-"}
        </p>
        <p>
          <b>Phone:</b> {user?.phone || "-"}
        </p>
      </div>
    </Layout>
  );
}
