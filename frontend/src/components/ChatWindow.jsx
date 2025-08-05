// src/components/ChatWindow.jsx

import React, { useState, useRef } from "react";
import { Sparkles, Upload, Send, Menu, X, Shield, Clock, Users} from "lucide-react";
import Message from "./Message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";



function ChatWindow() {
  const [messages, setMessages] = useState([
    { 
      id: 0,
      role: "assistant", 
      sender: "bot", // ensure this matches your rendering logic
      text: "Hi! Ask me anything about your internal docs 📄",
      timestamp: new Date() // ✅ add this
    }
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents newline
      handleSend(); // Calls your send message logic
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

  const userMessage = {
    id: Date.now(),
    text: inputValue,
    sender: "user",
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInputValue('');
  setIsTyping(true);

  try {
    const response = await fetch("http://127.0.0.1:8000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: userMessage.text })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const botMessage = {
      id: Date.now() + 1,
      text: data.answer || "Hmm, I couldn't find a clear answer.",
      sender: "bot",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  } catch (error) {
    console.error("Error fetching AI response:", error);
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 2,
        text: "⚠️ Something went wrong. Please check the backend and try again.",
        sender: "bot",
        timestamp: new Date()
      }
    ]);
  } finally {
    setIsTyping(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 dark:bg-emerald-800/80 dark:border-emerald/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 ">
              <div className="relative ">
                <Sparkles className="h-8 w-8 text-blue-500 dark:text-emerald-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 dark:bg-gradient-to-r dark:from-green-500 dark:to-emerald-600 rounded-full animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:bg-gradient-to-r dark:from-green-500 dark:to-emerald-600 bg-clip-text text-transparent">
                PolicyBot
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-green-400 hover:text-gray-900 dark:hover:text-green-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 dark:text-green-400 hover:text-gray-900 dark:hover:text-green-600 transition-colors">
                How it Works
              </a>
              <a href="#testimonials" className="text-gray-600 dark:text-green-400 hover:text-gray-900 dark:hover:text-green-600 transition-colors">
                Reviews
              </a>
              <Link to="/">
                <Button
                  variant="outline"
                  className="border-gray-500 text-gray-800 dark:text-green-400 dark:border-emerald-500 hover:border-blue-500 hover:text-blue-600 dark:hover:text-green-600 dark:hover:border-emerald-600 bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
            </nav>
       

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-green-400 dark:hover:text-green-600 transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 dark:text-green-400 dark:hover:text-green-600 transition-colors">
                  How it Works
                </a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900 dark:text-green-400 dark:hover:text-green-600 transition-colors">
                  Reviews
                </a>
                <Link to="/">
                  <Button
                    variant="outline"
                    className="w-fit text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600 dark:text-green-400 dark:hover:text-green-600 dark:border-emerald-500 dark:hover:border-emerald-600"
                  >
                    Sign In
                  </Button>
                </Link>
                
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Chat Container */}
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold">PolicyBot Assistant</h2>
                <p className="text-sm opacity-90">Ask anything about your insurance documents</p>
              </div>
            </div>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-2 transition-colors">
              <Upload className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm border'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="flex items-center space-x-2 mb-1">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      <span className="text-xs font-medium text-blue-600">PolicyBot</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp
                      ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : ""}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    <span className="text-xs font-medium text-blue-600">PolicyBot</span>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t bg-white p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="w-full resize-none border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  inputValue.trim()
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-white py-12 border-t">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Insurance made simple</h3>
            <p className="text-gray-600">No more confusing jargon or endless phone calls. Get the answers you need, when you need them.</p>
          </div>
          <div className="flex justify-center items-center space-x-16 text-gray-600">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <span className="font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-medium">Instant Answers</span>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <span className="font-medium">Human-Friendly</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChatWindow;