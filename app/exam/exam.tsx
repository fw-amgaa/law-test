"use client";

import { useState } from "react";
import Question from "./question";
import { ResultComponent } from "./result";
import { postAnswers } from "./actions";

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

export interface IResult {
  chapter_id: number;
  question_id: number;
  answer_id: number;
  is_correct: number;
}

interface Props {
  questionList: IQuestion[];
  chapterName: string;
  token: string;
}

export default function Exam({ questionList, chapterName, token }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctQuestionCount, setCorrectQuestionCount] = useState(0);
  const [answerList, setAnswerList] = useState<IResult[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClickNext = async (selectedAnswer: IAnswer) => {
    if (selectedAnswer.is_correct === 1) {
      setCorrectQuestionCount((prev) => prev + 1);
    }

    setAnswerList((prev) => [
      ...prev,
      {
        chapter_id: questionList[currentQuestion].chapter_id,
        question_id: selectedAnswer.id,
        answer_id: selectedAnswer.id,
        is_correct: selectedAnswer.is_correct,
      },
    ]);

    if (currentQuestion === questionList.length - 1) {
      setLoading(true);
      await postAnswers(answerList, token);
      setLoading(false);
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
          loading={loading}
          totalQuestionsCount={questionList.length}
          chapterName={chapterName}
          onClickNext={onClickNext}
          question={questionList[currentQuestion]}
        />
      )}
    </div>
  );
}
