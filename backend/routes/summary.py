from fastapi import APIRouter
from services.summary_service import summarize_paper

router = APIRouter()


@router.post("/summarize")
def summarize(data: dict):
    filename = data.get("filename")

    if not filename:
        return {"error": "No PDF selected"}

    return summarize_paper(filename)