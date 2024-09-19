"use server";

import axios from "axios";

export async function getChapters() {
  return await axios
    .get("https://seashell-app-5pkns.ondigitalocean.app/api" + "/chapter", {
      headers: {
        Accept: "application/json",
      },
    })
    .then((res) => res.data);
}
