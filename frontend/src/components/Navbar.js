export default function Navbar() {
  return (
    <div style={styles.navbar}>
      <h2>AI Feedback Intelligence</h2>
      <span>👤 Admin</span>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "white",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  }
};
