import { auth } from "@/auth";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import PostList from "./components/post-list";
import CreatePostForm from "./components/create-post-form";
import PostListSkeleton from "./components/post-list-skeleton";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  return (
    <>
      <CreatePostForm />
      <Suspense fallback={<PostListSkeleton />}>
        <PostList />
      </Suspense>
    </>
  );
}
