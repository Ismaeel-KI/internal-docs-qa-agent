"use client"

import { useState, useEffect } from "react"
import { Sparkles, Upload, MessageCircle, CheckCircle, Menu, X, Star, Shield, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Link } from "react-router-dom";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [robotEyesBlink, setRobotEyesBlink] = useState(false)

  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const messages = [
    { role: "user", text: "What's my deductible for urgent care?" },
    { role: "bot", text: "Your urgent care deductible is $150 per visit, and you've met $50 so far this year." },
    { role: "user", text: "How much is left to pay?" },
    { role: "bot", text: "You still have $100 remaining to meet your deductible." },
  ];



  const testimonials = [
    {
      quote: "PolicyBot helped me understand my coverage in minutes, not hours. Finally, insurance that makes sense!",
      author: "Sarah Chen",
      role: "Small Business Owner",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      quote: "I uploaded my policy and got instant answers about my deductible. This is the future of healthcare.",
      author: "Marcus Johnson",
      role: "Teacher",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      quote: "No more calling customer service and waiting on hold. PolicyBot gives me real answers instantly.",
      author: "Emily Rodriguez",
      role: "Freelancer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Robot eye blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setRobotEyesBlink(true)
      setTimeout(() => setRobotEyesBlink(false), 150)
    }, 3000)
    return () => clearInterval(blinkInterval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000); // ← a bit slower
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let index = 0;
    let step = 0;

    const interval = setInterval(() => {
      if (step === 0) {
        setTyping(true);
        setTimeout(() => {
          setDisplayedMessages([messages[index]]);
          setTyping(false);
          step = 1;
        }, 1000);
      } else if (step === 1) {
        setTyping(true);
        setTimeout(() => {
          setDisplayedMessages((prev) => [...prev, messages[index + 1]]);
          setTyping(false);
          step = 2;
        }, 1000);
      } else {
        setTimeout(() => {
          setDisplayedMessages([]);
          index += 2;
          if (index >= messages.length) {
            index = 0;
          }
          step = 0;
        }, 1500);
      }
    }, 1500);

  return () => clearInterval(interval);
}, []);




  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] transition-colors duration-700 z-10">
        
    {/* Glowy blurred elements (only visible in dark mode) */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400/20 dark:block hidden rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0" />
    <div className="absolute top-[20%] right-0 w-80 h-80 bg-teal-300/20 dark:block hidden rounded-full blur-3xl translate-x-1/3 -translate-y-1/2 z-0" />
    <div className="absolute bottom-[10%] left-[40%] w-80 h-80 bg-lime-300/20 dark:block hidden rounded-full blur-3xl -translate-x-1/2 z-0" />
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

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 dark:bg-[#0c1b1b] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Your health insurance,{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-emerald-400 dark:to-lime-400 bg-clip-text text-transparent">
                  finally simple
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Upload your insurance documents and ask questions in plain English.
                Get instant, accurate answers about your coverage, costs, and benefits.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/upload">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-emerald-500 dark:to-lime-500 hover:from-blue-700 hover:to-purple-700 dark:hover:from-emerald-600 dark:hover:to-lime-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Upload & Get Started
                  </Button>
                </Link>
                <Link to="/">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-blue-600 dark:border-emerald-400 text-blue-600 dark:text-emerald-300 hover:bg-blue-50 dark:hover:bg-emerald-900/20 px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-all duration-200 bg-transparent"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Ask a Question
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500 dark:text-emerald-300" />
                  <span>Instant Answers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-500 dark:text-lime-300" />
                  <span>Human-Friendly</span>
                </div>
              </div>
            </div>

            {/* Robot Character */}
            <div className="relative flex justify-center lg:justify-end py-0 mx-[-183px]">
              <div className="relative w-80 ml-4 md:ml-8 lg:mr-80 h-[324px]">
                {/* Robot Body */}
                <div className="w-56 h-72 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-emerald-500 dark:to-lime-500 rounded-3xl shadow-2xl relative overflow-hidden mx-auto">
                  {/* Robot Face */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                    {/* Eyes */}
                    <div className="flex space-x-6 mb-3">
                      {[...Array(2)].map((_, i) => (
                        <div key={i}
                          className={`w-10 bg-white rounded-full flex items-center justify-center transition-all duration-150 ${robotEyesBlink ? "h-1" : "h-10"}`}>
                          {!robotEyesBlink && (
                            <div className="w-5 h-5 bg-blue-600 dark:bg-emerald-400 rounded-full" />
                          )}
                        </div>
                      ))}
                    </div>
                    {/* Mouth */}
                    <div className={`w-6 h-3 bg-white rounded-full mx-auto transition-all duration-300 ${typing ? "animate-mouth-pulse" : ""}`} />
                  </div>
                </div>

                {/* Robot Arms */}
                <div className="absolute top-24 left-8 w-6 h-12 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-emerald-500 dark:to-lime-500 rounded-full shadow-lg" />
                <div className="absolute top-24 right-8 w-6 h-12 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-emerald-500 dark:to-lime-500 rounded-full shadow-lg" />

                {/* Sparkles */}
                <div className="absolute -top-2 left-4 w-5 h-5 text-yellow-400 animate-pulse">
                  <Sparkles className="w-full h-full" />
                </div>
                <div className="absolute top-6 -right-2 w-4 h-4 text-pink-400 animate-pulse delay-1000">
                  <Sparkles className="w-full h-full" />
                </div>
                <div className="absolute bottom-4 left-2 w-4 h-4 text-cyan-400 animate-pulse delay-500">
                  <Sparkles className="w-full h-full" />
                </div>

                {/* Chat Bubble */}
                <div className="absolute top-6 left-[270px] w-[320px] space-y-3">
                  {displayedMessages.map((msg, i) => (
                    <div key={i} className={`relative flex ${msg.role === "bot" ? "justify-start" : "justify-end"}`}>
                      <div className={`relative px-4 py-3 max-w-[80%] text-sm leading-snug rounded-lg ${
                        msg.role === "bot"
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-bl-none"
                          : "bg-blue-500 dark:bg-emerald-500 text-white rounded-br-none"
                      }`}>
                        {msg.text}
                        {/* Tail */}
                        <div className={`absolute w-2 h-2 bg-inherit rotate-45 ${
                          msg.role === "bot" ? "left-[-4px] bottom-2" : "right-[-4px] bottom-2"
                        }`} />
                      </div>
                    </div>
                  ))}

                  {typing && (
                    <div className="flex justify-start">
                      <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 text-sm rounded-lg rounded-bl-none relative">
                        Typing...
                        <div className="absolute w-2 h-2 bg-gray-200 dark:bg-gray-700 rotate-45 left-[-4px] bottom-2" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-white/50 dark:bg-[#0b1f1c] backdrop-blur-sm transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Insurance made simple
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              No more confusing jargon or endless phone calls. Get the answers you need, when you need them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-lg bg-white/80 dark:bg-white/10 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Upload Anything
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Drag and drop your insurance cards, policy documents, or EOBs. We'll read and understand them
                  instantly.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-lg bg-white/80 dark:bg-white/10 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 dark:from-rose-500 dark:to-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Ask in Plain English
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  No insurance jargon required. Ask questions like you would ask a friend who actually understands your
                  policy.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-lg bg-white/80 dark:bg-white/10 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 dark:from-emerald-400 dark:to-lime-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Get Real Answers
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Receive accurate, personalized answers based on your actual coverage. No generic responses or
                  guesswork.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-white/50 dark:bg-[#0a1b19] backdrop-blur-sm transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How it works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get answers about your health insurance in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-emerald-500 dark:to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 dark:from-green-300 dark:to-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                {/* Arrow */}
                <div className="hidden md:block absolute top-10 -right-16 w-32 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 dark:from-emerald-300 dark:to-lime-300">
                  <div className="absolute -right-2 -top-1 w-3 h-3 bg-purple-300 dark:bg-lime-300 transform rotate-45" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Upload Your Documents</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Upload your insurance card, policy, or any healthcare document
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-emerald-500 dark:to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 dark:from-rose-400 dark:to-fuchsia-500 rounded-2xl flex items-center justify-center mx-auto">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                {/* Arrow */}
                <div className="hidden md:block absolute top-10 -right-16 w-32 h-0.5 bg-gradient-to-r from-purple-300 to-green-300 dark:from-fuchsia-300 dark:to-emerald-300">
                  <div className="absolute -right-2 -top-1 w-3 h-3 bg-green-300 dark:bg-emerald-300 transform rotate-45" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ask Your Question</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Type your question in plain English - no insurance jargon needed
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-emerald-500 dark:to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 dark:from-lime-400 dark:to-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Get Your Answer</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive a clear, accurate answer based on your specific coverage
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 dark:from-[#042f2c] dark:to-[#0b2e28] text-white transition-colors duration-300"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">What our users say</h2>
          <p className="text-xl text-blue-100 dark:text-teal-200 mb-16">
            Join thousands who've made insurance simple with PolicyBot
          </p>

          {/* Testimonial Carousel */}
          <div className="relative h-[300px] mb-8">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentTestimonial
                    ? "opacity-100 translate-x-0 z-10"
                    : "opacity-0 translate-x-8 z-0 pointer-events-none"
                }`}
              >
                <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-xl h-full flex flex-col justify-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-2xl font-medium mb-8 leading-relaxed text-white">
                    "{t.quote}"
                  </blockquote>

                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={t.avatar || "/placeholder.svg"}
                      alt={t.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-lg text-white">{t.author}</div>
                      <div className="text-blue-200 dark:text-teal-300">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicator Buttons */}
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-white" : "bg-white/30 dark:bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </section>


      {/* Final CTA Section */}
      <section className="py-20 bg-white dark:bg-[#0d1c1a] transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to understand your insurance?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            Join thousands of people who've made their health insurance finally make sense.
            Upload your documents and get started in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:bg-gradient-to-r dark:from-green-500 dark:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Upload className="mr-2 h-5 w-5" />
                Get Started Free
              </Button>
            </Link>

            <Link to="/">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 px-10 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-all duration-200 bg-transparent"
              >
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-[#0b1e1b] text-gray-800 dark:text-gray-200 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-8 w-8 text-purple-600 dark:text-emerald-300" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:bg-gradient-to-r dark:from-green-400 dark:to-emerald-500 bg-clip-text text-transparent">
                  PolicyBot
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                Making health insurance simple and understandable for everyone. Get instant answers about your coverage
                in plain English.
              </p>
              <div className="flex space-x-4">
                {["f", "t", "in"].map((label, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-emerald-600 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-bold dark:text-white">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Product</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                {["Features", "How it Works", "Pricing", "Security"].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Company</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                {["About", "Blog", "Careers", "Contact"].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 PolicyBot. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "HIPAA Compliance"].map((link, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
