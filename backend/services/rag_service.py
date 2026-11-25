from collections import defaultdict

from services.embedding_service import get_embeddings
from services.vector_store import search_faiss
from services.gemini_service import call_gemini


def answer_query(query: str):
    try:
        # 🔹 Step 1: Query embedding
        query_embedding = get_embeddings([query])[0]

        # 🔥 Step 2: Increase retrieval (IMPORTANT)
        relevant_chunks, sources = search_faiss(query_embedding, top_k=10)

        if not relevant_chunks:
            return {
                "answer": "No relevant data found. Please upload PDFs first.",
                "sources": []
            }

        # 🔥 Step 3: Group chunks by document (CRITICAL FIX)
        doc_chunks = defaultdict(list)

        for chunk, source in zip(relevant_chunks, sources):
            doc_chunks[source].append(chunk)

        # 🔥 Step 4: Build structured context
        context = ""

        for doc, chunks in doc_chunks.items():
            context += f"\n\nDocument: {doc}\n"
            context += "\n".join(chunks[:3])  # limit per document

        # 🔥 Step 5: Improved prompt for multi-doc reasoning
        prompt = f"""
You are an AI research assistant.

You are given multiple research documents.

Each section below is labeled with its document name.

Context:
{context}

Question:
{query}

Instructions:
- Use information from MULTIPLE documents if available
- If question asks for comparison, compare between documents
- Mention document names in your answer
- Be clear and structured
- Use bullet points if helpful
- If answer is not found, say "Not found in provided documents"
"""

        # 🔹 Step 6: AI response
        answer = call_gemini(prompt)

        # 🔹 Step 7: Return result
        return {
            "answer": answer,
            "sources": list(set(sources))
        }

    except Exception as e:
        return {
            "answer": f"Error: {str(e)}",
            "sources": []
        }