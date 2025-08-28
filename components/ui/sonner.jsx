"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = (props) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      position="top-center"         // 👈 move to top center
      richColors                   // 👈 nicer color variants
      expand                       // 👈 full-width style
      toastOptions={{
        className: "text-lg px-6 py-4 max-w-xl",  // 👈 make it bigger
      }}
      {...props}
    />
  )
}

export { Toaster }
