import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// 🔹 ASK AI
export const askAI = (data) => API.post("/ask", data);

// 🔹 UPLOAD PDF (IMPORTANT FIX 🔥)
export const uploadPDF = (formData) =>
  API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// 🔹 FUTURE FEATURES (Day 5+)
export const summarize = (data) => API.post("/summarize", data);
export const compare = (data) => API.post("/compare", data);
export const getGaps = (data) => API.post("/gaps", data);
export const getGraph = (data) => API.post("/graph", data);
export const generateIdea = (data) => API.post("/idea", data);

export default API;
