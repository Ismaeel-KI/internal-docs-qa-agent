"use client"

import { Link } from "react-router-dom"
import { ArrowLeft, Lock, Eye, EyeOff, Sparkles, Shield, Bell, CreditCard } from "lucide-react"
import { useState } from "react"

import { useNavigate } from "react-router-dom"

import axios from "axios";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Component() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const email = localStorage.getItem("registerEmail");
  const first_name = localStorage.getItem("registerFirstName");
  const last_name = localStorage.getItem("registerLastName");
  const phone = localStorage.getItem("registerPhone");

    // Form submission handler
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    setIsLoading(true);
    try {
        const response = await axios.post("http://127.0.0.1:8000/register/", {
        email,
        password,
        first_name,
        last_name,
        phone,
        });

        alert(response.data.message || "Account created successfully");
        
        localStorage.removeItem("registerEmail")
        localStorage.removeItem("registerFirstName")
        localStorage.removeItem("registerLastName")
        localStorage.removeItem("registerPhone")
        navigate("/");
 // redirect to login
    } catch (err) {
        alert(err.response?.data?.detail || "Account creation failed");
    } finally {
        setIsLoading(false);
    }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-[#091310] dark:via-[#0f1e1a] dark:to-[#122822] flex items-center justify-center p-4 transition-colors duration-300">
      
      <div className="w-full max-w-lg">
        {/* Back Link */}
        <Link
          to="#"
          className="flex gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors mb-6 items-stretch mr-7 ml-[-430px]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to PolicyBot
        </Link>

        <Card className="w-full shadow-2xl border-0 bg-white/95 dark:bg-[#0f1e1a]/80 backdrop-blur-sm transition-colors duration-300">
          <CardHeader className="space-y-6 pb-8 pt-8">
            {/* Logo and Title */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-12 w-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-green-500 dark:to-emerald-600">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-purple-600 dark:text-emerald-400">PolicyBot</h1>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Setup</h2>
              <p className="text-gray-600 dark:text-gray-400">Secure your account and set your preferences</p>
            </div>

            <div className="flex items-center justify-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold shadow-lg">
                  ✓
                </div>
                <span className="text-sm font-medium text-purple-600 dark:text-emerald-400">Personal Info</span>
              </div>
              <div className="w-16 h-px bg-purple-300 dark:bg-purple-800/40"></div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold shadow-lg bg-purple-600 text-white dark:bg-green-600 dark:text-white">
                  2
                </div>
                <span className="text-sm font-medium text-purple-600 dark:text-emerald-400">Account Setup</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pb-8">
            <div className="space-y-5">
              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 dark:bg-[#0f1e1a] dark:border-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Must be at least 8 characters with numbers and symbols
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 dark:bg-[#0f1e1a] dark:border-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Insurance Type */}
              <div className="space-y-2">
                <Label htmlFor="insuranceType" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Primary Insurance Interest
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                  <Select>
                    <SelectTrigger className="pl-10 h-12 dark:bg-[#0f1e1a] dark:border-gray-700 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 rounded-lg">
                      <SelectValue placeholder="Select insurance type" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#1e2d27] dark:text-white">
                      <SelectItem value="health">Health Insurance</SelectItem>
                      <SelectItem value="auto">Auto Insurance</SelectItem>
                      <SelectItem value="home">Home Insurance</SelectItem>
                      <SelectItem value="life">Life Insurance</SelectItem>
                      <SelectItem value="business">Business Insurance</SelectItem>
                      <SelectItem value="multiple">Multiple Types</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Communication Preferences */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Communication Preferences</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox id="emailUpdates" />
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-gray-400" />
                      <label htmlFor="emailUpdates" className="text-sm text-gray-700 dark:text-gray-300">
                        Email updates about policy changes and renewals
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox id="marketingEmails" />
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <label htmlFor="marketingEmails" className="text-sm text-gray-700 dark:text-gray-300">
                        Special offers and insurance tips
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox id="terms" className="mt-1" />
                  <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    I agree to the{" "}
                    <Link to="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox id="hipaa" className="mt-1" />
                  <label htmlFor="hipaa" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    I consent to HIPAA-compliant processing of my health information for insurance purposes
                  </label>
                </div>
              </div>
            </div>

            {/* Submit */}
            <Button
              onClick={handleCreateAccount}
              disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 dark:from-green-500 dark:to-emerald-600 dark:hover:from-green-00 dark:hover:to-emerald-700"
            >
              {isLoading ? "Creating..." : "Create My Account"}
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Need help?{" "}
                <Link to="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Contact Support
                </Link>
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
