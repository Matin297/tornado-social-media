import { auth } from "@/auth";
import db from "@/prisma/client";
import { Post } from "@prisma/client";
import { PostWithUser } from "@/prisma/payloads";
import { CreatePostSchema } from "@/validations/posts";

export async function fetchFollowSuggestions() {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("Unauthenticated request!");
  }

  try {
    const users = await db.user.findMany({
      where: {
        id: {
          not: session.user.id,
        },
        followers: {
          none: {
            followerId: session.user.id,
          },
        },
      },
      include: {
        followers: {
          select: {
            followerId: true,
          },
        },
      },
      take: 5,
    });

    return users.map((user) => ({
      ...user,
      followers: user.followers.map((follower) => follower.followerId),
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch the users!");
  }
}

// Client Side usage
interface FilterOptions {
  page?: string | null;
}
export async function fetchPosts({ page }: FilterOptions) {
  try {
    const result = await fetch(`/api/posts/?page=${page ?? 1}`);
    const data = await result.json();
    if (!result.ok) {
      throw new Error(data.message);
    }
    return data as {
      count: number;
      posts: PostWithUser[];
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Cannot fetch posts!");
  }
}

export async function deletePostById(id: string) {
  try {
    const result = await fetch(`/api/posts/${id}`, {
      method: "post",
    });
    const data = await result.json();
    if (!result.ok) {
      throw new Error(data.message);
    }
    return data as Post;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Cannot fetch posts!");
  }
}

// We will let useMutation catch the errors when thrown
export async function createPost(formData: FormData) {
  CreatePostSchema.parse(Object.fromEntries(formData.entries()));

  const result = await fetch("/api/posts", {
    method: "POST",
    body: formData,
  });
  const data = await result.json();

  if (!result.ok) {
    throw data;
  }

  return data as PostWithUser;
}
