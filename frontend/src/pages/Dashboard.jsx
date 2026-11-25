import { useState, useContext } from "react";
import { uploadPDF } from "../services/api";
import { PaperContext } from "../context/PaperContext";

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 NEW: global state
  const { papers, setPapers } = useContext(PaperContext);

  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    setLoading(true);
    setMessage("");

    try {
      const res = await uploadPDF(formData);

      // 🔥 IMPORTANT: store uploaded PDFs globally
      setPapers((prev) => [...prev, ...res.data.files]);

      setMessage(
        `✅ Uploaded ${res.data.files.length} files | Total chunks: ${res.data.total_chunks}`,
      );

      // 🔥 Clear local file input
      setFiles([]);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "❌ Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload PDFs</h1>

      {/* File Input */}
      <input
        type="file"
        multiple
        onChange={(e) => setFiles([...e.target.files])}
        className="mb-3"
      />

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="mb-3 text-sm text-gray-300">
          <p className="font-semibold">Selected Files:</p>
          {files.map((file, i) => (
            <p key={i}>• {file.name}</p>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* Message */}
      {message && <p className="mt-3">{message}</p>}

      {/* 🔥 NEW: Show Uploaded PDFs */}
      {papers.length > 0 && (
        <div className="mt-6 bg-gray-900 p-4 rounded">
          <h2 className="font-semibold mb-2">Uploaded Papers:</h2>
          {papers.map((p, i) => (
            <p key={i} className="text-sm text-gray-300">
              📄 {p}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
