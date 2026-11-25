from services.embedding_service import get_embeddings
from services.vector_store import search_faiss
from services.gemini_service import call_gemini


def generate_research_idea(filename: str):
    try:
        # 🔹 Step 1: embedding
        emb = get_embeddings([filename])[0]

        # 🔹 Step 2: retrieve chunks for selected PDF
        chunks, _ = search_faiss(
            emb,
            top_k=10,
            filter_doc=filename
        )

        if not chunks:
            return {"idea": "No data found for selected PDF"}

        # 🔹 Step 3: context
        context = "\n".join(chunks)

        # 🔥 Step 4: advanced research prompt
        prompt = f"""
You are an AI research scientist.

Based on the following research paper:

{context}

Generate:

## Novel Research Idea
...

## Hypothesis
...

## Proposed Method
...

## Experiment Setup
...

## Evaluation Metrics
...

## Possible Challenges
...

Rules:
- Be realistic and innovative
- Do not hallucinate
- Stay grounded in given context
"""

        # 🔹 Step 5: LLM
        result = call_gemini(prompt)

        return {"idea": result}

    except Exception as e:
        return {"idea": f"Error: {str(e)}"}