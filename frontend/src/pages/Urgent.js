export default function UrgentIssues() {
  const urgentData = [
    { text: "Payment deducted twice", category: "Billing", priority: "High" },
    { text: "App crashes frequently", category: "Bug", priority: "High" }
  ];

  return (
    <div style={{ marginLeft: "240px", padding: "20px" }}>
      <h2 style={{ color: "red" }}>🚨 Urgent Issues</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Feedback</th>
            <th>Category</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {urgentData.map((item, index) => (
            <tr key={index}>
              <td>{item.text}</td>
              <td>{item.category}</td>
              <td style={{ color: "red" }}>{item.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: { width: "100%", borderCollapse: "collapse" }
};
