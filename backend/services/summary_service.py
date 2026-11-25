from services.embedding_service import get_embeddings
from services.vector_store import search_faiss
from services.gemini_service import call_gemini


def summarize_paper(filename: str):
    try:
        # 🔹 Step 1: Create embedding (using filename as anchor query)
        query_embedding = get_embeddings([filename])[0]

        # 🔹 Step 2: Retrieve ONLY chunks of selected PDF
        chunks, sources = search_faiss(
            query_embedding,
            top_k=10,
            filter_doc=filename
        )

        if not chunks:
            return {
                "summary": "No data found for selected PDF. Try uploading again.",
                "sources": []
            }

        # 🔹 Step 3: Build context (more chunks for better summary)
        context = "\n".join(chunks)

        # 🔹 Step 4: Strong structured prompt
        prompt = f"""
You are an expert research assistant.

Analyze the following research paper content and generate a structured summary.

Context:
{context}

Output strictly in this format:

## Problem Statement
...

## Methodology
...

## Key Contributions
...

## Results
...

## Limitations
...

Rules:
- Be concise but informative
- Do NOT hallucinate
- Only use given context
"""

        # 🔹 Step 5: Generate response
        result = call_gemini(prompt)

        return {
            "summary": result,
            "sources": [filename]  # cleaner UX
        }

    except Exception as e:
        return {
            "summary": f"Error: {str(e)}",
            "sources": []
        }