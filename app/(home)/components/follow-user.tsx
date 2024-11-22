"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { toggleFollowStatus } from "../actions";
import { useOptimistic, startTransition } from "react";

interface FollowUserProps {
  followerId: string;
  followingId: string;
  followers: string[];
}

export default function FollowUser({
  followers,
  followerId,
  followingId,
}: FollowUserProps) {
  const { toast } = useToast();
  const [optimisticState, setOptimisticState] = useOptimistic<string[], string>(
    followers,
    (currentState, value) =>
      currentState.at(-1) === value
        ? currentState.slice(0, -1)
        : currentState.concat(value),
  );

  const isFollowing = optimisticState.includes(followerId);

  async function handleFollow() {
    startTransition(() => {
      setOptimisticState(followerId);
    });

    const result = await toggleFollowStatus({ followingId });
    if (result?.message) {
      toast({
        variant: "destructive",
        title: result.message,
      });
    }
  }

  return (
    <Button
      size="sm"
      onClick={handleFollow}
      variant={isFollowing ? "ghost" : "outline"}
    >
      {isFollowing ? "UnFollow" : "Follow"}
    </Button>
  );
}
