'use client'
import Vapi from '@vapi-ai/web';
import React, { useContext, useEffect, useState } from 'react' // Added useState import
import { InterviewDataContext } from './../../../../contexts/InterviewDataContext';
import { LucideTimer, MicIcon, Phone } from 'lucide-react';
import Image from 'next/image';
import AlertMessage from '../live/_components/AlertMessage'
import { toast } from 'sonner';
import axios from 'axios';
import { supabase } from './../../../../services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';

const LiveInterviewPage = () => {
  const { interviewContext, setInterviewContext } = useContext(InterviewDataContext);
  const { interview_id } = useParams();
  const router = useRouter();


  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

  const [timer, setTimer] = useState(0);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const [loading, setLoading] = useState();



  const GenerateFeedback = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/ai-feedback', { conversation });
      const parsedFeedback = response.data; // Already a JS object from API

      console.log("Parsed Feedback:", parsedFeedback);

      // ✅ CHANGED SECTION START
      // Added destructuring for { data, error } to properly handle insert result
      const { data, error } = await supabase.from('interview-feedback').insert([
        {
          name: interviewContext?.name,
          userEmail: interviewContext?.userEmail,
          interview_id: interview_id,
          feedback: parsedFeedback.feedback,
          recommendation:
            parsedFeedback.feedback.RecommendationMsg ||
            parsedFeedback.feedback.recommendationMsg,
        },
      ]);

      if (error) {
        console.error("Error saving feedback:", error);
        toast.error("Failed to save feedback.");
      } else {
        toast.success("Feedback saved successfully!");
        router.replace(`/interview/${interview_id}/feedback`);
      }
      // ✅ CHANGED SECTION END

      setLoading(false);

    } catch (err) {
      console.error("GenerateFeedback Error:", err.message || err);
      toast.error("Something went wrong while generating feedback.");
    }
  };



  const listenersAttached = React.useRef(false);

  useEffect(() => {
    if (listenersAttached.current) return; // ⛔ Don't attach again
    listenersAttached.current = true;

    const handleMessage = (message) => {
      console.log('Message :', message);
      if (message?.conversation) {
        const convoString = JSON.stringify(message.conversation);
        console.log("Conversation string :", convoString);
        setConversation(convoString);
      }
    };

    vapi.on('message', handleMessage);
    vapi.on('call-start', () => {
      console.log('Call has started.');
      toast.success('Interview session has started.');
    });
    vapi.on('speech-start', () => setActiveUser(false));
    vapi.on('speech-end', () => setActiveUser(true));
    vapi.on('call-end', () => {
      console.log('Call has ended.');
      toast.success('Interview session has ended.');
      GenerateFeedback();
    });

    return () => {
      vapi.off('message', handleMessage);
      vapi.off('call-start', () => { });
      vapi.off('speech-start', () => { });
      vapi.off('speech-end', () => { });
      vapi.off('call-end', () => { });
    };
  }, []);





  useEffect(() => {
    interviewContext && startCall();
  }, [interviewContext]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startCall = () => {
    let questionList;
    interviewContext?.InterviewInformation?.questionList.forEach((item, index) => (
      questionList = item?.question + ',' + questionList
    ));
    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: "Hi" + interviewContext?.name + ", how are you? Ready for your interview on "
        + interviewContext?.InterviewInformation?.jobPosition + "?",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your` + interviewContext?.InterviewInformation?.jobPosition + ` interview. Lets get started with a few questions!"

Ask one question at a time and wait for the candidates response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: ` + questionList + `

If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer. Example:
"Nice! Thats a solid answer."
"Hmm, not quite! Want to try again?"

Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Lets tackle a tricky one!"

After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:
✅ Be friendly, engaging, and witty
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidates confidence level
✅ Ensure the interview remains focused on React
        `.trim(),
          },
        ],
      },
    };
    console.log(questionList);

    vapi.start(assistantOptions);
  }

  const stopInterview = () => {
    vapi.stop();
  };



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
            <span className='font-mono bg-gray-100/80 px-3 py-1 rounded-lg border border-gray-200'>{formatTime(timer)}</span>
          </div>
        </div>

        {/* Video Call Interface */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>

          {/* AI Recruiter Section - With Conditional Animate-Ping */}
          <div className='bg-white/80 border-2 border-gray-200/60 hover:border-blue-300/70 rounded-[30px] p-8 flex flex-col items-center justify-center min-h-[300px] shadow-xl hover:shadow-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer group'>
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50/60 to-purple-50/60 group-hover:from-blue-100/70 group-hover:to-purple-100/70 transition-all duration-300'></div>
            <div className='relative z-10 flex flex-col items-center'>
              <div className='relative mb-4'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full blur-lg opacity-20 group-hover:opacity-30 scale-110 transition-opacity duration-300'></div>
                {/* AI Recruiter Avatar - Animate when AI is speaking (activeUser = false) */}
                <div className={`relative w-24 h-24 rounded-full border-4 border-gray-300/60 group-hover:border-blue-400/70 overflow-hidden shadow-2xl bg-white transition-all duration-300 ${!activeUser ? 'animate-ping' : ''}`}>
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

          {/* User Section - With Conditional Animate-Ping */}
          <div className='bg-white/80 border-2 border-gray-200/60 hover:border-green-300/70 rounded-[30px] p-8 flex flex-col items-center justify-center min-h-[300px] shadow-xl hover:shadow-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer group'>
            <div className='absolute inset-0 bg-gradient-to-br from-green-50/60 to-blue-50/60 group-hover:from-green-100/70 group-hover:to-blue-100/70 transition-all duration-300'></div>
            <div className='relative z-10 flex flex-col items-center'>
              <div className='relative mb-4'>
                <div className='absolute inset-0 bg-gradient-to-r from-green-300 to-blue-400 rounded-full blur-lg opacity-20 group-hover:opacity-30 scale-110 transition-opacity duration-300'></div>
                {/* User Initial - Rose background with white letter */}
                <div className={`relative w-24 h-24 rounded-full border-4 border-gray-300/60 group-hover:border-rose-400/70 shadow-2xl bg-rose-500 group-hover:bg-rose-600 transition-all duration-300 flex items-center justify-center ${activeUser ? 'animate-ping' : ''}`}>
                  <span className='text-3xl font-bold text-white transition-colors duration-300 select-none'>
                    {interviewContext?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
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
          <button
            className='group relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity'></div>
            <div className='relative w-16 h-16 bg-red-500/90 hover:bg-red-500 border-2 border-red-300/60 hover:border-red-400 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105'>
              <AlertMessage stopInterview={() => stopInterview()}>
                <Phone className='w-7 h-7 text-white transition-transform duration-300 group-hover:rotate-12' />
              </AlertMessage>
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
  );
}

export default LiveInterviewPage;