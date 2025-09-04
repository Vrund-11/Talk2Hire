import axios from 'axios';
import { Loader2Icon, ArrowRightIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import QuestionContainer from './QuestionContainer';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from './../../../../../services/supabaseClient';
import { jsonrepair } from 'jsonrepair';


const ListQuestions = ({ formData, onCreateLink }) => {
  const [loading, setLoading] = useState(false);       // For AI generation
  const [questionList, setQuestionList] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false); // For saving interview

  useEffect(() => {
    if (!formData) return;

    const timer = setTimeout(() => {
      GenerateQuestions(); // only runs after 500ms of no changes
    }, 500);

    return () => clearTimeout(timer);
  }, [formData]);

  const GenerateQuestions = async () => {
    setLoading(true);

    try {
      const result = await axios.post('/api/ai-model', {
        ...formData,
      });
      let String_Content = result.data.content;

      // 🧹 Clean AI response
      let Content = String_Content
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .replace(/^json/i, '')
        .trim();

      const match = Content.match(/\[.*\]/s);
      if (match) Content = match[0];

      console.log('🧹 Cleaned Content:', Content);

      try {
        // First try normal parse
        setQuestionList(JSON.parse(Content));
      } catch (jsonErr) {
        console.warn("⚠️ JSON Parse failed, attempting repair...", jsonErr);
        try {
          const repaired = jsonrepair(Content);
          setQuestionList(JSON.parse(repaired));
        } catch (repairErr) {
          console.error("❌ JSON Repair also failed:", repairErr);
          toast.error("Failed to parse interview questions. Please try again.");
          setQuestionList(null);
        }
      }

    } catch (err) {
      console.error('❌ API/JSON Parse Error:', err);
      toast.error('Failed to load interview questions. Please try again.');
      setQuestionList(null);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      toast.error("Authentication required to save interview.");
      setSaveLoading(false);
      return;
    }

    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from('Interviews')
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user.email,
          interview_id,
        },
      ])
      .select();

    setSaveLoading(false);

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      toast.error("Failed to save interview. Try again.");
    } else {
      console.log("✅ Interview saved:", data);
      toast.success("Interview saved successfully!");
      onCreateLink(interview_id);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      {loading && (
        <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl shadow-lg border border-rose-200 bg-rose-50 max-w-md w-full">
          <Loader2Icon className="animate-spin text-rose-400 w-12 h-12 mb-2" />
          <h2 className="text-2xl font-semibold text-rose-700 text-center">
            Curating Your Unique Interview Experience
          </h2>
          <p className="text-rose-600 text-center">
            Please hold on while our intelligent assistant thoughtfully prepares
            a set of tailored questions just for you.
          </p>
        </div>
      )}

      {!loading && questionList?.length > 0 && (
        <div className="flex flex-col gap-6">
          <QuestionContainer questionList={questionList} />
          <div className="flex justify-center mt-6">
            <button
              onClick={onFinish}
              disabled={saveLoading}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white 
                transition-all duration-300 shadow-md hover:shadow-lg
                ${saveLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-teal-500 hover:to-rose-400'
                }`}
            >
              {saveLoading ? (
                <>
                  <Loader2Icon className="animate-spin w-5 h-5" />
                  Saving...
                </>
              ) : (
                <>
                  Generate Interview
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {!loading && !questionList && (
        <p className="text-center text-gray-500">
          No questions generated yet. Please fill in the form and submit.
        </p>
      )}
    </div>
  );
};

export default ListQuestions;
