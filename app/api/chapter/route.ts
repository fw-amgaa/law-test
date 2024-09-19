import { API_URL } from "@/lib/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  // await corsMiddleware(req, res, () => {});

  // const response = await axios
  //   .get(API_URL + "/chapter")
  //   .then((res) => res.data);

  // const data = await response.json();

  return NextResponse.json({ data: "hi" });
}
