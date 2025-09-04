'use client'
import React from 'react'
import Image from 'next/image'
import { Clock, Info, VideoIcon, Building2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Interview = () => {
  // Dummy data for UI
  const dummyPosition = "Full Stack Developer";
  const dummyCompanyName = "Tech Innovations Inc.";
  const dummyDuration = "30 mins";

  return (
    <div className='px-6 md:px-16 lg:px-32'>
      <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden'>
        
        {/* Secondary Logo Section (smaller, inside main content) */}
        <div className='bg-gradient-to-r from-rose-50 to-pink-50 px-8 py-4 border-b'>
          <div className='flex items-center justify-center space-x-3'>
            <div className='text-center'>
              <p className='text-sm text-gray-600'>Your AI Interview Assistant</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='p-6'>
          {/* Interview Hero Image */}
          <div className='flex justify-center mb-6'>
            <div className='relative w-80 h-56 rounded-lg overflow-hidden shadow-md'>
              <Image 
                src={"/talk2hire-photos/generated-image.png"}
                fill
                className="object-cover"
                alt="Virtual Interview Scene"
              />
            </div>
          </div>

          {/* Interview Details */}
          <div className='text-center mb-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>{dummyPosition} Interview</h2>
            <div className='flex items-center justify-center space-x-6 text-gray-600'>
              <div className='flex items-center space-x-2'>
                <Building2 className='w-4 h-4' />
                <span>{dummyCompanyName}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Clock className='w-4 h-4' />
                <span>{dummyDuration}</span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className='max-w-md mx-auto space-y-4'>
            
            {/* New Input Field */}
            <div>
              <p className='block text-sm font-medium text-gray-700 mb-2'>Enter your name</p>
              <Input 
                defaultValue="Dummy User" 
                readOnly 
                className='w-full h-12' 
              />
            </div>

            {/* Instructions */}
            <div className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
              <div className='flex items-start space-x-3'>
                <Info className='w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0' />
                <div>
                  <h3 className='text-sm font-semibold text-blue-800 mb-2'>
                    Before you begin, make sure:
                  </h3>
                  <ul className='text-sm text-blue-700 space-y-1'>
                    <li>• Your network connection is stable</li>
                    <li>• Camera and microphone are working</li>
                    <li>• You're in a quiet environment</li>
                    <li>• You have a backup internet connection ready</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Join Button - Modified to remove onClick and dynamic class */}
            <Button 
              className={`w-full h-12 text-lg font-semibold bg-gradient-to-r from-rose-500 to-pink-600 hover:bg-rose-600`}
            >
              <VideoIcon className='w-5 h-5 mr-2' />
              Join Interview
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Interview
