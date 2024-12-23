import db from "@/prisma/client";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  adapter: PrismaAdapter(db),
  callbacks: {
    session({ user, session }) {
      session.user.id = user.id;
      return session;
    },
  },
});
