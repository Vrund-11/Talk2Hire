'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Clock, Info, VideoIcon, Building2, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/contexts/InterviewDataContext'


const Interview = () => {
  const {interviewContext, setInterviewContext} = useContext(InterviewDataContext);

  const [name, setName] = useState("");
  const [interviewData, setInterviewData] = useState();
  const [loading, setLoading] = useState(false);
  const [joiningMeeting, setJoiningMeeting] = useState(false); 
  
  const { interview_id } = useParams();
  const router = useRouter();

  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);

    try {
      let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select('jobPosition , jobDescription , Duration , type')
        .eq("interview_id", interview_id)

      setInterviewData(Interviews[0]);

      if (Interviews?.length == 0) return toast.error("No Interview Found");
      else return toast.success('Welcome to the Interview!!')

      setLoading(false);
    }
    catch (err) {
      setLoading(false);
      toast.error("Failed to fetch interview details", err)
    }
  };

  const onJoinMeeting = async () => {
    setJoiningMeeting(true); // Start loading for join button

    try {
      let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select('*')
        .eq("interview_id", interview_id)

      console.log(Interviews[0]);

      setInterviewContext({name:name,
         InterviewInformation:Interview[0]});

      router.push('/interview/'+interview_id + '/live');

    } catch (error) {
      toast.error("Failed to join meeting");
    } finally {
      setJoiningMeeting(false); // Stop loading
    }
  }

  return (
    <div className='px-6 md:px-16 lg:px-32'>
      <div className='max-w-3xl mx-auto my-10 bg-white rounded-xl shadow-lg overflow-hidden shadow-md'>

        {/* Secondary Logo Section */}
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
            <div className='relative w-80 h-48 rounded-lg overflow-hidden shadow-md'>
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
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>{interviewData?.jobPosition} Interview</h2>
            <div className='flex items-center justify-center space-x-6 text-gray-600'>
              <div className='flex items-center space-x-2'>
                <Building2 className='w-4 h-4' />
                <span>
                  {interviewData?.type?.toString()
                    .replace("[", "")
                    .replace("]", "")
                    .replace(/"/g, "")}
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <Clock className='w-4 h-4' />
                <span>{interviewData?.Duration} Mins</span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className='max-w-md mx-auto space-y-4'>

            {/* Input Field */}
            <div>
              <p className='block text-sm font-medium text-gray-700 mb-2'>Enter your name</p>
              <Input
                placeholder="E.g Jimmy Anderson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12"
              />
            </div>

            {/* Instructions */}
            <div className='bg-blue-50 rounded-lg p-2 border border-blue-200 text-sm'>
              <div className='flex items-start space-x-2'>
                <Info className='w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0' />
                <div>
                  <h3 className='font-semibold text-blue-800 mb-1'>Before you begin:</h3>
                  <ul className='space-y-0.5'>
                    <li>• Your network connection is stable</li>
                    <li>• Camera and microphone are working</li>
                    <li>• You're in a quiet environment</li>
                    <li>• You have a backup internet connection ready</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Join Button with Hover Effects and Loading */}
            <Button
              variant="outline"
              disabled={!name.trim() || joiningMeeting}
              onClick={onJoinMeeting}
              className={`
                w-full h-12 text-lg font-semibold border-2 transition-all duration-200 flex items-center justify-center gap-2
                ${name.trim() 
                  ? 'border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 text-rose-700 hover:text-blue-700' 
                  : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {joiningMeeting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Joining Interview...
                </>
              ) : (
                <>
                  <VideoIcon className='w-5 h-5' />
                  Join Interview
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Interview
