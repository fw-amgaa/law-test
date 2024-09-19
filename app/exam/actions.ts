"use server";

import axios from "axios";

export async function getQuestions(chapterId: string, token: string) {
  try {
    return await axios
      .get(
        "https://seashell-app-5pkns.ondigitalocean.app/api" +
          "/question/by-chapter-id?chapter_id=" +
          chapterId,
        {
          headers: {
            Accept: "application/json",
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
}
