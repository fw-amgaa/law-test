"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  correctAnswerCount: number;
  totalQuestions: number;
}

export function ResultComponent({ correctAnswerCount, totalQuestions }: Props) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const percentage = (correctAnswerCount / totalQuestions) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 500);

    if (percentage >= 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    return () => clearTimeout(timer);
  }, [percentage]);

  const getEmoji = () => {
    if (percentage < 60) return "😞";
    if (percentage < 80) return "😊";
    return "🎉";
  };

  const getMessage = () => {
    if (percentage < 60) return "Keep practicing!";
    if (percentage < 80) return "Good job!";
    return "Excellent work!";
  };

  const getGrade = () => {
    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";
    if (percentage >= 60) return "D";
    return "F";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary/20 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Тестийн хариу
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="text-7xl text-center"
          >
            {getEmoji()}
          </motion.div>
          <div className="text-center space-y-2">
            <p className="text-xl font-semibold">{getMessage()}</p>
            <p className="text-muted-foreground">
              Та {totalQuestions} асуултуудаас {correctAnswerCount}-г зөв
              хариулсан байна.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Оноо</span>
              <Badge variant={percentage >= 60 ? "success" : "destructive"}>
                Дүн: {getGrade()}
              </Badge>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-right text-sm font-medium">
              {percentage.toFixed(2)}%
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-muted p-4 rounded-lg"
          >
            <h3 className="font-semibold mb-2">Хариултын задаргаа</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Зөв хариултууд: {correctAnswerCount}</li>
              <li>Буруу хариултууд: {totalQuestions - correctAnswerCount}</li>
              <li>Нийт асуултууд: {totalQuestions}</li>
            </ul>
          </motion.div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push("/")} className="w-full">
            Бүлгүүд рүү буцах
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
