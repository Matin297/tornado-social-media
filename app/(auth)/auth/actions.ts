"use server";

import { signIn as AuthSignIn } from "@/auth";

export async function signIn() {
  await AuthSignIn("github", { redirectTo: "/" });
}
