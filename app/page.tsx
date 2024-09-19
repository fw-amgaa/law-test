import { getChapters } from "@/components/chapters/action";
import HomePage from "./home";

export default async function Home() {
  const chapters = await getChapters();

  return <HomePage chapters={chapters.data} />;
}
