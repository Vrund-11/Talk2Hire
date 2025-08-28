import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'sonner';

const ListQuestions = ({ formData }) => {
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestions();
    }
  }, [formData])

  const GenerateQuestions = async () => {

    setLoading(true);

    try {
      const result = await axios.post('/api/ai-model', {
        ...formData
      })
      console.log(result.data.content); 
      setLoading(false)
    }
    catch (error) {
      console.error("API Call Error:", error); // Log the actual error
      toast.error('SERVER ERROR , Try Again!'); // Keep the user-facing toast
      setLoading(false);
    }
  }

  return (
    <div>
      {loading && <div>
      <Loader2Icon className='animate-spin'/>
      <div>
      </div>
        <h2>Generating Interview Questions</h2>
        <p>Our ai is crafting personalized questions based on your profile</p>
      </div>}
    </div>
  )
}

export default ListQuestions
