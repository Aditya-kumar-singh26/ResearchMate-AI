from services.embedding_service import get_embeddings
from services.vector_store import search_faiss
from services.gemini_service import call_gemini


def find_research_gaps(filename: str):
    try:
        # 🔹 Step 1: embedding
        emb = get_embeddings([filename])[0]

        # 🔹 Step 2: retrieve ONLY selected PDF chunks
        chunks, _ = search_faiss(
            emb,
            top_k=10,
            filter_doc=filename
        )

        if not chunks:
            return {"gaps": "No data found for selected PDF"}

        # 🔹 Step 3: context
        context = "\n".join(chunks)

        # 🔥 Step 4: strong structured prompt
        prompt = f"""
You are a research expert.

Analyze the following research paper and identify:

1. Research Gaps
2. Unsolved Problems
3. Limitations
4. Future Opportunities

Context:
{context}

Output format:

## Research Gaps
...

## Unsolved Problems
...

## Limitations
...

## Future Opportunities
...

Rules:
- Do not hallucinate
- Only use given context
- Be precise and insightful
"""

        # 🔹 Step 5: LLM
        result = call_gemini(prompt)

        return {"gaps": result}

    except Exception as e:
        return {"gaps": f"Error: {str(e)}"}