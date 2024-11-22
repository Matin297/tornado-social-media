import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PostList from "./components/post-list";
import CreatePostForm from "./components/create-post-form";
import FollowSuggestions from "./components/follow-suggestions";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  return (
    <main className="flex flex-row gap-4">
      <aside className="hidden max-w-xs shrink-0 basis-1/3 lg:order-1 lg:block">
        <FollowSuggestions />
      </aside>
      <section className="grow space-y-4">
        <CreatePostForm />
        <PostList />
      </section>
    </main>
  );
}
