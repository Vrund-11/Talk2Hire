import React from "react";
import { CheckCircle, XCircle, Star } from "lucide-react";

const InterviewComplete = ({ feedback, interviewData }) => {
  const { name, interview_id } = interviewData || {};
  const {
    summary,
    rating,
    recommendation,
    recommendationMsg,
  } = feedback || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Interview Feedback
          </h1>
          <p className="text-gray-500">
            Candidate: <span className="font-medium">{name}</span> | ID:{" "}
            <span className="font-mono">{interview_id}</span>
          </p>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Summary</h2>
          <p className="text-gray-600 leading-relaxed">{summary}</p>
        </div>

        {/* Ratings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {rating &&
            Object.entries(rating).map(([key, value]) => (
              <div
                key={key}
                className="bg-gray-50 rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col items-center justify-center"
              >
                <Star className="w-6 h-6 text-yellow-500 mb-2" />
                <span className="text-lg font-bold text-gray-800">{value}/10</span>
                <span className="text-sm capitalize text-gray-500">{key}</span>
              </div>
            ))}
        </div>

        {/* Recommendation */}
        <div
          className={`flex items-center gap-4 p-6 rounded-2xl shadow-md border ${
            recommendation
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          {recommendation ? (
            <CheckCircle className="w-10 h-10 text-green-600" />
          ) : (
            <XCircle className="w-10 h-10 text-red-600" />
          )}
          <div>
            <h3
              className={`text-lg font-semibold ${
                recommendation ? "text-green-700" : "text-red-700"
              }`}
            >
              {recommendation ? "Recommended for Hire" : "Not Recommended"}
            </h3>
            <p className="text-gray-600 mt-1">{recommendationMsg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewComplete;
