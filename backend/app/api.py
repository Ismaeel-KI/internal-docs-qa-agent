# backend/app/api.py
import os
import sys
from pathlib import Path

# --- MAGIC PATH FIX ---
# This ensures Python can find 'backend' even if you run from the root
ROOT_DIR = str(Path(__file__).resolve().parent.parent.parent)
if ROOT_DIR not in sys.path:
    sys.path.append(ROOT_DIR)
# ----------------------

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Union

from backend.app.model import QARequest, QAResponse
from backend.app.core.qa_chain import query_doc

try:
    from backend.app.run_ingestion import run_ingestion_pipeline
except ImportError:
    run_ingestion_pipeline = None
    print("Warning: run_ingestion_pipeline could not be imported.")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIRECTORY = os.path.join(os.path.dirname(__file__), "..", "..", "docs", "sample docs")
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

@app.get("/")
async def root():
    """Root endpoint for the API."""
    return {"message": "Internal Docs QA Agent Backend is running."}

@app.post("/query", response_model=QAResponse)
def query_endpoint(payload: QARequest):
    try:
        # qa_chain now returns a dict with 'answer' and 'sources'
        result = query_doc(payload.question, top_k=payload.top_k)
        return QAResponse(answer=result["answer"], sources=result["sources"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/uploadfile/")
async def upload_file(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    try:
        with open(file_location, "wb+") as f:
            f.write(await file.read())
        
        if run_ingestion_pipeline:
            run_ingestion_pipeline(file_location)
            
        return {"message": f"'{file.filename}' processed.", "filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/docs/", response_model=List[Dict[str, Union[str, int]]])
async def list_documents():
    """Endpoint to list available documents."""
    documents = []
    try:
        # List files in the UPLOAD_DIRECTORY
        for filename in os.listdir(UPLOAD_DIRECTORY):
            file_path = os.path.join(UPLOAD_DIRECTORY, filename)
            if os.path.isfile(file_path):
                documents.append({
                    "name": filename,
                    "size_bytes": os.path.getsize(file_path),
                    "last_modified": int(os.path.getmtime(file_path)) # Unix timestamp
                })
    except FileNotFoundError:
        # If the directory doesn't exist, return an empty list or an error
        raise HTTPException(status_code=404, detail=f"Document directory '{UPLOAD_DIRECTORY}' not found.")
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Could not list documents: {e}")
    
    return documents

@app.get("/profile/", response_model=Dict[str, str])
async def get_user_profile():
    """Endpoint to get user profile information."""
    
    return {
        "username": "admin",
        "email": "admin@gmail.com",
        "role": "Administrator",
        "status": "Active"
    }