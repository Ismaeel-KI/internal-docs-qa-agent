// src/components/ChatWindow.jsx

import React, { useState } from "react";
import Message from "./Message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function ChatWindow() { // <-- START OF FUNCTION
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Ask me anything about your internal docs 📄" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  const handleSend = async () => { // Make handleSend async
    if (!input.trim() || isLoading) return; // Prevent multiple sends

    const userMessage = { role: "user", content: input };
    // Optimistically add user message
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput(""); // Clear input immediately
    setIsLoading(true); // Set loading to true

    try {
      const response = await fetch("http://127.0.0.1:8000/query", { // Your backend API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage.content }), // Send question in expected format
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Add AI's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data.answer } // Use data.answer
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      // Add an error message to display in the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Oops! Something went wrong. Please try again. (Check backend server)" }
      ]);
    } finally {
      setIsLoading(false); // Always set loading to false
    }
  };

  return ( // <-- RETURN STATEMENT IS NOW INSIDE THE FUNCTION
    // Change: Brighter card color for contrast, strong shadow
    <Card className="bg-card shadow-2xl rounded-2xl border border-border">
      <CardContent className="p-6 space-y-6">
        {/* Changed: Adjusted height and added vibrant scrollbar styles (Tailwind utility classes are assumed) */}
        <div className="h-[550px] overflow-y-auto pr-2 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-card">
          {messages.map((msg, idx) => (
            // Ensure Message component correctly accepts className prop
            <Message key={idx} role={msg.role} content={msg.content} />
          ))}
          {/* Optional: Loading indicator */}
          {isLoading && (
            // Using secondary color (Purple) for "Thinking..." bubble
            <Message role="assistant" content="Thinking..." className="bg-secondary text-secondary-foreground" />
          )}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 h-12 bg-muted border-primary/30 focus-visible:ring-primary" // Styled input field
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            disabled={isLoading}
          />
          {/* Using primary button (Cyan) */}
          <Button onClick={handleSend} disabled={isLoading} className="h-12 text-lg shadow-md shadow-primary/40 hover:shadow-primary/60">
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} // <-- END OF FUNCTION

export default ChatWindow;