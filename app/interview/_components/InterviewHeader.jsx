'use client'
import React from 'react'
import Image from 'next/image'

const InterviewHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-white shadow-md rounded-b-xl z-50">
      <div className="flex items-center justify-start py-2">
        <Image
          src="/talk2hire-photos/Logo-talk2hire.png"
          alt="Talk2Hire Logo"
          width={150}
          height={150}
          className="h-24 w-auto object-contain"
        />
      </div>
    </div>
  )
}

export default InterviewHeader

