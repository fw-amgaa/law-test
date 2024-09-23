"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function login(e: FormData) {
  try {
    await signIn("credentials", {
      phone: e.get("phone"),
      password: e.get("password"),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof Error) {
      const { type, cause } = error as AuthError;
      switch (type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        case "CallbackRouteError":
          return { error: cause?.err?.toString() };
        default:
          return { error: "Something went wrong." };
      }
    }

    throw error;
  }
}

export async function logout() {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    if (error instanceof Error) {
      const { type, cause } = error as AuthError;
      switch (type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        case "CallbackRouteError":
          return { error: cause?.err?.toString() };
        default:
          return { error: "Something went wrong." };
      }
    }

    throw error;
  }
}
