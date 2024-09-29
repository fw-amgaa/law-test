"use server";

import axios from "axios";
import { IResult } from "./exam";

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

export async function postAnswers(answerList: IResult[], token: string) {
  if (token === "") {
    console.log("Token is empty");
    return;
  }

  try {
    return await axios({
      method: "post",
      url:
        "https://seashell-app-5pkns.ondigitalocean.app/api" +
        "/answer/create-result",
      data: answerList,
      headers: {
        Accept: "application/json",
        Authorization: `${token}`,
      },
    }).then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
}
