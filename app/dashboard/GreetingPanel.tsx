"use client";

import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function GreetingPanel() {
  const [timeOfDay, setTimeOfDay] = useState("");
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    // Determine time of day
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 18) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");

    // Simulate fetching user stats (replace with actual API call)
    setQuestionsAnswered(Math.floor(Math.random() * 10)); // Random for demo
  }, []);
  return (
    <div className="mt-[80px] lg:mt-0 flex w-full">
      <div className="bg-[#fff] p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#202222] flex items-center gap-2">
            Good {timeOfDay}, {session?.user?.name || "Guest"}{" "}
            <span className="wave">👋</span>
          </h2>
          <p className="text-gray-600 mt-1">
            {timeOfDay === "morning"
              ? "Ready to make today productive?"
              : timeOfDay === "afternoon"
              ? "How's your day going so far?"
              : "Let's finish the day strong!"}
          </p>
        </div>

        {questionsAnswered > 0 && (
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-800 text-sm font-medium">
                {questionsAnswered} question{questionsAnswered !== 1 ? "s" : ""}{" "}
                answered today
              </span>
            </div>
            <Button>Continue Studying</Button>
          </div>
        )}
      </div>
    </div>
  );
}
