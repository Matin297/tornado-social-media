import { redirect } from "next/navigation";
import { signIn } from "./actions";
import { auth } from "@/auth";

export default async function Authentication() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <form action={signIn}>
      <button>SignIn/Up</button>
    </form>
  );
}
