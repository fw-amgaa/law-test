"use client";

import { useState } from "react";
import { IChapter } from ".";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
  chapters: IChapter[];
}

export default function ChapterList({ chapters }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [selectedChapter, setSelectedChapter] = useState<IChapter | null>(null);

  const onClickTakeExam = () => {
    if (session?.user) {
      router.push("/exam" + "?chapter_id=" + selectedChapter?.id);
      return;
    }

    router.push("/login");
  };

  const mappedChapters = chapters
    .map((chapter) => {
      const childChapters = chapters.filter(
        (childChapter) => childChapter.parent_id === chapter.id
      );

      if (childChapters.length === 0) {
        return {
          ...chapter,
          childChapters: [chapter],
        };
      }

      return {
        ...chapter,
        childChapters,
      };
    })
    .filter((chapter) => chapter.parent_id === 0);

  return (
    <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
      <div className="flex flex-col gap-4 lg:grid-cols-2">
        {mappedChapters.map((chapter) => (
          <Card key={chapter.id}>
            <CardHeader className="text-xl font-bold">
              <CardTitle>{chapter.chapter_name}</CardTitle>
              <CardDescription>{chapter.chapter_description}</CardDescription>
            </CardHeader>
            <CardContent>
              {chapter.childChapters.length > 0 && (
                <div className="flex flex-row gap-4 flex-wrap">
                  {chapter.childChapters.map((childChapter) => (
                    <Button
                      onClick={() => setSelectedChapter(childChapter)}
                      variant={"outline"}
                      key={childChapter.id}
                    >
                      {childChapter.chapter_name}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedChapter && (
        <Card>
          <CardHeader className="text-xl font-bold shrink-1">
            <CardTitle>{selectedChapter.chapter_name}</CardTitle>
            <CardDescription>
              {selectedChapter.chapter_description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <CardDescription className="font-bold">
              Level: <span className="text-black">{selectedChapter.level}</span>
            </CardDescription>
            <CardDescription className="font-bold">
              Number of questions: <span className="text-black">120</span>
            </CardDescription>
            <CardDescription className="font-bold">
              Duration: <span className="text-black">90 minutes</span>
            </CardDescription>
            <Button onClick={onClickTakeExam} className="mt-2">
              Take exam
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
