
import React from 'react'
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calendar, Clock, Copy, List, Mail, Plus, Share2Icon, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import  Link  from 'next/link';
import { toast } from 'sonner';

const InterviewLink = ({ interview_id , formData }) => {
  const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id;

  const GetInterviewUrl = () => {
    return url;
  }

  const onCopy = async () => {
    await navigator.clipboard.writeText(url);
    toast.success('Link Copied');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 space-y-5">

        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-50 rounded-full flex items-center justify-center shadow-lg">
            <Image
              src={'/talk2hire-photos/check.png'}
              alt="Success check"
              height={60}
              width={60}
              className="drop-shadow-sm"
            />
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
              Your Interview Link is Ready! 🎉
            </h1>
            <p className="text-lg text-gray-500 font-medium">
              Share this interview link with your candidates
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-100 shadow-inner space-y-4">

          {/* Link Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-semibold text-gray-800">Interview Link</h2>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
              <Clock className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">Valid for 30 Days</span>
            </div>
          </div>

          {/* URL Copy Section */}
          <div className="bg-white rounded-xl border-2 border-gray-100 p-3 shadow-sm">
            <div className="flex gap-3">
              <Input
                defaultValue={GetInterviewUrl()}
                disabled={true}
                className="flex-1 bg-gray-50 border-gray-200 text-gray-600 font-mono text-sm rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              />
              <Button
              onClick = {()=> onCopy()}
                className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <Copy className="w-4 h-4" />
                Copy Link
              </Button>
            </div>
          </div>

          {/* Interview Details */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm text-center space-y-1">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Duration</p>
                <p className="text-lg font-bold text-gray-800">{formData?.Duration} Min</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm text-center space-y-1">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <List className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Questions</p>
                <p className="text-lg font-bold text-gray-800">{formData?.questionCount || '5'}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm text-center space-y-1">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Expires</p>
                <p className="text-lg font-bold text-gray-800">30 Days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-100 to-orange-100 rounded-full flex items-center justify-center">
              <Share2Icon className="w-4 h-4 text-rose-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Share Via</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="h-12 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
            >
              <Mail className="w-5 h-5 text-blue-600" />
              Email
            </Button>
            <Button
              variant="outline"
              className="h-12 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-100 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
            >
              <Share2Icon className="w-5 h-5 text-green-600" />
              SMS
            </Button>
            <Button
              variant="outline"
              className="h-12 border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
            >
              <Smartphone className="w-5 h-5 text-emerald-600" />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-2">
          <Link href={'/dashboard'}>
            <Button
              variant="outline"
              className=" flex items-center gap-2 px-6 py-3 border-2 border-black hover:text-white hover:border-black hover:bg-black transition-all duration-200 rounded-xl font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </Link>

          <Link href={'/dashboard/create-interview'}>
            <Button
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              Create New
            </Button>
          </Link>
        </div>
      </div>
    </div>



  )
}

export default InterviewLink;