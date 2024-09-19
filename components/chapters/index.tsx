"use client";

import ChapterList from "./chapter-list";

export interface IChapter {
  id: number;
  chapter_name: string;
  chapter_number: number;
  chapter_description: string;
  chapter_image: string;
  level: number;
  parent_id: number;
  childChapters?: IChapter[];
}

export default function Chapters({ chapters }: { chapters: IChapter[] }) {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <Dots />
          Chapter List
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Select a chapter to start taking the exam. Good luck!
        </p>
      </div>
      <ChapterList chapters={chapters} />
    </div>
  );
}

function Dots() {
  return (
    <span className="relative inline-block">
      <svg
        viewBox="0 0 52 24"
        fill="currentColor"
        className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
      >
        <defs>
          <pattern
            id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
            x="0"
            y="0"
            width=".135"
            height=".30"
          >
            <circle cx="1" cy="1" r=".7"></circle>
          </pattern>
        </defs>
        <rect
          fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
          width="52"
          height="24"
        ></rect>
      </svg>
    </span>
  );
}
