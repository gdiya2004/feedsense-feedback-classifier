import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import UrgentIssues from "./pages/Urgent";

function App() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "upload":
        return <Upload />;
      case "urgent":
        return <UrgentIssues />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setPage={setPage} />
      <div style={styles.content}>
        {renderPage()}
      </div>
    </div>
  );
}

const styles = {
  content: {
    marginLeft: "220px",   // same as sidebar width
    width: "100%",
    padding: "20px"
  }
};

export default App;
