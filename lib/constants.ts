import { config } from "dotenv";

config({ path: ".env.local" });

export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : process.env.NEXT_PUBLIC_API_URL;
