// src/components/ChatPage.jsx
import React from "react";
import Sidebar from "./ui//Sidebar"; 
import ChatWindow from "./ChatWindow";

export default function ChatPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-background">
        <h1 className="text-2xl font-bold mb-4">Ask AI Questions</h1>
        <ChatWindow />
      </main>
    </div>
  );
}