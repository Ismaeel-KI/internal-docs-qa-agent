import sys
import os
from pathlib import Path

# --- BOILERPLATE TO FIX PATHING ERRORS ---
# This ensures that whether you run this script directly or via the API, 
# it can find the 'backend' package and its siblings.
ROOT_DIR = str(Path(__file__).resolve().parent.parent.parent)
if ROOT_DIR not in sys.path:
    sys.path.append(ROOT_DIR)

try:
    # Use absolute imports starting from the 'backend' package
    from backend.app.ingestion.document_loader import load_documents
    from backend.app.vectorstore.chroma_client import store_embeddings
except ImportError as e:
    # Fallback for relative execution contexts
    try:
        from document_loader import load_documents
        from chroma_client import store_embeddings
    except ImportError:
        print(f"CRITICAL: Could not resolve imports in run_ingestion.py. Error: {e}")
        sys.exit(1)

def run_ingestion_pipeline(input_path: str):
    """
    Main entry point used by the FastAPI backend (api.py).
    Processes a single file or a directory of PDFs.
    """
    print(f"\n--- 📂 Starting Ingestion Pipeline for: {input_path} ---")
    
    try:
        print("Step 1: Loading and parsing documents...")
        documents = load_documents(input_path)
        
        if not documents:
            print("❌ No documents found or parsed. Skipping embedding step.")
            return

        print(f"Step 2: Generating embeddings and storing in ChromaDB ({len(documents)} chunks)...")
        store_embeddings(documents)

        print("--- ✅ Ingestion completed successfully! ---\n")
        
    except Exception as e:
        print(f"❌ Error during ingestion pipeline: {e}")

def ingest_cli():
    """
    Command-line interface entry point.
    Usage: python backend/app/run_ingestion.py <path-to-documents>
    """
    if len(sys.argv) < 2:
        print("\nUsage: python run_ingestion.py <path-to-documents-or-file>")
        print("Example: python run_ingestion.py '../../docs/sample docs'\n")
        sys.exit(1)

    target_path = sys.argv[1]
    run_ingestion_pipeline(target_path)

if __name__ == "__main__":
    ingest_cli()