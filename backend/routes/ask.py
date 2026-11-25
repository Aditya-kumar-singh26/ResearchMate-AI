from fastapi import APIRouter
from services.rag_service import answer_query

router = APIRouter()


@router.post("/ask")
def ask_question(data: dict):
    question = data.get("question")

    if not question or not question.strip():
        return {"error": "Question cannot be empty"}

    return answer_query(question)