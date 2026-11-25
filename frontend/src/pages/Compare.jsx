import { useContext, useState } from "react";
import { compare } from "../services/api";
import { PaperContext } from "../context/PaperContext";
import ReactMarkdown from "react-markdown";

function Compare() {
  const { papers } = useContext(PaperContext);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState("");

  const toggleSelect = (file) => {
    if (selected.includes(file)) {
      setSelected(selected.filter((f) => f !== file));
    } else if (selected.length < 2) {
      setSelected([...selected, file]);
    }
  };

  const handleCompare = async () => {
    if (selected.length < 2) {
      setResult("⚠️ Select two PDFs");
      return;
    }

    const res = await compare({
      file1: selected[0],
      file2: selected[1],
    });

    setResult(res.data.comparison);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Compare</h1>

      {papers.length < 2 && <p>⚠️ Upload at least 2 PDFs to compare</p>}

      <div className="mb-4">
        {papers.map((p, i) => (
          <button
            key={i}
            onClick={() => toggleSelect(p)}
            className={`block mb-2 px-3 py-2 rounded ${
              selected.includes(p) ? "bg-purple-500" : "bg-gray-700"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={handleCompare}
        className="bg-purple-500 px-4 py-2 rounded"
      >
        Compare
      </button>

      {result && (
        <div className="mt-4 bg-gray-900 p-4 rounded">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default Compare;
