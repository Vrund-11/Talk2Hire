import React from 'react'
import { DashboardProvider } from './provider';

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <DashboardProvider>
        <div className = 'p-15'>
        {children} 
        </div>
      </DashboardProvider>
    </div>
  )
}

export default DashboardLayout;
