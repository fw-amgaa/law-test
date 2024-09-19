import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IAnswer, IQuestion } from "./exam";

interface Props {
  question: IQuestion;
  onClickNext: (isCorrect: boolean) => void;
}

export default function Question({ question, onClickNext }: Props) {
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
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-row gap-4 flex-wrap">
          {question.answer_list.map((answer, index) => (
            <AnswerBox
              correct={selectedCorrectAnswer === answer}
              wrong={selectedWrongAnswer === answer}
              onClick={() => onPressAnswer(answer)}
              key={index}
              answer={answer}
            />
          ))}
        </div>
      </CardContent>

      <CardFooter>
        {selectedAnswer && (
          <div className="w-full mt-4 flex flex-row gap-4 justify-between items-center">
            <p>
              Your answer:{" "}
              <span className="font-bold">
                {selectedAnswer.answer}{" "}
                {selectedCorrectAnswer === selectedAnswer ? "✅" : "❌"}
              </span>
            </p>
            <Button onClick={() => onClickNext(selectedWrongAnswer === null)}>
              Next
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

function AnswerBox({
  answer,
  correct,
  wrong,
  onClick,
}: {
  answer: IAnswer;
  correct: boolean;
  wrong: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={"outline"}
      onClick={onClick}
      className={cn(
        "w-full",
        correct && "border-green-500 bg-green-100",
        wrong && "border-red-500 bg-red-100"
      )}
    >
      {answer.answer_variant}. {answer.answer}
    </Button>
  );
}
