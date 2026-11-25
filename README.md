# ResearchMate AI

ResearchMate AI is an AI-powered research assistant built to help users work with academic papers more efficiently. The application allows users to upload research PDFs, ask questions about them, summarize a paper, compare multiple papers, identify research gaps, generate research ideas, and visualize relationships between concepts using a knowledge graph.

The project combines a FastAPI backend with a React + Vite frontend and uses a Retrieval-Augmented Generation (RAG) workflow powered by embeddings, FAISS vector search, and Google Gemini.

---

## Why this project exists

Research teams and students often spend significant time reading papers, extracting key ideas, comparing methodologies, and finding missing opportunities in literature. ResearchMate AI tries to reduce that friction by converting uploaded PDF documents into searchable knowledge and providing AI assistance across core research tasks.

---

## Core features

### 1. PDF upload and indexing

- Upload one or multiple PDF files from the dashboard
- Extract text from PDFs using PyMuPDF
- Split long documents into smaller chunks
- Convert chunks into embeddings
- Store them in a FAISS vector index for semantic retrieval

### 2. Ask AI on uploaded papers

- Ask natural-language questions about the uploaded research
- Retrieve the most relevant document sections semantically
- Use Gemini to produce grounded answers with document references

### 3. Research paper summarization

- Pick a PDF and get a summary focused on the paper’s key areas
- Helps quickly understand the core research problem, methods, findings, and limitations

### 4. Paper comparison

- Compare two research papers side by side
- Get structured insights about methods, contributions, strengths, weaknesses, and differences

### 5. Research gap detection

- Analyze a paper for missing directions, limitations, and future opportunities
- Useful for identifying underexplored areas or potential follow-up work

### 6. AI research agent

- Generate ideas for new research directions based on an uploaded paper
- Produces conceptual suggestions such as a possible hypothesis, method, and next-step research design

### 7. Knowledge graph visualization

- Extract entities and relationships from the paper content
- Build a graph structure for exploration
- Visualize connections in the frontend with a force-directed graph

---

## Project architecture

### Backend

The backend is a FastAPI application with separate modules for different features.

Main files:

- backend/main.py: app creation and route registration
- backend/routes/: API endpoints for upload, ask, summarize, compare, gaps, graph, and idea generation
- backend/services/: business logic for PDF parsing, chunking, embeddings, vector search, summarization, and AI workflows

### Frontend

The UI is a React application built with Vite and uses multiple route-based pages for each research feature.

Main frontend areas:

- frontend/src/App.jsx: application routing
- frontend/src/pages/: page-level interfaces for Dashboard, Ask AI, Summarize, Compare, Gaps, Graph, and Agent
- frontend/src/services/api.js: centralized API calls to the FastAPI backend
- frontend/src/context/: global application state for uploaded papers

---

## Tech stack

### Backend

- Python
- FastAPI
- Uvicorn
- PyMuPDF
- Sentence Transformers
- FAISS (faiss-cpu)
- Google Generative AI (Gemini)
- python-dotenv
- python-multipart

### Frontend

- React
- Vite
- JavaScript
- Axios
- Tailwind CSS
- React Router
- react-force-graph-2d

---

## Repository structure

```text
ResearchMate-AI-main/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── routes/
│   │   ├── agent.py
│   │   ├── ask.py
│   │   ├── compare.py
│   │   ├── gaps.py
│   │   ├── graph.py
│   │   ├── summary.py
│   │   └── upload.py
│   └── services/
│       ├── agent_service.py
│       ├── chunking_service.py
│       ├── compare_service.py
│       ├── embedding_service.py
│       ├── gaps_service.py
│       ├── gemini_service.py
│       ├── graph_service.py
│       ├── pdf_service.py
│       ├── rag_service.py
│       ├── summary_service.py
│       └── vector_store.py
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── README.md
└── .gitignore
```

---

## Setup instructions

### Prerequisites

Before running the project, make sure you have:

- Python 3.10+ installed
- Node.js and npm installed
- A Google Gemini API key
- A terminal with access to the project folder

---

### 1. Clone the project

```bash
git clone <repo-url>
cd ResearchMate-AI-main
```

---

### 2. Backend setup

```bash
cd backend
python -m venv venv
```

On Windows:

```bash
venv\Scripts\activate
```

On macOS/Linux:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` folder:

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

Run the backend:

```bash
uvicorn main:app --reload
```

The FastAPI app will be available at:

- http://127.0.0.1:8000

---

### 3. Frontend setup

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The app will typically run at:

- http://localhost:5173

---

## How the app workflow works

1. User uploads one or more PDFs from the dashboard.
2. Each PDF is converted into text using PyMuPDF.
3. The text is chunked into smaller sections for better retrieval.
4. Each chunk is embedded into a vector representation.
5. The embeddings are stored in a FAISS vector database.
6. When a question is asked, the query is embedded and compared against stored chunks.
7. The most relevant passages are retrieved.
8. Gemini is prompted with those passages and the user question.
9. The model generates a contextual answer citing the relevant document context.

This creates a practical RAG pipeline for knowledge grounding and document understanding.

---

## Main API endpoints

The backend exposes these routes:

### Upload

- POST /upload
- Accepts multiple PDF files
- Returns uploaded filenames and total chunk count

### Ask AI

- POST /ask
- Body example:

```json
{
  "question": "What is the main contribution of this paper?"
}
```

### Summarize

- POST /summarize
- Body example:

```json
{
  "filename": "paper_name.pdf"
}
```

### Compare

- POST /compare
- Body example:

```json
{
  "file1": "paper1.pdf",
  "file2": "paper2.pdf"
}
```

### Research Gaps

- POST /gaps
- Body example:

```json
{
  "filename": "paper_name.pdf"
}
```

### Research Agent

- POST /idea
- Body example:

```json
{
  "filename": "paper_name.pdf"
}
```

### Knowledge Graph

- POST /graph
- Body example:

```json
{
  "filename": "paper_name.pdf"
}
```

---

## Frontend pages

The UI includes the following areas:

- Dashboard: upload PDFs and see what was loaded
- Ask AI: ask questions over the uploaded paper collection
- Summarize: summarize a selected paper
- Compare: compare two uploaded papers
- Research Gaps: analyze gaps and limitations
- Knowledge Graph: view graph-based relationships
- Research Agent: generate research ideas

---

## Notes on current implementation

This is a research prototype with a lightweight in-memory vector store. In the current version:

- FAISS memory is initialized in the backend process
- Uploaded document embeddings are stored in memory during the session
- The project is designed as a local workflow for experimentation and development rather than a production-scale multi-user system

---

## Potential improvements

The project can be extended with:

- Persistent FAISS storage on disk
- Document metadata filtering and search refinement
- Chat history and session memory
- Multi-user authentication and authorization
- Better graph rendering and node filtering
- PDF selection by title and metadata
- Deployment with Docker and environment-managed production configs

---

## Troubleshooting

### Gemini API key error

If you see an error like “GEMINI_API_KEY not found in .env”, make sure:

- the `.env` file exists in the backend folder
- the variable name is exactly `GEMINI_API_KEY`
- the key is valid and active

### Frontend cannot connect to backend

Check that the backend is running on port 8000 and that the frontend is using the correct base URL in the API client.

### Upload fails

Ensure that:

- the uploaded file is a valid PDF
- the backend dependencies are installed
- the FastAPI server is running and not failing at startup

---

## Summary

ResearchMate AI is a practical AI research assistant that brings together PDF ingestion, RAG-based question answering, academic summarization, comparison, gap analysis, idea generation, and graph-based exploration in a single workflow. It is well suited for academic exploration, literature review support, and prototype AI research tooling.

---

## License

This project is intended for educational and research-oriented use. If you are publishing or distributing it, add your preferred license file before production deployment.
