import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function CategoryBar() {
  const data = [
    { category: "Payment", value: 45 },
    { category: "Delivery", value: 30 },
    { category: "Login", value: 22 },
    { category: "Refund", value: 18 },
  ];

  return (
    <div style={styles.card}>
      <h3>Top Complaint Categories</h3>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    width: "350px"
  }
};
