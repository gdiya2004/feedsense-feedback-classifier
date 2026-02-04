import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function SentimentPie() {
  const data = [
    { name: "Positive", value: 62 },
    { name: "Negative", value: 25 },
    { name: "Neutral", value: 13 },
  ];

  const COLORS = ["#10b981", "#ef4444", "#f59e0b"];

  return (
    <div style={styles.card}>
      <h3>Sentiment Distribution</h3>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
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
