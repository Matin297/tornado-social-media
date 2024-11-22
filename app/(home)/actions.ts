"use server";

import db from "@/prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, signOut as AuthSignOut } from "@/auth";

export async function signOut() {
  await AuthSignOut({ redirectTo: "/auth" });
}

export async function search(formData: FormData) {
  const query = (formData.get("q") as string)?.trim();
  if (query) {
    redirect("/search?q=" + query);
  }
}

interface ToggleFollowStatus {
  followingId: string;
}
export async function toggleFollowStatus({ followingId }: ToggleFollowStatus) {
  const session = await auth();

  if (!session || !session.user?.id) {
    return {
      message: "Unauthenticated request!",
    };
  }

  try {
    const followRecord = await db.follow.findUnique({
      where: {
        followerId_followingId: {
          followingId,
          followerId: session.user.id,
        },
      },
    });

    if (followRecord) {
      // un-follow
      await db.follow.delete({
        where: {
          followerId_followingId: {
            followingId,
            followerId: session.user.id,
          },
        },
      });
    } else {
      // follow
      await db.follow.create({
        data: {
          followingId,
          followerId: session.user.id,
        },
      });
    }

    revalidatePath("/");
  } catch (error) {
    return {
      message: "Unable to toggle follow status for this user!",
    };
  }
}
