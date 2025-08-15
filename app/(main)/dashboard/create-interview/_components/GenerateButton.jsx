'use client'
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

export default function GenerateButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      console.log("Questions Generated!");
    }, 2000);
  };

  return (
    <div className="flex justify-end mt-6">
      <Button
        onClick={handleClick}
        disabled={loading}
        className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-full px-6 shadow-md"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            Generate Questions
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
