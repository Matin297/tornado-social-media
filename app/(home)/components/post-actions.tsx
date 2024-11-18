"use client";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { deletePostById } from "../data";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingButton from "@/components/loading-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PostActionsProps extends PropsWithChildren {
  postId: string;
  postUserId: string;
}

export default function PostActions({ postId, postUserId }: PostActionsProps) {
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const { data, status } = useSession();

  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  const deleteMutation = useMutation({
    mutationFn: () => deletePostById(postId),
    onSuccess: () => {
      setOpen(false);
      toast({
        title: "Post delete successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["posts", page] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: error.message,
      });
    },
  });

  function handlePostDeletion() {
    deleteMutation.mutate();
  }

  function handleOpenChange(state: boolean) {
    if (!state && !deleteMutation.isPending) {
      setOpen(state);
    }
  }

  if (status === "loading") return <Skeleton className="h-9 w-16" />;

  if (status === "authenticated" && data.user?.id === postUserId)
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
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
            <LoadingButton
              onClick={handlePostDeletion}
              pending={deleteMutation.isPending}
            >
              Delete
            </LoadingButton>
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

  return null;
}
