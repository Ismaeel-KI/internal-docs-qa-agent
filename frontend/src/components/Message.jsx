// src/components/Message.jsx

import React from "react";
import { cn } from "@/lib/utils";

function Message({ role, content, className }) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        // Base styling for bubbles
        "px-5 py-3 rounded-3xl max-w-[85%] whitespace-pre-wrap text-base font-normal shadow-md",
        isUser
          ? "bg-primary text-primary-foreground self-end ml-auto rounded-br-none shadow-primary/30" // User: Cyan/Teal
          : "bg-muted text-muted-foreground self-start mr-auto rounded-tl-none shadow-muted/20",   // Assistant: Darker Muted
        className // Allows overriding classes for "Thinking..." bubble
      )}
    >
      {content}
    </div>
  );
}

export default Message;