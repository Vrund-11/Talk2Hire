import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TypeOfInterview } from '@/services/Constants';
import GenerateButton from './GenerateButton';


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const InterviewFormInfo = ({onHandleInputChanges}) => {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white shadow-lg rounded-2xl px-6 py-5 w-full max-w-2xl">

        {/* Progress bar was already in CreateInterview, so no need here */}

        {/* Job Position */}
        <div className="mb-3">
          <h2 className="text-lg font-semibold mb-1">✨ What role are you hiring for?</h2>
          <Input 
          onChange={(e) => onHandleInputChanges('jobposition' , e.target.value)}
          placeholder="e.g. Web Developer 🚀" />
        </div>

        {/* Job Description */}
        <div className="mb-3">
          <h2 className="text-lg font-semibold mb-1">📝 Describe the role</h2>
          <Textarea placeholder="Tell us what makes this role exciting and why someone would love to work here!" className="h-[150px]" />
        </div>

        {/* Interview Duration */}
        <div className="mb-3">
          <h2 className="text-lg font-semibold mb-1">⏳ How long will the interview take?</h2>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 Minutes</SelectItem>
              <SelectItem value="45">45 Minutes</SelectItem>
              <SelectItem value="60">60 Minutes</SelectItem>
              <SelectItem value="75">75 Minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Interview Type */}
        <div>
          <h2 className="text-lg font-semibold mb-2">🎯 Choose your interview style</h2>
          <div className="flex flex-wrap gap-3">
            {TypeOfInterview.map((type, index) => (
              <button
                key={index}
                onClick={() => setSelectedType(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all
                  ${selectedType === index
                    ? 'bg-teal-300 text-white border-teal-400'
                    : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-teal-300 hover:text-teal-500'}`}
              >
                <type.icon className={`${selectedType === index ? 'text-white' : 'text-teal-500'}`} />
                <span className="block">{type.name}</span>
              </button>
            ))}
          </div>
          <div> <GenerateButton /></div>
        </div>
      </div>
    </div>
  )
}


export default InterviewFormInfo
