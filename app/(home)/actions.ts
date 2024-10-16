"use server";

import { signOut as AuthSignOut } from "@/auth";

export async function signOut() {
  await AuthSignOut({ redirectTo: "/auth" });
}
