// src/components/ThemeToggle.jsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme, showTransition } = useTheme();

  return (
    <>
      <button
        onClick={toggleTheme}
        className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-full shadow transition"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {showTransition && (
        <div className="fixed inset-0 z-50 bg-black dark:bg-white animate-melt pointer-events-none" />
      )}
    </>
  );
}
