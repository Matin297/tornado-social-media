"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Bell, Mail, Bookmark } from "lucide-react";

const LINKS = [
  {
    href: "/",
    title: "Home",
    icon: <Home />,
  },
  {
    href: "/notifications",
    title: "Notifications",
    icon: <Bell />,
  },
  {
    href: "/messages",
    title: "Messages",
    icon: <Mail />,
  },
  {
    href: "/bookmarks",
    title: "Bookmarks",
    icon: <Bookmark />,
  },
];

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("rounded-md border bg-card shadow-sm", className)}>
      {LINKS.map(({ href, title, icon }) => (
        <Button
          asChild
          key={href}
          variant="ghost"
          className={cn(
            "w-full rounded-none sm:justify-start sm:rounded-md",
            pathname === href && "bg-accent text-accent-foreground",
          )}
        >
          <Link href={href}>
            {icon}
            <span className="hidden lg:inline-block">{title}</span>
          </Link>
        </Button>
      ))}
    </nav>
  );
}
