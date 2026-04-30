import os
import warnings

os.environ["HF_HUB_DISABLE_TELEMETRY"] = "1"
os.environ["HF_HUB_DISABLE_PROGRESS_BARS"] = "1"
os.environ["TRANSFORMERS_VERBOSITY"] = "error"
warnings.filterwarnings("ignore", message=".*unauthenticated requests.*")

from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from langchain_core.vectorstores import VectorStoreRetriever
from langchain_core.embeddings import Embeddings

from typing import List, Optional
import os

CHROMA_PATH = "chroma_db"
COLLECTION_NAME = "rag-docs"

def get_embedding_model() -> Embeddings:
    return HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

def create_or_load_collection(top_k: int = 3) -> VectorStoreRetriever:
    embedding_function = get_embedding_model()

    vectordb = Chroma(
        persist_directory=CHROMA_PATH,
        collection_name=COLLECTION_NAME,
        embedding_function=embedding_function
    )

    retriever = vectordb.as_retriever(search_kwargs={"k": top_k})
    return retriever

def store_embeddings(docs: List[Document]) -> None:
    embedding_function = get_embedding_model()

    vectordb = Chroma.from_documents(
        documents=docs,
        embedding=embedding_function,
        persist_directory=CHROMA_PATH,
        collection_name=COLLECTION_NAME
    )
