"use client"

import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react";

export default function Component() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");



  const handleContinue = (e) => {
    e.preventDefault();

    // Save to localStorage
    localStorage.setItem("registerEmail", email);
    localStorage.setItem("registerFirstName", firstName);
    localStorage.setItem("registerLastName", lastName);
    localStorage.setItem("registerPhone", phone);

    // Navigate to next step
    navigate("/account-setup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-[#091310] dark:via-[#0f1e1a] dark:to-[#122822] flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-lg">
        {/* Back Link */}
        <Link
          href="#"
          className="flex gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors mb-6 items-stretch mr-7 ml-[-430px]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to PolicyBot
        </Link>

        <Card className="w-full shadow-2xl border-0 bg-white/95 dark:bg-[#0f1e1a]/80 backdrop-blur-sm transition-colors duration-300">
          <CardHeader className="space-y-6 pb-8 pt-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-12 w-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-green-500 dark:to-emerald-600">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-purple-600 dark:text-emerald-400">PolicyBot</h1>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Join thousands who've simplified their insurance
              </p>
            </div>

            {/* Steps */}
            <div className="flex items-center justify-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold shadow-lg bg-purple-600 text-white dark:bg-green-600 dark:text-white">
                  1
                </div>
                <span className="text-sm font-medium text-purple-600 dark:text-emerald-400">Personal Info</span>
              </div>
              <div className="w-16 h-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Account Setup</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pb-8">
            <form onSubmit={handleContinue}>
              <div className="space-y-5">
                {/* Names */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-10 h-12 dark:bg-[#0f1e1a] dark:border-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="pl-10 h-12 dark:bg-[#0f1e1a] dark:border-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 dark:bg-[#0f1e1a] dark:border-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-12 dark:bg-[#0f1e1a] dark:border-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 dark:from-green-500 dark:to-emerald-600 dark:hover:from-green-00 dark:hover:to-emerald-700"
              >
                {isLoading ? "Registering..." : "Continue to Account Setup"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-[#0f1e1a] text-gray-500 dark:text-gray-400">or sign up with</span>
              </div>
            </div>

            {/* Google */}
            <Button
              variant="outline"
              className="w-full h-12 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium bg-transparent dark:text-white"
            >
              <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">{/* ...paths... */}</svg>
              Continue with Google
            </Button>

            {/* Footer Text */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/")}
                  className="text-green-600 hover:text-green-700 dark:hover:text-emerald-400 font-medium hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <div className="flex justify-center gap-4 mt-6">
          <div className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 dark:bg-emerald-800/20 dark:text-emerald-400 rounded-full text-xs font-medium shadow-sm">
            ✅ Secure Signup
          </div>
          <div className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 dark:bg-blue-800/20 dark:text-blue-400 rounded-full text-xs font-medium shadow-sm">
            ⚡ Quick Setup
          </div>
          <div className="flex items-center gap-1 px-3 py-2 bg-purple-100 text-purple-700 dark:bg-purple-800/20 dark:text-purple-300 rounded-full text-xs font-medium shadow-sm">
            🔒 HIPAA Safe
          </div>
        </div>
      </div>
    </div>

  )
}
