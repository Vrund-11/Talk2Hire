'use client'
import React from 'react'
import Image from 'next/image'

const InterviewHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="flex items-center justify-start">
        <Image
          src="/talk2hire-photos/Logo-talk2hire.png"
          alt="Talk2Hire Logo"
          width={200}    // ⬅️ increase natural size
          height={200}
          className="h-20 w-auto object-contain -mt-2" // ⬅️ bigger logo, shifted a bit
        />
      </div>
    </div>
  )
}

export default InterviewHeader
