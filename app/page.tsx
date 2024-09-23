import { getChapters } from "@/components/chapters/action";
import HomePage from "./home";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const chapters = await getChapters();

  return <HomePage user={session.user} chapters={chapters.data} />;
}
