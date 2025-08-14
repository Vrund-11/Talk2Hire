import React from 'react'
import WelcomeMessage from './_components/WelcomeMessage'
import CreateOptions from './_components/CreateOptions';
import LatestInterviewList from './_components/LatestInterviewList';

const Dashboard = () => {

  return (
    <div>

      <WelcomeMessage />

      <h2 className="font-bold mt-5 font-[Poppins] text-lg md:text-2xl">DASHBOARD</h2>

      <CreateOptions />

      <LatestInterviewList />

      </div>
  )
}

export default Dashboard