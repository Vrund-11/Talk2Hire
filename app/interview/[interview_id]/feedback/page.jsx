'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "./../../../../services/supabaseClient";
import InterviewComplete from "./InterviewComplete"; // ✅ rename your current file to InterviewComplete.jsx or keep in same dir
import { Loader2 } from "lucide-react";

const FeedbackPage = () => {
  const { interview_id } = useParams();
  const [feedbackData, setFeedbackData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("interview-feedback")
        .select("*")
        .eq("interview_id", interview_id)
        .order("created_at", { ascending: false }) // get latest first
        .limit(1) // only one row
        .single(); // now safe since limit ensures 1


      if (error) {
        console.error("Error fetching feedback:", error);
      } else {
        console.log("Fetched feedback:", data);
        setFeedbackData(data);
      }

      setLoading(false);
    };

    if (interview_id) {
      fetchFeedback();
    }
  }, [interview_id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="ml-3 text-gray-600 font-medium">Loading feedback...</p>
      </div>
    );
  }

  if (!feedbackData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">No feedback found for this interview.</p>
      </div>
    );
  }

  // feedbackData.feedback is the full object saved from your AI
  const parsedFeedback =
    typeof feedbackData.feedback === "string"
      ? JSON.parse(feedbackData.feedback)
      : feedbackData.feedback;

  return (
    <InterviewComplete
      feedback={parsedFeedback}
      interviewData={{
        name: feedbackData.name,
        interview_id: feedbackData.interview_id,
      }}
    />
  );
};

export default FeedbackPage;
