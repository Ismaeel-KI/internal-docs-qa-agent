# Internal Docs Q&A Agent

## Overview
A CLI-powered Retrieval Augmented Generation (RAG) application that lets you ingest internal PDF documents and query them using AI. Ask questions in natural language and get answers grounded in your documents — all from the terminal.

## Key Features
* **Document Ingestion** — Load PDFs (single file or entire directories) into a ChromaDB vector store.
* **AI-Powered Q&A** — Ask questions and receive answers backed by document context, powered by Google Gemini.
* **Document Management** — List and upload documents from the command line.
* **Interactive Mode** — A REPL-style session for continuous Q&A with slash-commands.
* **Rich CLI** — Beautiful terminal output with tables, panels, spinners, and Markdown rendering.

## Technologies
| Layer | Stack |
|---|---|
| **LLM** | Google Gemini (via `google-generativeai`) |
| **Embeddings** | `sentence-transformers/all-MiniLM-L6-v2` |
| **Vector Store** | ChromaDB |
| **RAG Framework** | LangChain |
| **PDF Parsing** | PyMuPDF (`fitz`) |
| **CLI UI** | Rich |

## Folder Structure
```
internal-docs-qa-agent/
├── backend/
│   ├── app/
│   │   ├── cli.py              # CLI entry point (interactive & sub-commands)
│   │   ├── __main__.py         # Allows `python -m backend.app`
│   │   ├── api.py              # FastAPI application & API endpoints
│   │   ├── model.py            # Pydantic models
│   │   ├── rag_pipeline.py     # RAG pipeline logic
│   │   ├── run_ingestion.py    # Ingestion pipeline runner
│   │   ├── config/
│   │   │   └── settings.py     # Configuration constants
│   │   ├── core/
│   │   │   └── qa_chain.py     # Q&A chain (Gemini + ChromaDB retriever)
│   │   ├── ingestion/
│   │   │   ├── document_loader.py
│   │   │   ├── chunker.py
│   │   │   └── embedder.py
│   │   └── vectorstore/
│   │       └── chroma_client.py
│   └── requirements.txt
├── docs/                       # Uploaded documents stored here
│   └── sample docs/
├── .env                        # GOOGLE_API_KEY goes here
├── .gitignore
└── README.md
```

## Setup

### Prerequisites
* Python 3.9+
* A Google API key with Gemini access

### 1. Clone the Repository
```bash
git clone https://github.com/Manikandan1511/internal-docs-qa-agent
cd internal-docs-qa-agent
```

### 2. Create a Virtual Environment
```bash
python -m venv .venv

# Activate:
# macOS/Linux:
source .venv/bin/activate
# Windows (PowerShell):
.venv\Scripts\Activate.ps1
```

### 3. Install Dependencies
```bash
pip install -r backend/requirements.txt
```

### 4. Configure Environment
Create a `.env` file in the project root:
```
GOOGLE_API_KEY=your-google-api-key-here
```

## Usage

### Interactive Mode (recommended)
Launch the interactive REPL from the **project root**:
```bash
python -m backend.app
```

This opens an interactive session where you can type questions or use slash-commands:

| Command | Description |
|---|---|
| `/ingest <path>` | Ingest a PDF or folder of PDFs |
| `/upload <file>` | Copy a file to docs & optionally ingest |
| `/docs` | List all uploaded documents |
| `/help` | Show available commands |
| `/quit` | Exit |

Type any other text to ask a question about your documents.

### Direct Commands
```bash
# Ingest documents
python -m backend.app ingest "docs/sample docs"

# Ask a question
python -m backend.app ask "What is the refund policy?"

# Ask with custom retrieval depth
python -m backend.app ask "Summarize the Q3 report" -k 5

# List uploaded documents
python -m backend.app docs

# Upload a new document
python -m backend.app upload path/to/report.pdf
```

### API Server (optional)
The FastAPI server is still available if you need HTTP access:
```bash
cd backend/app
uvicorn api:app --reload
```

#### API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/query` | Q&A query (`{"question": "..."}`) |
| `POST` | `/uploadfile/` | Upload a document |
| `GET` | `/docs/` | List documents |
| `GET` | `/profile/` | User profile |

## License
This project is open-source.
