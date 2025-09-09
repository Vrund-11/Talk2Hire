'use client'
import React from 'react'
import InterviewHeader from './_components/InterviewHeader';
import { InterviewDataContext } from '@/contexts/InterviewDataContext';
import { useState } from 'react';

export default function InterviewLayout({ children }) {

  const [interviewContext, setInterviewContext] = useState();

  return (
    <InterviewDataContext.Provider value={{interviewContext ,setInterviewContext}}>
      <div className="min-h-screen bg-gray-50">
        <InterviewHeader />
        <main className="pt-24 px-6 py-8">
          {children}
        </main>
      </div>
    </InterviewDataContext.Provider>
  )
}
