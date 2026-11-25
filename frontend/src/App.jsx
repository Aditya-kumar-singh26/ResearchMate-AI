import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import AskAI from "./pages/AskAI";
import Summarize from "./pages/Summarize";
import Compare from "./pages/Compare";
import Gaps from "./pages/Gaps";
import Graph from "./pages/Graph";
import Agent from "./pages/Agent";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ask" element={<AskAI />} />
          <Route path="/summarize" element={<Summarize />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/gaps" element={<Gaps />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/agent" element={<Agent />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
