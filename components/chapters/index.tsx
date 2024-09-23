"use client";

import { ChapterList } from "@/components/chapters/chapter-list";
import { User } from "next-auth";

export interface IChapter {
  id: number;
  chapter_name: string;
  chapter_number: number;
  chapter_description: string;
  chapter_image: string;
  level: number;
  parent_id: number;
}

export default function Chapters({
  chapters,
  user,
}: {
  chapters: IChapter[];
  user: User;
}) {
  return (
    <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-black sm:text-4xl md:mx-auto">
          Бүлгүүд
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Доорхи бүлгүүдээс сонгон сорилоо эхлээрэй.
        </p>
      </div>
      <ChapterList user={user} sampleChapters={chapters} />
    </div>
  );
}
