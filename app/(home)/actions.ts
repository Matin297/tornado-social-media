"use server";

import { z } from "zod";
import db from "@/prisma/client";
import { startTransition } from "react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { signOut as AuthSignOut, auth } from "@/auth";

export async function signOut() {
  await AuthSignOut({ redirectTo: "/auth" });
}

export async function search(formData: FormData) {
  const query = (formData.get("q") as string)?.trim();
  if (query) {
    redirect("/search?q=" + query);
  }
}

const CreatePostSchema = z.object({
  content: z.string().min(1, "Content is required!"),
});

export async function publishPost(formData: FormData) {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    throw new Error("Unauthenticated request!");
  }

  const validationResult = CreatePostSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationResult.success) {
    return {
      message: "Validation Error!",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { content } = validationResult.data;

  try {
    await db.post.create({
      data: {
        content,
        userId: session.user.id,
      },
    });
  } catch (error) {
    return {
      message: "Unable to publish the post! Try again later.",
    };
  }

  revalidatePath("/");
}

export async function deletePost(formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user || !session.user.id) {
      throw new Error("Unauthenticated request!");
    }

    const postID = formData.get("postID") as string;

    if (!postID) throw new Error("PostID is missing!");

    const post = await db.post.findFirst({
      where: {
        id: postID,
        user: {
          id: session.user.id,
        },
      },
    });

    if (!post) {
      throw new Error("Post does not exist!");
    }

    await db.post.delete({ where: { id: postID } });
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Unable to delete the post!",
    };
  }

  revalidatePath("/");
}
