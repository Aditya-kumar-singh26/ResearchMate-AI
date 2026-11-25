import { useContext, useState } from "react";
import { getGaps } from "../services/api";
import { PaperContext } from "../context/PaperContext";
import ReactMarkdown from "react-markdown";

function Gaps() {
  const { papers } = useContext(PaperContext);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGaps = async () => {
    if (!selected) {
      setResult("⚠️ Please select a PDF");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await getGaps({ filename: selected });
      setResult(res.data.gaps);
    } catch {
      setResult("❌ Error analyzing research gaps");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Research Gaps</h1>

      {/* PDF Selection */}
      <div className="mb-4">
        {papers.length === 0 && <p>⚠️ No PDFs uploaded</p>}

        {papers.map((p, i) => (
          <button
            key={i}
            onClick={() => setSelected(p)}
            className={`block mb-2 px-3 py-2 rounded ${
              selected === p ? "bg-red-500" : "bg-gray-700"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button onClick={handleGaps} className="bg-red-500 px-4 py-2 rounded">
        {loading ? "Analyzing..." : "Find Gaps"}
      </button>

      {result && (
        <div className="mt-6 bg-gray-900 p-4 rounded">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default Gaps;
