import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CreatePostForm from "./components/create-post-form";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  return <CreatePostForm />;
}
