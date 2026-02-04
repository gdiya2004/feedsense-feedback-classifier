import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import SentimentPie from "../components/SentimentPie";
import TrendLine from "../components/TrendLine";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("https://feedsense.onrender.com/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  if (!stats) return <p style={{ marginLeft: "240px" }}>Loading dashboard...</p>;

  return (
    <div style={{ marginLeft: "240px", padding: "20px" }}>
      <Navbar />

      {/* 🔹 Stats Cards */}
      <div style={styles.cards}>
        <StatCard title="📩 Total Feedback" value={stats.total_feedback} color="#3b82f6" />
        <StatCard title="😊 Positive %" value={`${stats.positive_percent}%`} color="#10b981" />
        <StatCard title="😠 Negative %" value={`${stats.negative_percent}%`} color="#ef4444" />
        <StatCard title="🚨 Urgent Issues" value={stats.urgent_issues} color="#f59e0b" />
      </div>

      {/* 🔹 Charts Section */}
      <div style={styles.charts}>
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>Sentiment Distribution</h3>
          <SentimentPie />
        </div>

        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>Feedback Trend</h3>
          <TrendLine />
        </div>
      </div>
    </div>
  );
}

const styles = {
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "15px",
    margin: "20px 0"
  },
  charts: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "10px"
  },
  chartBox: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
  },
  chartTitle: {
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "600"
  }
};
