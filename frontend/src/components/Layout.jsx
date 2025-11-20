import React from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#eef3ff" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "32px 40px" }}>{children}</main>
    </div>
  );
}
