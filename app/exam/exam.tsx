"use client";

import { useState } from "react";
import Question from "./question";
import { ResultComponent } from "./result";

export interface IAnswer {
  id: number;
  question_id: number;
  answer_variant: string;
  answer: string;
  is_correct: 0 | 1;
  created_at: string;
}

export interface IQuestion {
  id: number;
  question: string;
  chapter_id: number;
  hard_level: number;
  answer_list: IAnswer[];
  created_at: string;
}

interface Props {
  questionList: IQuestion[];
  chapterName: string;
}

export default function Exam({ questionList, chapterName }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctQuestionCount, setCorrectQuestionCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  console.log(chapterName);
  const onClickNext = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectQuestionCount((prev) => prev + 1);
    }

    if (currentQuestion === questionList.length - 1) {
      setShowResult(true);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <div className="text-black flex flex-col w-full h-full items-center justify-center">
      {showResult ? (
        <ResultComponent
          correctAnswerCount={correctQuestionCount}
          totalQuestions={questionList.length}
        />
      ) : (
        <Question
          chapterName={chapterName}
          onClickNext={onClickNext}
          question={questionList[currentQuestion]}
        />
      )}
    </div>
  );
}
