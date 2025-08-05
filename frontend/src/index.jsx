import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ Import ThemeProvider
import { ThemeProvider } from "@/context/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>  {/* ✅ Wrap your App */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
