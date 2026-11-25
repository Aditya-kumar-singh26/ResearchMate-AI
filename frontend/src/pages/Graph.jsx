import { useContext, useState } from "react";
import { getGraph } from "../services/api";
import { PaperContext } from "../context/PaperContext";
import ForceGraph2D from "react-force-graph-2d";

function Graph() {
  const { papers } = useContext(PaperContext);
  const [selected, setSelected] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGraph = async () => {
    if (!selected) {
      alert("⚠️ Please select a PDF");
      return;
    }

    setLoading(true);

    try {
      const res = await getGraph({ filename: selected });

      if (res.data.error) {
        alert(res.data.error);
        setLoading(false);
        return;
      }

      // 🔥 Convert backend → graph format
      const data = {
        nodes: res.data.nodes?.map((n) => ({ id: n })) || [],
        links:
          res.data.edges?.map((e) => ({
            source: e.from,
            target: e.to,
            label: e.label,
          })) || [],
      };

      setGraphData(data);
    } catch (err) {
      console.error(err);
      alert("❌ Error generating graph");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Knowledge Graph</h1>

      {/* PDF Selection */}
      <div className="mb-4">
        {papers.length === 0 && <p>⚠️ No PDFs uploaded</p>}

        {papers.map((p, i) => (
          <button
            key={i}
            onClick={() => setSelected(p)}
            className={`block mb-2 px-3 py-2 rounded ${
              selected === p ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={handleGraph}
        className="bg-blue-500 px-4 py-2 rounded mb-4"
      >
        {loading ? "Generating..." : "Generate Graph"}
      </button>

      {/* 🔥 IMPROVED GRAPH */}
      {graphData && (
        <div className="h-[650px] w-full bg-gray-900 rounded overflow-hidden">
          <ForceGraph2D
            graphData={graphData}
            // 🔥 Background
            backgroundColor="#0f172a"
            // 🔥 Node styling
            nodeRelSize={6}
            nodeColor={() => "#38bdf8"}
            // 🔥 Link styling
            linkColor={() => "#94a3b8"}
            linkWidth={1.5}
            linkDirectionalArrowLength={6}
            linkDirectionalArrowRelPos={1}
            // 🔥 SHOW NODE LABELS
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.id;

              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;

              // Node circle
              ctx.beginPath();
              ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
              ctx.fillStyle = "#38bdf8";
              ctx.fill();

              // Label background
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth + 6, fontSize + 4];

              ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
              ctx.fillRect(
                node.x - bckgDimensions[0] / 2,
                node.y + 6,
                bckgDimensions[0],
                bckgDimensions[1],
              );

              // Label text
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#ffffff";
              ctx.fillText(label, node.x, node.y + 6 + bckgDimensions[1] / 2);
            }}
            // 🔥 Smooth layout
            cooldownTicks={100}
          />
        </div>
      )}
    </div>
  );
}

export default Graph;
