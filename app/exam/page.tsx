import { auth } from "@/auth";
import Exam from "./exam";
import { redirect } from "next/navigation";
import { getQuestions } from "./actions";

export default async function ExamPage({
  searchParams,
}: {
  searchParams: {
    chapter_id: string;
  };
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const questions = await getQuestions(
    searchParams.chapter_id,
    session.user.token
  );

  return <Exam questionList={questions?.data || []} />;
}
