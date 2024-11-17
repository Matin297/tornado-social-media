"use client";

import { cn } from "@/lib/utils";
import { signOut } from "../actions";
import SubmitButton from "@/components/submit-button";
import { useQueryClient } from "@tanstack/react-query";

interface LogoutProps {
  className?: string;
}

export default function Logout({ className }: LogoutProps) {
  const queryClient = useQueryClient();

  return (
    <form
      action={() => {
        queryClient.clear();
        signOut();
      }}
      className={cn(className)}
    >
      <SubmitButton className="w-full" variant="ghost" size="sm">
        SignOut
      </SubmitButton>
    </form>
  );
}
