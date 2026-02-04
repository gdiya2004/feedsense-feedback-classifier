import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import UrgentIssues from "./pages/Urgent";

function App() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    if (page === "upload") return <Upload />;
    if (page === "urgent") return <UrgentIssues />;
    return <Dashboard />;
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setPage={setPage} />
      <div style={{ marginLeft: "100px", width: "100%" }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
