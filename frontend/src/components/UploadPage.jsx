// frontend/src/components/UploadPage.jsx
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, ArrowLeft, Sparkles, Menu, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const UploadPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false) 

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
      setMessage("")
    } else {
      setSelectedFile(null)
    }
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault()
    setIsDragOver(false)
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0])
      setMessage("")
    }
  }, [])

  const handleDragOver = useCallback((event) => {
    event.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false)
  }, [])

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setMessage("")
    const fileInput = document.getElementById("file-upload")
    if (fileInput && fileInput instanceof HTMLInputElement) fileInput.value = ""
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file first.")
      return
    }

    setIsLoading(true)
    setMessage("Uploading...")

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const response = await fetch("http://127.0.0.1:8000/uploadfile/", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setMessage(`File uploaded successfully: ${data.filename}`)
      setSelectedFile(null)
      // Reset file input
      const fileInput = document.getElementById("file-upload")
      if (fileInput && fileInput instanceof HTMLInputElement) fileInput.value = ""
    } catch (error) {
      console.error("Error uploading file:", error)
      setMessage(`Upload failed: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:bg-[#0C1B1B] transition-colors duration-700 z-10">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400/20 dark:block hidden rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute top-[20%] right-0 w-80 h-80 bg-teal-300/20 dark:block hidden rounded-full blur-3xl translate-x-1/3 -translate-y-1/2 z-0" />
      <div className="absolute bottom-[10%] left-[40%] w-80 h-80 bg-lime-300/20 dark:block hidden rounded-full blur-3xl -translate-x-1/2 z-0" />

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
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <Card className="w-full bg-white/20 dark:bg-white/5 max-w-[600px] rounded-lg shadow-lg overflow-hidden border-none">
          {/* Blue accent bar */}
          <div className="h-2 bg-policybot-accent-blue"></div>

          <CardHeader className="text-center pt-8 pb-4">
            <CardTitle className="text-3xl font-bold text-purple-600 dark:text-emerald-400">Upload Documents</CardTitle>
            <p className="text-medium-gray mt-2">Select a file to upload and make it queryable by the AI.</p>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Upload Area */}
            {!selectedFile ? (
              <div
                className={cn(
                  "flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg transition-colors duration-200 cursor-pointer",
                  isDragOver
                    ? "border-policybot-accent-blue bg-policybot-accent-blue/10"
                    : "border-gray-300 bg-gray-50 hover:border-policybot-primary-blue hover:bg-gray-100",
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <UploadCloud
                  className="mx-auto h-12 w-12 mb-4"
                  style={{ stroke: "url(#uploadGradient)" }}
                />
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="uploadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#bf66e2ff" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className="text-lg font-semibold text-dark-gray mb-2">Drop your files here, or browse</p>
                <p className="text-sm text-gray mb-4">Supports PDF and image formats (JPG, PNG)</p>
                <Button
                  type="button"
                  className="bg-primary-blue hover:bg-blue/90 text-purple-600 px-6 py-3 rounded-md"
                >
                  Choose File
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={isLoading}
                  aria-label="File Upload"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="text-policybot-dark-gray font-medium">{selectedFile.name}</span>
                  <span className="text-sm text-policybot-medium-gray">
                    ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-600"
                  aria-label="Remove file"
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>
            )}

            {/* Message Display */}
            {message && (
              <div
                className={cn(
                  "p-3 rounded-lg text-sm",
                  message.includes("failed") || message.includes("Please select")
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : message.includes("successfully")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200",
                )}
              >
                {message}
              </div>
            )}

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              disabled={isLoading || !selectedFile}
              className="w-full h-12 text-lg font-semibold text-purple-600 rounded-md bg-gradient-blue hover:bg-purple-200/90 transition-opacityw-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25 relative overflow-hidden group dark:from-green-500 dark:to-emerald-600 dark:hover:from-green-00 dark:hover:to-emerald-700 dark:hover:shadow-green-500/25 duration-200"
            >
              {isLoading ? "Uploading..." : "Upload File"}
            </Button>

            {/* Back Link */}
          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to PolicyBot</span>
          </button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};  

export default UploadPage;