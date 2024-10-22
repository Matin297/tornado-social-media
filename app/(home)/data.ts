import db from "@/prisma/client";

export async function fetchPosts() {
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
    });
    return posts;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Cannot fetch posts!");
  }
}
