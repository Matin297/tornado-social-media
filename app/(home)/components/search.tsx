"use client";

import { cn } from "@/lib/utils";
import { search } from "../actions";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchProps {
  className?: string;
}

export default function Search({ className }: SearchProps) {
  return (
    <form
      action={search}
      className={cn("relative flex items-center", className)}
    >
      <SearchIcon size={24} className="absolute right-1" />
      <Input name="q" required className="pe-7" placeholder="search" />
    </form>
  );
}
