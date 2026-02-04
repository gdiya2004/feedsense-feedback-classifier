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

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar controls page switching */}
      <Sidebar setPage={setPage} />

      {/* Main Content Area */}
      <div style={{ marginLeft: "240px", width: "100%", padding: "20px" }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
