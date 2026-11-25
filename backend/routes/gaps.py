from fastapi import APIRouter
from services.gaps_service import find_research_gaps

router = APIRouter()


@router.post("/gaps")
def get_gaps(data: dict):
    filename = data.get("filename")

    if not filename:
        return {"error": "No PDF selected"}

    return find_research_gaps(filename)