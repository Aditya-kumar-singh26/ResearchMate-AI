from fastapi import APIRouter, UploadFile, File
from typing import List

from services.pdf_service import extract_text_from_pdf
from services.chunking_service import chunk_text
from services.embedding_service import get_embeddings
from services.vector_store import create_faiss_index

router = APIRouter()


@router.post("/upload")
async def upload_pdf(files: List[UploadFile] = File(...)):
    try:
        total_chunks = 0
        file_names = []

        for file in files:
            # 🔹 Step 1: Extract text
            text = extract_text_from_pdf(file)

            # 🔹 Step 2: Chunk
            chunks = chunk_text(text)

            # 🔹 Step 3: Embeddings
            embeddings = get_embeddings(chunks)

            # 🔹 Step 4: Store in FAISS with filename
            create_faiss_index(embeddings, chunks, file.filename)

            total_chunks += len(chunks)
            file_names.append(file.filename)

        return {
            "message": "PDFs processed successfully",
            "files": file_names,
            "total_chunks": total_chunks
        }

    except Exception as e:
        return {"error": str(e)}