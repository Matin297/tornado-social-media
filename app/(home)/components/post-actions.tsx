"use client";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { PropsWithChildren, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitButton from "@/components/submit-button";
import { deletePost as deletePostAction } from "../actions";

interface PostActionsProps extends PropsWithChildren {
  postId: string;
  postUserId: string;
}

export default function PostActions({ postId, postUserId }: PostActionsProps) {
  const { toast } = useToast();
  const { data, status } = useSession();
  const [open, setOpen] = useState(false);

  async function deletePost(formData: FormData) {
    const result = await deletePostAction(formData);

    if (result) {
      toast({
        title: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Post deleted successfully",
      });
      setOpen(false);
    }
  }

  if (status === "loading") return <Skeleton className="h-9 w-16" />;

  if (status === "authenticated" && data.user?.id === postUserId)
    return (
      <Dialog open={open}>
        <Button onClick={() => setOpen(true)} variant="destructive">
          Delete
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <form action={deletePost}>
              <input type="hidden" name="postID" value={postId} />
              <SubmitButton variant="destructive">Confirm</SubmitButton>
            </form>
            <Button onClick={() => setOpen(false)} variant="secondary">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

  return null;
}
