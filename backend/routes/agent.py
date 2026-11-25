from fastapi import APIRouter
from services.agent_service import generate_research_idea

router = APIRouter()


@router.post("/idea")
def generate(data: dict):
    filename = data.get("filename")

    if not filename:
        return {"error": "No PDF selected"}

    return generate_research_idea(filename)