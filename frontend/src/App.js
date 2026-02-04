import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import UrgentIssues from "./pages/Urgent";

function App() {
  // Default page when app loads
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "upload":
        return <Upload />;
      case "urgent":
        return <UrgentIssues />;
      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  function App() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "upload":
        return <Upload />;
      case "urgent":
        return <UrgentIssues />;
      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <Sidebar setPage={setPage} />
      <div style={styles.content}>
        {renderPage()}
      </div>
    </div>
  );
}

const styles = {
  content: {
    marginLeft: "220px",   // SAME as sidebar width
    padding: "20px",
  },
};

}

export default App;
