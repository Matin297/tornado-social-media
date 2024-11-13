"use client";

import Link from "next/link";
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { fetchPosts } from "../data";
import PostActions from "./post-actions";
import { AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/pagination";
import { useSearchParams } from "next/navigation";
import PostListSkeleton from "./post-list-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PostList() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const { data, status, error, isFetching } = useQuery({
    staleTime: Infinity, // on demand control
    refetchOnWindowFocus: false,
    queryKey: ["posts", page ?? "1"],
    queryFn: () => fetchPosts({ page }),
  });

  if (status === "pending" || isFetching) return <PostListSkeleton />;

  if (status === "error")
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );

  return (
    <>
      <ul className="space-y-4">
        {data.posts.map((post) => (
          <li key={post.id}>
            <article>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <Link
                      href={`/users/${post.userId}`}
                      className="inline-flex items-center gap-2"
                    >
                      <Avatar>
                        <AvatarImage
                          src={post?.user?.image ?? ""}
                          alt={post.user.name ?? "John Doe"}
                        />
                        <AvatarFallback>
                          {post?.user?.name?.[0] ?? "JD"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p>{post.user.name}</p>
                        <p className="font-normal">{post.user.email}</p>
                      </div>
                    </Link>
                    <PostActions postId={post.id} postUserId={post.userId} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{post.content}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm">
                    {formatDistanceToNow(post.updatedAt, { addSuffix: true })}
                  </p>
                </CardFooter>
              </Card>
            </article>
          </li>
        ))}
      </ul>
      <Pagination totalPages={data.count} />
    </>
  );
}
