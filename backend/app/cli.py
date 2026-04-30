#!/usr/bin/env python3
"""
Internal Docs Q&A Agent — CLI Interface
========================================
A command-line interface for ingesting documents, querying them via RAG,
and managing your document library.

Usage:
    python -m backend.app.cli                  # Interactive mode
    python -m backend.app.cli ingest <path>    # Ingest documents
    python -m backend.app.cli ask "<question>" # Ask a question
    python -m backend.app.cli docs             # List documents
    python -m backend.app.cli upload <file>    # Upload a document
"""

import os
import sys
import shutil
import argparse
from pathlib import Path

# --- Path fix so imports resolve from the project root ---
ROOT_DIR = str(Path(__file__).resolve().parent.parent.parent)
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.prompt import Prompt
from rich.markdown import Markdown
from rich.text import Text
from rich import box
from datetime import datetime

console = Console()

# Paths
DOCS_DIR = os.path.join(ROOT_DIR, "docs", "sample docs")
os.makedirs(DOCS_DIR, exist_ok=True)


# ── Lazy loaders (avoid slow imports until needed) ────────────────────────

def _get_qa_chain():
    """Lazy-load the QA chain to avoid slow startup for non-query commands."""
    from backend.app.core.qa_chain import query_doc
    return query_doc


def _get_ingestion_pipeline():
    """Lazy-load the ingestion pipeline."""
    from backend.app.run_ingestion import run_ingestion_pipeline
    return run_ingestion_pipeline


# ── Commands ──────────────────────────────────────────────────────────────

def cmd_ingest(path: str):
    """Ingest documents from a file or directory into the vector store."""
    target = os.path.abspath(path)
    if not os.path.exists(target):
        console.print(f"[bold red]✗[/] Path not found: {target}")
        sys.exit(1)

    console.print(Panel(
        f"[bold cyan]Ingesting:[/] {target}",
        title="📂 Document Ingestion",
        border_style="cyan",
    ))

    with console.status("[bold green]Processing documents…", spinner="dots"):
        pipeline = _get_ingestion_pipeline()
        pipeline(target)

    console.print("[bold green]✓[/] Ingestion complete!\n")


def cmd_ask(question: str, top_k: int = 3):
    """Ask a question against the ingested documents."""
    console.print(Panel(
        f"[bold yellow]{question}[/]",
        title="❓ Your Question",
        border_style="yellow",
    ))

    with console.status("[bold green]Thinking…", spinner="dots"):
        query_doc = _get_qa_chain()
        result = query_doc(question, top_k=top_k)

    # Answer
    console.print(Panel(
        Markdown(result["answer"]),
        title="💡 Answer",
        border_style="green",
        padding=(1, 2),
    ))

    # Sources
    if result.get("sources"):
        src_text = "\n".join(f"  • {s}" for s in result["sources"])
        console.print(Panel(
            src_text,
            title="📄 Sources",
            border_style="dim",
        ))
    console.print()


def cmd_list_docs():
    """List all documents in the upload directory."""
    table = Table(
        title="📚 Uploaded Documents",
        box=box.ROUNDED,
        header_style="bold magenta",
        show_lines=True,
    )
    table.add_column("#", style="dim", width=4)
    table.add_column("Filename", style="cyan")
    table.add_column("Size", justify="right", style="green")
    table.add_column("Last Modified", style="yellow")

    if not os.path.isdir(DOCS_DIR):
        console.print("[bold red]✗[/] Documents directory not found.")
        return

    files = [
        f for f in os.listdir(DOCS_DIR)
        if os.path.isfile(os.path.join(DOCS_DIR, f))
    ]

    if not files:
        console.print("[dim]No documents found. Use [bold]upload[/bold] or [bold]ingest[/bold] to add documents.[/dim]\n")
        return

    for i, fname in enumerate(sorted(files), 1):
        fpath = os.path.join(DOCS_DIR, fname)
        size_bytes = os.path.getsize(fpath)
        modified = datetime.fromtimestamp(os.path.getmtime(fpath)).strftime("%Y-%m-%d %H:%M")

        # Human-readable size
        if size_bytes < 1024:
            size_str = f"{size_bytes} B"
        elif size_bytes < 1024 * 1024:
            size_str = f"{size_bytes / 1024:.1f} KB"
        else:
            size_str = f"{size_bytes / (1024 * 1024):.1f} MB"

        table.add_row(str(i), fname, size_str, modified)

    console.print(table)
    console.print()


def cmd_upload(file_path: str):
    """Copy a file into the documents directory and optionally ingest it."""
    src = os.path.abspath(file_path)
    if not os.path.isfile(src):
        console.print(f"[bold red]✗[/] File not found: {src}")
        sys.exit(1)

    dest = os.path.join(DOCS_DIR, os.path.basename(src))
    shutil.copy2(src, dest)
    console.print(f"[bold green]✓[/] Copied [cyan]{os.path.basename(src)}[/] → [dim]{DOCS_DIR}[/dim]")

    run_ingest = Prompt.ask(
        "  Run ingestion on this file?",
        choices=["y", "n"],
        default="y",
    )
    if run_ingest == "y":
        cmd_ingest(dest)


def cmd_interactive():
    """Launch an interactive REPL-style Q&A session."""
    console.print(Panel(
        "[bold]Internal Docs Q&A Agent[/]\n"
        "Ask questions about your ingested documents.\n\n"
        "[dim]Commands:[/]\n"
        "  [cyan]/ingest <path>[/]  — Ingest documents\n"
        "  [cyan]/upload <file>[/]  — Upload a document\n"
        "  [cyan]/docs[/]           — List documents\n"
        "  [cyan]/help[/]           — Show this help\n"
        "  [cyan]/quit[/]           — Exit",
        title="🤖 Internal Docs Q&A Agent",
        subtitle="Type a question or a /command",
        border_style="bright_blue",
        padding=(1, 2),
    ))

    while True:
        try:
            user_input = Prompt.ask("\n[bold bright_blue]You[/]")
        except (KeyboardInterrupt, EOFError):
            console.print("\n[dim]Goodbye![/dim]")
            break

        user_input = user_input.strip()
        if not user_input:
            continue

        # Slash commands
        if user_input.startswith("/"):
            parts = user_input.split(maxsplit=1)
            cmd = parts[0].lower()
            arg = parts[1] if len(parts) > 1 else ""

            if cmd in ("/quit", "/exit", "/q"):
                console.print("[dim]Goodbye![/dim]")
                break
            elif cmd == "/ingest":
                if not arg:
                    console.print("[red]Usage: /ingest <path>[/red]")
                else:
                    cmd_ingest(arg)
            elif cmd == "/upload":
                if not arg:
                    console.print("[red]Usage: /upload <file>[/red]")
                else:
                    cmd_upload(arg)
            elif cmd in ("/docs", "/list"):
                cmd_list_docs()
            elif cmd == "/help":
                console.print(
                    "[cyan]/ingest <path>[/]  — Ingest documents\n"
                    "[cyan]/upload <file>[/]  — Upload a document\n"
                    "[cyan]/docs[/]           — List documents\n"
                    "[cyan]/quit[/]           — Exit"
                )
            else:
                console.print(f"[red]Unknown command:[/red] {cmd}")
            continue

        # Otherwise treat as a question
        cmd_ask(user_input)


# ── Argument parser ───────────────────────────────────────────────────────

def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="internal-docs-qa",
        description="Internal Docs Q&A Agent — CLI",
    )
    sub = parser.add_subparsers(dest="command")

    # ingest
    p_ingest = sub.add_parser("ingest", help="Ingest documents into the vector store")
    p_ingest.add_argument("path", help="Path to a PDF file or directory of PDFs")

    # ask
    p_ask = sub.add_parser("ask", help="Ask a question about ingested documents")
    p_ask.add_argument("question", help="The question to ask")
    p_ask.add_argument("-k", "--top-k", type=int, default=3, help="Number of chunks to retrieve (default: 3)")

    # docs
    sub.add_parser("docs", help="List uploaded documents")

    # upload
    p_upload = sub.add_parser("upload", help="Upload a document to the docs directory")
    p_upload.add_argument("file", help="Path to the file to upload")

    return parser


def main():
    parser = build_parser()
    args = parser.parse_args()

    if args.command is None:
        # No sub-command → interactive mode
        cmd_interactive()
    elif args.command == "ingest":
        cmd_ingest(args.path)
    elif args.command == "ask":
        cmd_ask(args.question, top_k=args.top_k)
    elif args.command == "docs":
        cmd_list_docs()
    elif args.command == "upload":
        cmd_upload(args.file)


if __name__ == "__main__":
    main()
