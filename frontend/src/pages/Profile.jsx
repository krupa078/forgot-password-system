import React from "react";
import Layout from "../components/Layout";
import "./Dashboard.css";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Layout>
      <h1 className="dashboard-title">Profile 👤</h1>
      <p className="dashboard-subtitle">
        Basic profile details from your account.
      </p>

      <div className="dashboard-card">
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
