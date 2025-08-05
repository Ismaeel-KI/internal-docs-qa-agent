"use client";

import api from "@/lib/axios";
import { useState } from "react";
import {
  ArrowLeft, Mail, Lock, Eye, EyeOff, Sparkles,
  Shield, Zap, Heart, Check, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/login/", { email, password });
      alert(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.detail || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-[#0f0f0f] dark:via-[#0b1f1c] dark:to-[#012d28] text-gray-900 dark:text-white relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-purple-400/10 dark:bg-teal-500/5 blur-2xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 dark:bg-emerald-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 dark:bg-teal-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 min-h-screen flex flex-col">
      
        {/* Main content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-8">

            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="h-12 w-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-green-500 dark:to-emerald-600">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-purple-600 dark:text-emerald-400">PolicyBot</h1>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back!</h2>
                <p className="text-gray-600 dark:text-gray-400">Sign in to access your insurance assistant</p>
              </div>
            </div>

            {/* Sign in card */}
            <div className="bg-white/20 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl p-8 shadow-xl">
              <form onSubmit={handleSignIn} className="space-y-6">
                
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full text-gray-800 dark:text-white dark:bg-gray-800 pl-10 pr-12 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:outline-none transition-all duration-300 focus:scale-[1.02] bg-white/50 backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full text-gray-800 dark:text-white dark:bg-gray-800 pl-10 pr-12 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:outline-none transition-all duration-300 focus:scale-[1.02] bg-white/50 backdrop-blur-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Forgot password */}
                <div className="text-right">
                  <button type="button" className="text-purple-600 hover:text-purple-700 dark:text-emerald-500 dark:hover:text-emerald-600 font-medium relative group transition-colors">
                    Forgot your password?
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-green-500 dark:to-emerald-600 group-hover:w-full transition-all duration-300" />
                  </button>
                </div>

                {/* Sign in */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25 relative overflow-hidden group dark:from-green-500 dark:to-emerald-600 dark:hover:from-green-00 dark:hover:to-emerald-700 dark:hover:shadow-green-500/25"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Signing you in...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">Sign In to PolicyBot</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </>
                  )}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/20 dark:bg-black/20 backdrop-blur-xl text-gray-500 dark:text-gray-400">or continue with</span>
                  </div>
                </div>

                {/* Google */}
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  variant="outline"
                  className="w-full py-3 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92..." />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77..." />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43..." />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15..." />
                    </svg>
                    <span>Continue with Google</span>
                  </div>
                </Button>
              </form>

              {/* Signup link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  {"Don't have an account? "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-purple-600 hover:text-purple-700 dark:text-emerald-500 dark:hover:text-emerald-600 font-medium relative group transition-colors"
                  >
                    Create one now
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-green-500 dark:to-emerald-600 group-hover:w-full transition-all duration-300" />
                  </button>
                </p>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-emerald-900 text-green-700 dark:text-emerald-300 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                <span>Secure Login</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-teal-900 text-blue-700 dark:text-teal-300 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                <span>Quick Access</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-purple-100 dark:bg-gray-800 text-purple-700 dark:text-gray-300 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4" />
                <span>HIPAA Safe</span>
              </div>
            </div>

            {/* Benefits preview */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 dark:from-[#0c1a18] dark:to-[#041715] rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What you'll get with PolicyBot:</h3>
              <div className="space-y-3">
                {[
                  "Instant answers to insurance questions",
                  "Upload and analyze your policy documents",
                  "Track claims and benefits easily",
                  "Get personalized coverage recommendations",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 dark:bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
