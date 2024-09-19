import NextAuth, { NextAuthConfig } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import { API_URL } from "./lib/constants";

export const authConfig = {
  providers: [
    Credentials({
      type: "credentials",
      credentials: {
        phone: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { phone, password } = credentials;

        if (!phone || !password) {
          throw new Error("User not found.");
        }

        const response = await fetch(
          "https://seashell-app-5pkns.ondigitalocean.app/api" + "/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone,
              password,
            }),
          }
        ).then((res) => res.json());

        if (response.message === "success") {
          return response.data;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token.user) {
        session.user = token.user as AdapterUser;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
