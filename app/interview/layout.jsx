import React from 'react'
import InterviewHeader from './_components/InterviewHeader';


export default function InterviewLayout({ children}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <InterviewHeader />
      {/* Add padding-top to account for fixed header */}
      <main className="pt-20 px-6 py-8">
        {children}
      </main>
    </div>
  )
}


