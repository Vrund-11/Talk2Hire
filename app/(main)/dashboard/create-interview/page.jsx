'use client'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import InterviewForm from './_components/InterviewFormInfo';
import ListQuestions from './_components/ListQuestions'
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink'

const CreateInterview = () => {
  const router = useRouter();
  const [percent, setpercent] = useState(1);
  const [formData, setFormData] = useState({});
  const [interviewId, setinterviewId] = useState()

  const onHandleInputChanges = (field, value) => {
    setFormData(prev => ({
      ...prev, [field]: value
    }))
  }
  console.log('form data :', formData);

  const onGoToNext = () => {
    if (!formData?.jobPosition || !formData?.jobDescription || !formData?.Duration || formData?.type.length === 0) {
      toast.error("⚠️ Not so fast! Looks like you missed a few fields. Complete at least 4 to continue.");
    } else {
      toast.success("🚀 All good! You're ready for the next step.")
      setpercent(percent + 1); // Call setpercent if form is valid
    };
  };

  const onCreateLink = (interviewId) => {
    setinterviewId(interviewId);
    setpercent(percent + 1);
  }

  return (
    <div>
      <div>
        <ArrowLeft onClick={() => router.back()} className='cursor-pointer' />
        <h2 className="text-2xl font-bold mb-4">Start a Fresh Interview Session</h2>
      </div>
      <Progress value={percent * 33} className="bg-blue-200 [&>div]:bg-teal-500" />
      {percent == 1 ? <InterviewForm onHandleInputChanges={onHandleInputChanges}
        goToNext={onGoToNext} />
        : percent == 2 ? <ListQuestions formData={formData} onCreateLink={(interview_id) => onCreateLink(interview_id)} />
          : percent == 3 ? <InterviewLink interview_id={interviewId} formData={formData} /> : null}
    </div>
  )
}

export default CreateInterview;
