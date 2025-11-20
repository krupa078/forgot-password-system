import React from "react";
import Layout from "../components/Layout";
import "./Dashboard.css";

export default function Settings() {
  return (
    <Layout>
      <h1 className="dashboard-title">Settings ⚙️</h1>
      <p className="dashboard-subtitle">
        This is just a placeholder page. You can add real settings here later.
      </p>

      <div className="dashboard-card">
        <p>• Change password (future)</p>
        <p>• Notification preferences (future)</p>
        <p>• Theme toggle (future)</p>
      </div>
    </Layout>
  );
}
