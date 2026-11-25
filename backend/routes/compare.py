from fastapi import APIRouter
from services.compare_service import compare_papers

router = APIRouter()


@router.post("/compare")
def compare(data: dict):
    file1 = data.get("file1")
    file2 = data.get("file2")

    if not file1 or not file2:
        return {"error": "Select two PDFs"}

    return compare_papers(file1, file2)