// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "@/components/LoginPage";
import Dashboard from "@/components/Dashboard";
import ChatPage from "@/components/ChatPage";
import UploadPage from "@/components/UploadPage";   
import DocsPage from "@/components/DocsPage";      
import ProfilePage from "@/components/ProfilePage"; 
import RegisterPage from "@/components/RegisterPage";
import AccountSetupPage from "@/components/Accountsetup"; 
import ThemeToggle from "@/components/ThemeToggle"


function App() {
  return (
    <Router>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/upload" element={<UploadPage />} />   
        <Route path="/docs" element={<DocsPage />} />       
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account-setup" element={<AccountSetupPage />} /> {/* New route for account setup */}
      </Routes>
    </Router>
  );
}

export default App;