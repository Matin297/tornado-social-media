import { auth } from "@/auth";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import PostList from "./components/post-list";
import CreatePostForm from "./components/create-post-form";
import PostListSkeleton from "./components/post-list-skeleton";

interface HomePageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

export default async function Home(props: HomePageProps) {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page ?? "1");

  return (
    <>
      <CreatePostForm />
      <Suspense key={page} fallback={<PostListSkeleton />}>
        <PostList page={page} />
      </Suspense>
    </>
  );
}
