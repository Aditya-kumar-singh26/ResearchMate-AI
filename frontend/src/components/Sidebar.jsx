import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold mb-4">ResearchMate AI</h1>

      <Link to="/">Dashboard</Link>
      <Link to="/ask">Ask AI</Link>
      <Link to="/summarize">Summarize</Link>
      <Link to="/compare">Compare</Link>
      <Link to="/gaps">Research Gaps</Link>
      <Link to="/graph">Knowledge Graph</Link>
      <Link to="/agent">Research Agent</Link>
    </div>
  );
}

export default Sidebar;
