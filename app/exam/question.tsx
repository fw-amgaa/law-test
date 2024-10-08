"use client";

import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Spinner } from "@/components/spinner";

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
  loading: boolean;
  onClickNext: (selectedAnswer: IAnswer) => void;
  chapterName: string;
  totalQuestionsCount: number;
}

export default function Question({
  question,
  loading,
  onClickNext,
  chapterName,
  totalQuestionsCount,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<IAnswer | null>(null);
  const [selectedCorrectAnswer, setSelectedCorrectAnswer] =
    useState<IAnswer | null>(null);
  const [selectedWrongAnswer, setSelectedWrongAnswer] =
    useState<IAnswer | null>(null);

  const router = useRouter();

  useEffect(() => {
    setSelectedAnswer(null);
    setSelectedCorrectAnswer(null);
    setSelectedWrongAnswer(null);
  }, [question]);

  if (!question) {
    return (
      <div className="flex flex-col">
        <div className="mb-4">Та давхар орсон байна. Дахин нэвтэрнэ үү. </div>
        <Button onClick={() => router.push("/login")}>Нэвтрэх</Button>
      </div>
    );
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
    <div className="w-full h-full max-w-3xl mx-auto p-4 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 flex justify-between items-center gap-2"
      >
        <Button
          onClick={() => router.back()}
          className="bg-white"
          variant={"outline"}
          size="sm"
        >
          <ArrowLeft className="mr-2" width={16} height={16} />
          Буцах
        </Button>
        <Badge variant="outline" className="text-sm bg-white">
          Бүлэг: {chapterName}
        </Badge>

        <Badge variant="outline" className="text-sm bg-white">
          Нийт асуултууд: {totalQuestionsCount}
        </Badge>
      </motion.div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl overflow-y-scroll">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.question}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-4"
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
                  Таны хариулт:{" "}
                  <span className="font-bold">
                    {selectedAnswer.answer}{" "}
                    {selectedCorrectAnswer === selectedAnswer ? "✅" : "❌"}
                  </span>
                </p>
                <Button
                  disabled={loading}
                  onClick={() => onClickNext(selectedAnswer)}
                >
                  {loading ? <Spinner /> : "Дараагийн асуулт"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>

      <div className="h-4" />
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
          "w-full justify-start text-left h-auto py-3 text-black whitespace-normal",
          correct && "border-green-500 bg-green-400 hover:bg-green-200",
          wrong && "border-red-500 bg-red-400 hover:bg-red-200"
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
