import db from "@/prisma/client";

const POSTS_PER_PAGE = 5;
export async function fetchTotalPostPages() {
  try {
    const count = await db.post.count();
    return Math.ceil(count / POSTS_PER_PAGE);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch total pages for posts!");
  }
}

export async function fetchPosts({ page }: { page: number }) {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
      },
      take: POSTS_PER_PAGE,
      skip: (page - 1) * POSTS_PER_PAGE,
    });
    return posts;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Cannot fetch posts!");
  }
}
