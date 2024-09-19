"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  correctAnswerCount: number;
  totalQuestions: number;
}

export default function Result({ correctAnswerCount, totalQuestions }: Props) {
  const router = useRouter();
  return (
    <div className="text-black flex flex-col w-full h-full items-center justify-center">
      <h1 className="text-4xl font-bold">Result</h1>
      <p className="mt-4 text-lg">
        You got {correctAnswerCount} out of {totalQuestions} correct answers!
      </p>

      <p>
        Percentage: {((correctAnswerCount / totalQuestions) * 100).toFixed(2)}%
        <span className="ml-1">
          {correctAnswerCount / totalQuestions < 0.6
            ? "😞"
            : correctAnswerCount / totalQuestions < 0.8
            ? "😐"
            : "😊"}
        </span>
      </p>

      <Button onClick={() => router.push("/")}>Back to home</Button>
    </div>
  );
}
