import { auth } from "@/auth";
import { signOut } from "./actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  return (
    <section>
      <h1>Tornado Social Media App: {session.user?.name || "Anonymous"}</h1>
      <form action={signOut}>
        <button>SignOut</button>
      </form>
    </section>
  );
}
