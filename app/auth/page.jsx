'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from "@/services/supabaseClient";

const LoginPage = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced Google login with loading state
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) {
        console.error('Error logging in with Google:', error);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced 3D card tilt effect
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = -((y - height / 2) / height) * 20;
    const rotateY = ((x - width / 2) / width) * 20;

    setRotate({ x: rotateX, y: rotateY });
    setMousePosition({ x: x - width / 2, y: y - height / 2 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/50 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/50 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-5 h-5 bg-pink-400/30 rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-20 w-2 h-2 bg-blue-300/40 rounded-full animate-float-delayed"></div>
      </div>

      {/* Main Login Card */}
      <div
        className={`relative transform-style-preserve-3d transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 md:p-16 rounded-3xl shadow-2xl transition-transform duration-200 ease-out hover:shadow-purple-500/20"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.3),
              0 0 0 1px rgba(255, 255, 255, 0.05),
              ${mousePosition.x / 5}px ${mousePosition.y / 5}px 30px rgba(124, 58, 237, 0.1)
            `,
          }}
        >
          
          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-3xl opacity-50"
            style={{
              transform: `translate(${mousePosition.x / 20}px, ${mousePosition.y / 20}px)`
            }}
          ></div>

          {/* Content */}
          <div className="relative text-center transform-style-preserve-3d" style={{ transform: 'translateZ(50px)' }}>
            
            {/* Logo Section */}
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto opacity-60"></div>
            </div>

            {/* Welcome Text */}
            <div className="mb-8">
              <p className="text-lg sm:text-xl text-gray-300 mb-2 opacity-80">
                Welcome to
              </p>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
                Talk2Hire
              </h1>
              
              <p className="text-base sm:text-lg text-gray-300 opacity-90">
                AI-Powered Mock Interviews
              </p>
              
              {/* Decorative Elements */}
              <div className="flex justify-center items-center space-x-2 mt-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400">AI Analysis</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400">Real-time</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400">Analytics</p>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              onClick={loginWithGoogle}
              disabled={isLoading}
              className="group relative inline-flex items-center justify-center px-12 py-4 bg-white text-gray-900 font-bold text-lg rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-purple-500/25"
              style={{
                transform: 'translateZ(30px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(124, 58, 237, 0.2)',
              }}
            >
              {/* Button Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Loading Spinner */}
              {isLoading ? (
                <div className="relative flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </div>
              ) : (
                <div className="relative flex items-center space-x-3">
                  {/* Google Icon */}
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Continue with Google
                  </span>
                </div>
              )}
            </button>

            {/* Additional Login Options */}
            <div className="mt-8">
              <p className="text-sm text-gray-400 mb-4">or explore as guest</p>
              <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm underline underline-offset-4">
                Take a Demo Tour
              </button>
            </div>

            {/* Security Badge */}
            <div className="mt-8 flex items-center justify-center space-x-2 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secured by Google OAuth</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
