'use client'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import InterviewForm from './_components/InterviewFormInfo';

const CreateInterview = () => {
  const router = useRouter();
  const [percent, setpercent] = useState(1);
  const [formData, setFormData] = useState();

  const onHandleInputChanges = (field, value) => {
    setFormData(prev => ({
      ...prev, [field]: value
    }))
  }
  console.log('form data :' , formData);

  return (
    <div>
      <div>
        <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
        <h2 className="text-2xl font-bold mb-4">Start a Fresh Interview Session</h2>
      </div>
      <Progress value={percent * 33} className="bg-blue-200 [&>div]:bg-teal-500" />
      <InterviewForm onHandleInputChanges={onHandleInputChanges} />
    </div>
  )
}

export default CreateInterview ;