import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { fetchPosts } from "../data";
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function PostList() {
  const posts = await fetchPosts();

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id}>
          <article>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Link
                    href={`/users/${post.userId}`}
                    className="flex items-center gap-2"
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
  );
}
