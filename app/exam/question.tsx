"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
  question: IQuestion;
  onClickNext: (isCorrect: boolean) => void;
  chapterName: string;
}

export default function Question({
  question,
  onClickNext,
  chapterName,
}: Props) {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<IAnswer | null>(null);
  const [selectedCorrectAnswer, setSelectedCorrectAnswer] =
    useState<IAnswer | null>(null);
  const [selectedWrongAnswer, setSelectedWrongAnswer] =
    useState<IAnswer | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
    setSelectedCorrectAnswer(null);
    setSelectedWrongAnswer(null);
  }, [question]);

  if (!question) {
    return <div>error fetching questions</div>;
  }

  const onPressAnswer = (answer: IAnswer) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    if (answer.is_correct === 1) {
      setSelectedCorrectAnswer(answer);
    } else {
      setSelectedWrongAnswer(answer);
      setSelectedCorrectAnswer(
        question.answer_list.find((a) => a.is_correct === 1)!
      );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 flex justify-between items-center"
      >
        <Badge variant="outline" className="text-sm bg-white">
          Chapter: {chapterName}
        </Badge>
      </motion.div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={question.question}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {question.answer_list.map((answer, index) => (
                <AnswerBox
                  key={index}
                  correct={selectedCorrectAnswer === answer}
                  wrong={selectedWrongAnswer === answer}
                  onClick={() => onPressAnswer(answer)}
                  answer={answer}
                  disabled={selectedAnswer !== null}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter>
          <AnimatePresence>
            {selectedAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full mt-4 flex flex-col sm:flex-row gap-4 justify-between items-center"
              >
                <p className="text-sm">
                  Your answer:{" "}
                  <span className="font-bold">
                    {selectedAnswer.answer}{" "}
                    {selectedCorrectAnswer === selectedAnswer ? "✅" : "❌"}
                  </span>
                </p>
                <Button
                  onClick={() => onClickNext(selectedWrongAnswer === null)}
                >
                  Next Question
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
    </div>
  );
}

function AnswerBox({
  answer,
  correct,
  wrong,
  onClick,
  disabled,
}: {
  answer: IAnswer;
  correct: boolean;
  wrong: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <Button
        variant={correct ? "default" : wrong ? "destructive" : "outline"}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "w-full justify-start text-left h-auto py-3 text-black",
          correct && "border-green-500 bg-green-100 hover:bg-green-200",
          wrong && "border-red-500 bg-red-100 hover:bg-red-200"
        )}
      >
        <span className="font-bold mr-2 text-black">
          {answer.answer_variant}.
        </span>{" "}
        {answer.answer}
      </Button>
    </motion.div>
  );
}
