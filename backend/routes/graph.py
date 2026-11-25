from fastapi import APIRouter
from services.graph_service import generate_graph

router = APIRouter()


@router.post("/graph")
def graph(data: dict):
    filename = data.get("filename")

    if not filename:
        return {"error": "No PDF selected"}

    return generate_graph(filename)