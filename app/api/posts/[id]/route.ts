import { auth } from "@/auth";
import db from "@/prisma/client";
import { type NextRequest } from "next/server";

export async function POST(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const postID = (await params).id;

  const session = await auth();

  if (!session || !session.user)
    return Response.json(
      { message: "Unauthenticated request!" },
      { status: 401 },
    );

  try {
    const postItem = await db.post.findFirst({
      where: {
        id: postID,
      },
    });

    if (!postItem) {
      return Response.json(
        { message: "Post Item not found!" },
        { status: 404 },
      );
    }

    if (postItem.userId !== session.user.id) {
      return Response.json(
        { message: "Post Item not found!" },
        { status: 403 },
      );
    }

    await db.post.delete({
      where: {
        id: postID,
      },
    });

    return Response.json(postItem, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to delete the post!" },
      { status: 500 },
    );
  }
}
