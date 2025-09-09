'use client'
import React, { useContext } from 'react'
import { InterviewDataContext } from './../../../../contexts/InterviewDataContext';
import { LucideTimer, MicIcon, Phone } from 'lucide-react';
import Image from 'next/image';

const startInterview = () => {
  const { interviewContext, setInterviewContext } = useContext(InterviewDataContext);
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 pt-4'>
      
      {/* Main Interview Container - Reduced top margin */}
      <div className='w-full max-w-6xl mx-auto mt-8 bg-white/70 backdrop-blur-lg border-2 border-gray-200/50 rounded-[40px] p-8 shadow-2xl'>
        
        {/* Session Header */}
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-gray-800 text-2xl font-bold flex items-center gap-2'>
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              AI interview session
            </span>
          </h2>
          <div className='flex items-center gap-2 text-gray-800 text-xl'>
            <span className='text-gray-600'>timer</span>
            <LucideTimer className='w-6 h-6 text-blue-600' />
            <span className='font-mono bg-gray-100/80 px-3 py-1 rounded-lg border border-gray-200'>00:00:00</span>
          </div>
        </div>

        {/* Video Call Interface */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          
          {/* AI Recruiter Section - Now Hoverable */}
          <div className='bg-white/80 border-2 border-gray-200/60 hover:border-blue-300/70 rounded-[30px] p-8 flex flex-col items-center justify-center min-h-[300px] shadow-xl hover:shadow-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer group'>
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50/60 to-purple-50/60 group-hover:from-blue-100/70 group-hover:to-purple-100/70 transition-all duration-300'></div>
            <div className='relative z-10 flex flex-col items-center'>
              <div className='relative mb-4'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full blur-lg opacity-20 group-hover:opacity-30 scale-110 transition-opacity duration-300'></div>
                <div className='relative w-24 h-24 rounded-full border-4 border-gray-300/60 group-hover:border-blue-400/70 overflow-hidden shadow-2xl bg-white transition-all duration-300'>
                  <Image 
                    src={'/talk2hire-photos/avatar.png.jpeg'} 
                    alt='AI Recruiter' 
                    width={96} 
                    height={96} 
                    className='w-full h-full object-cover' 
                  />
                </div>
                <div className='absolute inset-0 rounded-full shadow-inner'></div>
              </div>
              <h3 className='text-gray-700 group-hover:text-blue-700 text-lg font-medium transition-colors duration-300'>avatar</h3>
            </div>
          </div>

          {/* User Section - Now Hoverable with Same Image Size */}
          <div className='bg-white/80 border-2 border-gray-200/60 hover:border-green-300/70 rounded-[30px] p-8 flex flex-col items-center justify-center min-h-[300px] shadow-xl hover:shadow-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer group'>
            <div className='absolute inset-0 bg-gradient-to-br from-green-50/60 to-blue-50/60 group-hover:from-green-100/70 group-hover:to-blue-100/70 transition-all duration-300'></div>
            <div className='relative z-10 flex flex-col items-center'>
              <div className='relative mb-4'>
                <div className='absolute inset-0 bg-gradient-to-r from-green-300 to-blue-400 rounded-full blur-lg opacity-20 group-hover:opacity-30 scale-110 transition-opacity duration-300'></div>
                <div className='relative w-24 h-24 rounded-full border-4 border-gray-300/60 group-hover:border-green-400/70 overflow-hidden shadow-2xl bg-white transition-all duration-300'>
                  <Image 
                    src={'/talk2hire-photos/avatar.png.jpeg'} 
                    alt='User' 
                    width={96} 
                    height={96} 
                    className='w-full h-full object-cover' 
                  />
                </div>
              </div>
              <h3 className='text-gray-700 group-hover:text-green-700 text-lg font-medium transition-colors duration-300'>
                {interviewContext?.name || 'You'}
              </h3>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className='flex justify-center gap-6 mb-6'>
          
          {/* Microphone Button */}
          <button className='group relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity'></div>
            <div className='relative w-16 h-16 bg-white/90 hover:bg-white border-2 border-gray-300/60 hover:border-blue-400/60 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105'>
              <MicIcon className='w-7 h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-300' />
            </div>
            <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2'>
              
            </div>
          </button>

          {/* Phone Button */}
          <button className='group relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity'></div>
            <div className='relative w-16 h-16 bg-red-500/90 hover:bg-red-500 border-2 border-red-300/60 hover:border-red-400 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105'>
              <Phone className='w-7 h-7 text-white transition-transform duration-300 group-hover:rotate-12' />
            </div>
            <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2'>
              
            </div>
          </button>
        </div>

        {/* Status Message - Updated with cleaner design */}
        <div className='text-center'>
          <div className='inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200/60 px-6 py-3 rounded-2xl shadow-lg'>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
            <span className='text-gray-700 font-medium'>
              Interview in progress....
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default startInterview
