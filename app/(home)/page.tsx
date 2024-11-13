import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PostList from "./components/post-list";
import CreatePostForm from "./components/create-post-form";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  return (
    <>
      <CreatePostForm />
      <PostList />
    </>
  );
}
