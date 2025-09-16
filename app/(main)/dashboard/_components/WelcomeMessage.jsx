"use client";
import React from "react";
import { useUser } from "@/app/auth/provider";
import Image from "next/image";

const WelcomeMessage = () => {
  const { user } = useUser();

  return (
    <main className="w-full">
      <div
        className="
          WelcomeTextBox
          bg-gray-900 rounded-lg shadow-lg border border-purple-500 hover:border-purple-400
          w-full
          p-4 md:p-6
          flex justify-between items-center gap-4
          transition-colors duration-300
        "
      >
        {user && (
          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-purple-500 hover:border-purple-300 transition-colors duration-300">
            <Image
              src={user?.picture}
              alt="Profile Picture"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
        )}
        <div className="WelcomeMessage max-w-md">
          <h2 className="font-bold mb-1 md:mb-2 font-[Poppins] text-lg md:text-2xl text-purple-200">
            {user?.name
              ? `Welcome back, ${user.name}!`
              : "Welcome to Talk2Hire!"}
          </h2>
          <p className="text-purple-300 opacity-80 font-[Inter] text-sm md:text-base">
            {user?.name
              ? "Ready to continue your professional journey with us?"
              : "Let's start your journey to amazing opportunities!"}
          </p>
        </div>
      </div>
    </main>
  );
};

export default WelcomeMessage;
