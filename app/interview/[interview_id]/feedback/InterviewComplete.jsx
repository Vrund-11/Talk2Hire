'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { CheckCircle, XCircle, Star } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const FeedbackPage = () => {
  const { interview_id } = useParams();
  const [feedbackData, setFeedbackData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        // ✅ Fetch the latest feedback for this interview
        const { data, error } = await supabase
          .from('interview-feedback')
          .select('*')
          .eq('interview_id', interview_id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) throw error;

        setFeedbackData(data[0]);
      } catch (err) {
        console.error('Error fetching feedback:', err);
      } finally {
        setLoading(false);
      }
    };

    if (interview_id) fetchFeedback();
  }, [interview_id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <Loader2 className="w-10 h-10 animate-spin mb-3 text-blue-500" />
        <p className="text-lg">Fetching your feedback...</p>
      </div>
    );
  }

  if (!feedbackData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <XCircle className="w-10 h-10 mb-3 text-red-500" />
        <p className="text-lg">No feedback found for this interview.</p>
      </div>
    );
  }

  const { name, userEmail, feedback, recommendation, created_at } = feedbackData;
  const ratings = feedback?.rating || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 transition-all duration-300 hover:shadow-3xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Interview Feedback Report
          </h1>
          <p className="text-gray-500">
            Candidate: <span className="font-semibold">{name}</span> | Email: <span className="font-mono">{userEmail}</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Generated on {new Date(created_at).toLocaleString()}
          </p>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">🧾 Summary</h2>
          <p className="text-gray-700 leading-relaxed">{feedback?.summary}</p>
        </div>

        {/* Ratings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {Object.entries(ratings).map(([key, value]) => (
            <div
              key={key}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300"
            >
              <Star className="w-6 h-6 text-yellow-500 mb-2" />
              <span className="text-lg font-bold text-gray-800">{value}/10</span>
              <span className="text-sm capitalize text-gray-500">{key}</span>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div
          className={`flex items-center gap-4 p-6 rounded-2xl shadow-md border transition-all duration-300 ${
            feedback?.Recommendation === 'true'
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}
        >
          {feedback?.Recommendation === 'true' ? (
            <CheckCircle className="w-10 h-10 text-green-600" />
          ) : (
            <XCircle className="w-10 h-10 text-red-600" />
          )}
          <div>
            <h3
              className={`text-lg font-semibold ${
                feedback?.Recommendation === 'true'
                  ? 'text-green-700'
                  : 'text-red-700'
              }`}
            >
              {feedback?.Recommendation === 'true'
                ? '✅ Recommended for Hire'
                : '❌ Not Recommended'}
            </h3>
            <p className="text-gray-600 mt-1">
              {feedback?.RecommendationMsg ||
                recommendation ||
                'No additional comments provided.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-500 text-sm">
          © {new Date().getFullYear()} Talk2Hire AI — Interview Summary Assistant
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
