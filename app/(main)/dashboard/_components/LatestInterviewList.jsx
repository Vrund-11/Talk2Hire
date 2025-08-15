'use client'
import { Video } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';

const LatestInterviewList = () => {
    const [interviewList, setInterviewList] = useState([])


    return (
        <div className='my-5'>
            <h2 className='my-5 font-bold text-2xl'>Previous Interviews</h2>
            {interviewList?.length == 0 &&
                <div className='mt-15 p-5 flex flex-col items-center justify-center gap-5 bg-gray-150 rounded-lg shadow-md border border-gray-200 hover:bg-teal-100 transition-colors cursor-pointer'>
                    <Video className='p-3 text-primary bg-rose-300 rounded-lg h-12 w-12' />
                    <h2 className='text-2xl font-bold'>Dont Have  Any Interviews Yet!!!</h2>
                    <Button className='bg-emerald-600 text-white bg-blue-500'>Let's Create One</Button>
                </div>}
        </div>
    )
}

export default LatestInterviewList