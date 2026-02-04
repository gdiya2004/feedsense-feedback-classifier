import { useState } from "react";
import Dashboard from "../pages/Dashboard";
import Upload from "../pages/Upload";
import UrgentIssues from "../pages/Urgent";

export default function Sidebar({ setPage }) {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>FeedSense</h2>
      <ul style={styles.menu}>
        <li style={styles.item} onClick={() => setPage("dashboard")}>
          📊 Dashboard
        </li>
        <li style={styles.item} onClick={() => setPage("upload")}>
          📤 Upload Feedback
        </li>
        <li style={{ ...styles.item, color: "red" }} onClick={() => setPage("urgent")}>
          🚨 Urgent Issues
        </li>
      </ul>
    </div>
  );
}


const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#1e293b",
    color: "white",
    position: "fixed",
    padding: "20px",
    zIndex: 1000, 
  },
  logo: {
    marginBottom: "30px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    marginBottom: "20px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
