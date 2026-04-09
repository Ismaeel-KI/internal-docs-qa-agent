import os
import google.generativeai as genai
from google.generativeai import GenerativeModel
from dotenv import load_dotenv

# Path fix for local imports
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent.parent))

try:
    from backend.app.vectorstore.chroma_client import create_or_load_collection
except ImportError:
    from backend.app.chroma_client import create_or_load_collection

load_dotenv()

# Configure the SDK
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# FIX: Manually list and select the first available flash model
# This bypasses the 404 by using exactly what Google says is available
def get_available_model():
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            # In 2026, we want 1.5-flash, 2.5-flash, or 3.0-flash
            if 'flash' in m.name:
                return m.name
    return "models/gemini-pro" # Fallback

SELECTED_MODEL = get_available_model()
print(f"--- 🤖 Initializing Gemini with model: {SELECTED_MODEL} ---")
model = GenerativeModel(SELECTED_MODEL)

def query_doc(question: str, top_k: int = 3):
    try:
        retriever = create_or_load_collection()
        # Use .invoke() to satisfy the LangChain deprecation warning
        docs = retriever.invoke(question)
        
        context = "\n\n".join([doc.page_content for doc in docs])
        sources = list(set([os.path.basename(doc.metadata.get("source", "Unknown")) for doc in docs]))

        prompt = f"""
        Answer the question strictly using the provided context.
        Context: {context}
        Question: {question}
        """

        response = model.generate_content(prompt)
        return {"answer": response.text, "sources": sources}
    except Exception as e:
        print(f"Error: {e}")
        raise e