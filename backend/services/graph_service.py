from services.embedding_service import get_embeddings
from services.vector_store import search_faiss
from services.gemini_service import call_gemini
import json
import re


def generate_graph(filename: str):
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
            return {"error": "No data found for selected PDF"}

        # 🔹 Step 3: context
        context = "\n".join(chunks)

        # 🔥 Step 4: improved prompt (STRICT JSON)
        prompt = f"""
You are an AI system that extracts knowledge graphs.

From the given research text, extract:

1. Key Entities (models, methods, datasets, concepts)
2. Relationships between them

Context:
{context}

Return ONLY raw JSON in this format:

{{
  "nodes": ["entity1", "entity2"],
  "edges": [
    {{"from": "entity1", "to": "entity2", "label": "relation"}}
  ]
}}

Rules:
- Do NOT include any explanation
- Do NOT include markdown
- Do NOT include text before or after JSON
- Output must start with {{ and end with }}
"""

        result = call_gemini(prompt)

        # 🔥 Step 5: extract JSON safely (CRITICAL FIX)
        try:
            match = re.search(r"\{.*\}", result, re.DOTALL)

            if not match:
                return {
                    "error": "No valid JSON found",
                    "raw": result
                }

            clean_json = match.group()

            parsed = json.loads(clean_json)

            # 🔥 Step 6: validate structure
            if "nodes" not in parsed or "edges" not in parsed:
                return {
                    "error": "Invalid graph structure",
                    "raw": parsed
                }

            return parsed

        except Exception as e:
            return {
                "error": "JSON parsing failed",
                "raw": result
            }

    except Exception as e:
        return {"error": str(e)}