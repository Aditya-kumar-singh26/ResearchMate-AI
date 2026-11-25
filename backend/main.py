from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.ask import router as ask_router
from routes.upload import router as upload_router
from routes.summary import router as summary_router
from routes.compare import router as compare_router
from routes.gaps import router as gaps_router
from routes.agent import router as agent_router
from routes.graph import router as graph_router

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(ask_router)
app.include_router(upload_router)
app.include_router(summary_router)
app.include_router(compare_router)
app.include_router(gaps_router)
app.include_router(agent_router)
app.include_router(graph_router)

@app.get("/")
def home():
    return {"message": "Backend is running 🚀"}