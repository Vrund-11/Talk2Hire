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
          bg-white-500 rounded-lg shadow-md border border-gray-200
          w-full
          p-4
          flex justify-between items-center
        "
      >
        {user && (
          <Image
            src={user?.picture}
            alt="Welcome Image"
            width={50}
            height={50}
            className="rounded-full"
          />
        )}

        <div className="WelcomeMessage max-w-md">
          <h2 className="font-bold mb-2 font-[Poppins] text-lg md:text-2xl">
            {user?.name
              ? `Welcome back, ${user.name}!`
              : "Welcome to Talk2Hire!"}
          </h2>

          <p className="text-gray-700 opacity-90 font-[Inter] text-sm md:text-base">
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
