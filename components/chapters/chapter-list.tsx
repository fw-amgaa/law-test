"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";

interface IChapter {
  id: number;
  chapter_name: string;
  chapter_number: number;
  chapter_description: string;
  chapter_image: string;
  level: number;
  parent_id: number;
}

interface ChapterNodeProps {
  chapter: IChapter;
  childChapters: IChapter[];
  onSelect: (chapter: IChapter) => void;
  selectedChapter: IChapter | null;
  chapterTree: { [key: number]: IChapter[] };
}

const ChapterNode: React.FC<ChapterNodeProps> = ({
  chapter,
  childChapters,
  onSelect,
  selectedChapter,
  chapterTree,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = childChapters.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else {
      onSelect(chapter);
    }
  };

  const isSelected = selectedChapter?.id === chapter.id;

  return (
    <div className="mb-2">
      <div
        className={`flex items-center p-2 rounded-md cursor-pointer ${
          isSelected ? "bg-primary text-primary-foreground" : "hover:bg-accent"
        }`}
        onClick={handleClick}
      >
        {hasChildren && (
          <span className="mr-2">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </span>
        )}
        <span className="flex-grow">{chapter.chapter_name}</span>
        {!hasChildren && (
          <button
            className="ml-2 px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(chapter);
            }}
          >
            Select
          </button>
        )}
      </div>
      {isOpen && hasChildren && (
        <div className="ml-4 mt-2">
          {childChapters.map((child) => (
            <ChapterNode
              key={child.id}
              chapter={child}
              childChapters={chapterTree[child.id] || []}
              onSelect={onSelect}
              selectedChapter={selectedChapter}
              chapterTree={chapterTree}
            ></ChapterNode>
          ))}
        </div>
      )}
    </div>
  );
};

export function ChapterList({
  sampleChapters,
  user,
}: {
  sampleChapters: IChapter[];
  user: User;
}) {
  const router = useRouter();
  const [selectedChapter, setSelectedChapter] = useState<IChapter | null>(null);
  const [loading, setLoading] = useState(false);

  const chapterTree = useMemo(() => {
    const tree: { [key: number]: IChapter[] } = {};
    sampleChapters.forEach((chapter) => {
      if (!tree[chapter.parent_id]) {
        tree[chapter.parent_id] = [];
      }
      tree[chapter.parent_id].push(chapter);
    });
    return tree;
  }, [sampleChapters]);

  const renderChapter = (chapter: IChapter) => (
    <ChapterNode
      key={chapter.id}
      chapter={chapter}
      childChapters={chapterTree[chapter.id] || []}
      onSelect={setSelectedChapter}
      selectedChapter={selectedChapter}
      chapterTree={chapterTree}
    />
  );

  const onClickTakeExam = () => {
    setLoading(true);
    if (user) {
      router.push(
        "/exam" +
          "?chapter_id=" +
          selectedChapter?.id +
          "&chapter_name=" +
          selectedChapter?.chapter_name
      );
      return;
    }

    router.push("/login");
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 text-black">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 lg:w-2/5 bg-white shadow-lg rounded-lg p-4 h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="space-y-2">{chapterTree[0]?.map(renderChapter)}</div>
        </div>
        <div className="w-full md:w-1/2 lg:w-3/5 bg-white shadow-lg rounded-lg p-4 h-[calc(100vh-8rem)] overflow-y-auto">
          {selectedChapter ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Selected Chapter Details
              </h3>
              <p>
                <strong>Name:</strong> {selectedChapter.chapter_name}
              </p>
              <p>
                <strong>Number:</strong> {selectedChapter.chapter_number}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedChapter.chapter_description}
              </p>

              <Button onClick={onClickTakeExam} className="mt-2">
                {loading ? <Spinner /> : "Take exam"}
              </Button>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select a chapter to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
