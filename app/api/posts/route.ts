import { auth } from "@/auth";
import db from "@/prisma/client";
import { type NextRequest } from "next/server";
import { CreatePostSchema } from "@/validations/posts";
import { userIncludedPayload } from "@/prisma/payloads";

const POSTS_PER_PAGE = 5;
export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session)
    return Response.json(
      { message: "Unauthenticated request!" },
      { status: 401 },
    );

  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page"));

    const [posts, count] = await db.$transaction([
      db.post.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        take: POSTS_PER_PAGE,
        skip: (page - 1) * POSTS_PER_PAGE,
        include: userIncludedPayload,
      }),
      db.post.count(),
    ]);

    return Response.json(
      { posts, count: Math.ceil(count / POSTS_PER_PAGE) },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { message: "Failed to get the posts!" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user?.id)
    return Response.json(
      { message: "Unauthenticated request!" },
      { status: 401 },
    );

  const formData = await request.formData();

  const validationResult = CreatePostSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationResult.success) {
    return Response.json(validationResult.error.flatten().fieldErrors, {
      status: 400,
    });
  }

  const { content } = validationResult.data;

  try {
    const post = await db.post.create({
      data: {
        content,
        userId: session.user.id,
      },
      include: userIncludedPayload,
    });

    return Response.json(post, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        message: "Unable to publish the post! Try again later.",
      },
      { status: 500 },
    );
  }
}
