"use server";

import { redirect } from "next/navigation";
import { signOut as AuthSignOut } from "@/auth";

export async function signOut() {
  await AuthSignOut({ redirectTo: "/auth" });
}

export async function search(formData: FormData) {
  const query = (formData.get("q") as string)?.trim();
  if (query) {
    redirect("/search?q=" + query);
  }
}
