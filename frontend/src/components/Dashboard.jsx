// src/components/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom"; // Essential for navigation links
import { Card, CardContent } from "@/components/ui/card"; // Imports Card/CardContent
import { Button } from "@/components/ui/button"; // Imports Button

const Dashboard = () => {
  return (
    // Changed: Use the new dark background and foreground text
    <div className="min-h-screen bg-background text-foreground p-10">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-foreground border-b border-border/50 pb-4">
        Welcome to RAG Agent Platform
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Card Styling Updates */}
        {/* Upload File */}
        <Card className="bg-card hover:bg-card/80 transition duration-300 border-2 border-border shadow-xl hover:shadow-primary/30">
          <CardContent className="flex flex-col items-center p-8">
            <span className="text-6xl mb-4">⬆️</span> 
            <h2 className="text-2xl font-bold mb-2">Upload File</h2>
            <p className="text-sm text-muted-foreground text-center mb-4">Upload documents to make them queryable</p>
            <Link to="/upload">
              <Button className="mt-4 w-full bg-primary shadow-lg shadow-primary/30 hover:bg-primary/80">Go to Upload</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Ask Questions */}
        <Card className="bg-card hover:bg-card/80 transition duration-300 border-2 border-border shadow-xl hover:shadow-secondary/30">
          <CardContent className="flex flex-col items-center p-8">
            <span className="text-6xl mb-4">💬</span> 
            <h2 className="text-2xl font-bold mb-2">AI Q&A</h2>
            <p className="text-sm text-muted-foreground text-center mb-4">Ask questions to your uploaded docs</p>
            <Link to="/chat">
              <Button className="mt-4 w-full bg-secondary shadow-lg shadow-secondary/30 hover:bg-secondary/80">Start Chat</Button>
            </Link>
          </CardContent>
        </Card>

        {/* View Docs */}
        <Card className="bg-card hover:bg-card/80 transition duration-300 border-2 border-border shadow-xl hover:shadow-accent/30">
          <CardContent className="flex flex-col items-center p-8">
            <span className="text-6xl mb-4">📚</span> 
            <h2 className="text-2xl font-bold mb-2">View Docs</h2>
            <p className="text-sm text-muted-foreground text-center mb-4">Browse or manage stored documents</p>
            <Link to="/docs">
              <Button variant="outline" className="mt-4 w-full border-primary text-primary hover:bg-primary/10">Open Docs</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Profile */}
        <Card className="bg-card hover:bg-card/80 transition duration-300 border-2 border-border shadow-xl hover:shadow-muted/30">
          <CardContent className="flex flex-col items-center p-8">
            <span className="text-6xl mb-4">👤</span> 
            <h2 className="text-2xl font-bold mb-2">User Profile</h2>
            <p className="text-sm text-muted-foreground text-center mb-4">View login info or manage sessions</p>
            <Link to="/profile">
              <Button variant="ghost" className="mt-4 w-full text-foreground hover:bg-muted">View Profile</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;