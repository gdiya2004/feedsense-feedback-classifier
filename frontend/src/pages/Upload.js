import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Upload() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please enter valid feedback.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://feedsense.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Server not reachable. Try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{padding: "20px" }}>
      <Navbar />

      <div style={styles.card}>
        <h1>Analyze Feedback</h1>

        <textarea
          style={styles.textarea}
          rows="5"
          placeholder="Enter customer feedback here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button style={styles.button} onClick={handleSubmit}>
          Analyze Feedback
        </button>

        {loading && <p style={styles.loading}>Analyzing...</p>}
        {error && <p style={styles.error}>{error}</p>}

        {result && (
          <div style={styles.resultCard}>
            <h3>Prediction Result</h3>
            <p><b>Category:</b> {result.category}</p>
            <p><b>Priority:</b> {result.priority}</p>
            <p><b>Confidence:</b> {result.confidence.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    height:"300px",
    maxWidth: "600px",
    marginTop: "100px",
    marginLeft:"auto",
    marginRight:"auto"
    // marginTop:"200"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#4a90e2",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  loading: { marginTop: "10px", color: "#555" },
  error: { marginTop: "10px", color: "red" },
  resultCard: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#f4f8ff",
    textAlign: "left",
  },
};
