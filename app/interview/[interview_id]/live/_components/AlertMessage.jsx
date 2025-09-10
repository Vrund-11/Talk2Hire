import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AlertTriangle, StopCircle } from "lucide-react"

const AlertMessage = ({ children, stopInterview }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-2xl rounded-2xl overflow-hidden">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-600"></div>
        
        <AlertDialogHeader className="text-center pt-8 pb-2 space-y-4">
          {/* Icon with animated background */}
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse"></div>
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400 relative z-10" />
          </div>
          
          <AlertDialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            End Interview Session?
          </AlertDialogTitle>
          
          <AlertDialogDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed px-2">
            <div className="space-y-2">
              <p className="font-medium">⚠️ This action cannot be undone</p>
              <p>Your interview progress will be permanently lost and the session will end immediately.</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-6 pb-8 px-6">
          <AlertDialogCancel className="flex-1 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
            Continue Interview
          </AlertDialogCancel>
          
          <AlertDialogAction 
            onClick={() => stopInterview()}
            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg shadow-red-500/25 flex items-center justify-center gap-2"
          >
            <StopCircle className="h-4 w-4" />
            End Interview
          </AlertDialogAction>
        </AlertDialogFooter>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertMessage
