import os
import re
import time
import certifi

# Fix SSL certificate resolution on Windows — must run before any HTTPS imports
os.environ["SSL_CERT_FILE"] = certifi.where()
os.environ["REQUESTS_CA_BUNDLE"] = certifi.where()

from openai import OpenAI, APIError, RateLimitError
from dotenv import load_dotenv

# Path fix for local imports
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent.parent))

try:
    from backend.app.vectorstore.chroma_client import create_or_load_collection
except ImportError:
    from vectorstore.chroma_client import create_or_load_collection

load_dotenv()

# Initialize the OpenAI client for OpenRouter
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

# Select the OpenRouter model
MODEL_NAME = "google/gemini-2.0-flash-001"
print(f"--- 🤖 Initializing OpenRouter with model: {MODEL_NAME} ---")

MAX_RETRIES = 3

def _call_llm_with_retry(prompt: str) -> str:
    """Call OpenRouter API with automatic retry on rate-limit errors."""
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            response = client.chat.completions.create(
                model=MODEL_NAME,
                messages=[{"role": "user", "content": prompt}],
            )
            return response.choices[0].message.content
        except RateLimitError as e:
            delay = 10 * attempt  # default backoff

            if attempt < MAX_RETRIES:
                print(f"  ⏳ Rate-limited by OpenRouter. Waiting {delay}s before retry ({attempt}/{MAX_RETRIES})…")
                time.sleep(delay)
            else:
                raise RuntimeError(
                    f"OpenRouter rate limit exceeded after {MAX_RETRIES} retries. "
                    f"Wait a minute and try again."
                ) from e
        except APIError as e:
            raise RuntimeError(f"OpenRouter API error: {e}") from e


def query_doc(question: str, top_k: int = 3):
    try:
        retriever = create_or_load_collection(top_k=top_k)
        # Use .invoke() to satisfy the LangChain deprecation warning
        docs = retriever.invoke(question)
        
        context = "\n\n".join([doc.page_content for doc in docs])
        sources = list(set([os.path.basename(doc.metadata.get("source", "Unknown")) for doc in docs]))

        prompt = f"""
        Answer the question strictly using the provided context.
        Context: {context}
        Question: {question}
        """

        answer = _call_llm_with_retry(prompt)
        return {"answer": answer, "sources": sources}
    except Exception as e:
        print(f"Error: {e}")
        raise e