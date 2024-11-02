import Link from "next/link";
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import PostActions from "./post-actions";
import { formatDistanceToNow } from "date-fns";
import Pagination from "@/components/pagination";
import { fetchPosts, fetchTotalPostPages } from "../data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostListProps {
  page: number;
}

export default async function PostList({ page }: PostListProps) {
  const [totalPages, posts] = await Promise.all([
    fetchTotalPostPages(),
    fetchPosts({ page }),
  ]);

  return (
    <>
      <ul className="space-y-4">
        {posts.map((post) => (
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
      <Pagination totalPages={totalPages} />
    </>
  );
}
