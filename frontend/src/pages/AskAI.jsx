import { useState } from "react";
import { askAI } from "../services/api";
import ReactMarkdown from "react-markdown";

function AskAI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const res = await askAI({ question: input });

      const botMessage = {
        type: "bot",
        text: res.data.answer,
        sources: res.data.sources || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "❌ Error occurred", sources: [] },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto h-[80vh] flex flex-col">
      <h1 className="text-2xl font-bold mb-4">AI Chat</h1>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto space-y-4 bg-gray-900 p-4 rounded">
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.type === "user" ? (
              <div className="text-right">
                <span className="bg-blue-500 px-3 py-2 rounded inline-block">
                  {msg.text}
                </span>
              </div>
            ) : (
              <div>
                <div className="bg-gray-800 p-3 rounded">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>

                {/* Sources */}
                {msg.sources?.length > 0 && (
                  <div className="text-sm mt-2 text-gray-400">
                    Sources: {msg.sources.join(", ")}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && <p className="text-gray-400">Thinking...</p>}
      </div>

      {/* Input */}
      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 text-black rounded"
          placeholder="Ask about your PDFs..."
        />
        <button onClick={handleSend} className="bg-blue-500 px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}

export default AskAI;
