from services.embedding_service import get_embeddings
from services.vector_store import search_faiss
from services.gemini_service import call_gemini


def compare_papers(file1: str, file2: str):
    try:
        # 🔹 Step 1: Create embeddings (using filenames as anchors)
        emb1 = get_embeddings([file1])[0]
        emb2 = get_embeddings([file2])[0]

        # 🔹 Step 2: Retrieve ONLY chunks of each selected PDF
        chunks1, _ = search_faiss(
            emb1,
            top_k=7,
            filter_doc=file1
        )

        chunks2, _ = search_faiss(
            emb2,
            top_k=7,
            filter_doc=file2
        )

        if not chunks1 or not chunks2:
            return {
                "comparison": "Not enough data to compare selected PDFs. Try re-uploading."
            }

        # 🔹 Step 3: Build context
        context1 = "\n".join(chunks1)
        context2 = "\n".join(chunks2)

        # 🔹 Step 4: Strong structured prompt
        prompt = f"""
You are an expert AI research analyst.

Compare the following two research papers.

Paper A:
{context1}

Paper B:
{context2}

Output strictly in this format:

## Overview
Brief summary of both papers

## Approach Comparison
...

## Methodology Comparison
...

## Results & Performance
...

## Strengths
- Paper A:
- Paper B:

## Weaknesses
- Paper A:
- Paper B:

## When to Use Which
...

Rules:
- Be structured and clear
- Do NOT mix content incorrectly
- Only use given context
"""

        # 🔹 Step 5: Generate response
        result = call_gemini(prompt)

        return {
            "comparison": result
        }

    except Exception as e:
        return {
            "comparison": f"Error: {str(e)}"
        }