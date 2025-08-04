'use client'
import React, { useState } from 'react';
import {supabase} from "@/services/supabaseClient";

const LoginPage = () => {

  // Function to handle Google login using Supabase
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      console.error('Error logging in with Google:', error);
    }
  }

  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // This function creates the 3D card tilt effect based on cursor position
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Calculate rotation values. The divisor controls the effect's intensity.
    const rotateX = -((y - height / 2) / height) * 15;
    const rotateY = ((x - width / 2) / width) * 15;

    setRotate({ x: rotateX, y: rotateY });
  };

  // This function resets the card's tilt when the cursor leaves
  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  // This function will handle your authentication logic
  const handleLogin = () => {
    console.log('Login button clicked. Implement authentication logic here.');
  };

  return (
    // Main container: full screen, black, and sets the 3D perspective
    <div className="flex items-center justify-center min-h-screen bg-black text-white font-sans p-4" style={{ perspective: '1000px' }}>

      {/* 3D Interactive Card Container */}
      <div
        className="transform-style-preserve-3d bg-neutral-900 p-8 sm:p-12 rounded-2xl shadow-2xl transition-transform duration-200 ease-out"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          boxShadow: '0 25px 50px -12px rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Content wrapper to push content forward in 3D space */}
        <div className="text-center transform-style-preserve-3d" style={{ transform: 'translateZ(40px)' }}>

          {/* Welcome Text */}
          <p className="text-lg sm:text-xl text-neutral-400 mb-2">
            Welcome to
          </p>

          {/* Company Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Talk2Hire
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-neutral-300 mb-12">
            AI-Powered Mock Interviews
          </p>

          {/* 3D Login Button with hover and active effects */}
          <button
            onClick={loginWithGoogle}
            className="
              relative inline-block px-10 py-3 sm:px-12 sm:py-4 
              bg-white text-black font-bold text-lg rounded-lg
              transform-style-preserve-3d transition-transform duration-150
              hover:-translate-y-1 active:translate-y-0.5
            "
            style={{
              boxShadow: '0 6px 0 0 #b3b3b3, 0 8px 16px rgba(0,0,0,0.4)',
              transform: 'translateZ(20px)', // Pushes button forward
            }}
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
