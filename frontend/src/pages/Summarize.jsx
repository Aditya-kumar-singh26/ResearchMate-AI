import { useContext, useState } from "react";
import { summarize } from "../services/api";
import { PaperContext } from "../context/PaperContext";
import ReactMarkdown from "react-markdown";

function Summarize() {
  const { papers } = useContext(PaperContext);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState("");

  const handleSummarize = async () => {
    if (!selected) {
      setResult("⚠️ Please select a PDF");
      return;
    }

    const res = await summarize({ filename: selected });
    setResult(res.data.summary);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Summarize</h1>

      {/* PDF Selection */}
      <div className="mb-4">
        {papers.length === 0 && <p>No PDFs uploaded</p>}

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

      <button
        onClick={handleSummarize}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Summarize
      </button>

      {result && (
        <div className="mt-4 bg-gray-900 p-4 rounded">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default Summarize;
