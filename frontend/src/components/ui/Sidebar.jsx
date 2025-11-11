// src/components/ui/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", path: "/Dashboard", icon: "🏠" }, 
  { name: "Ask AI", path: "/chat", icon: "💬" },
  { name: "Upload Docs", path: "/upload", icon: "⬆️" },
  { name: "View Docs", path: "/docs", icon: "📚" },
  { name: "Profile", path: "/profile", icon: "👤" },
];

export default function Sidebar() {
  return (
    // Updated background and border style
    <aside className="w-64 bg-card text-foreground p-6 flex flex-col space-y-8 border-r border-border shadow-xl">
      <div className="text-3xl font-extrabold text-primary border-b pb-4 border-primary/30">
        RAG Agent <span className="text-secondary">AI</span>
      </div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 text-lg font-medium",
              // New active state: primary background, white text, strong shadow
              window.location.pathname === item.path 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                : "text-foreground hover:bg-muted" // Soft hover for non-active links
            )}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      {/* Footer / Logout Placeholder */}
      <div className="mt-auto pt-4 border-t border-border">
         <Link to="/" className="flex items-center space-x-4 p-3 rounded-lg transition-colors hover:bg-muted text-lg font-medium">
            <span className="text-xl">🚪</span>
            <span>Logout</span>
         </Link>
      </div>
    </aside>
  );
}