import { Video ,Phone } from 'lucide-react'
import React from 'react'

const CreateOptions = () => {
    return (
        <div className='grid grid-cols-2 gap-5 mt-4'>
             <div className='shadow-md border-gray-200 hover:bg-teal-100 transition-colors cursor-pointer bg-gray-50 p-4 rounded-lg '>
                <Phone className='p-3 text-primary bg-orange-300 rounded-lg h-12 w-12' />
                <h2 className='font-bold '>Schedule screening</h2>

                <p className='text-gray-500'>Set up a quick screening call to evaluate candidates.</p>
            </div>
            <div className='shadow-md border-gray-200 hover:bg-teal-100 transition-colors cursor-pointer bg-gray-50 p-4 rounded-lg'>
                <Video className='p-3 text-primary bg-orange-300 rounded-lg h-12 w-12 ' />
                <h2 className='font-bold '>Start Interview</h2>

                <p className='text-gray-500'>Launch a live video interview with your chosen candidate.</p>
            </div>
        </div>
    )
}

export default CreateOptions