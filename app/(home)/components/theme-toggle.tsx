"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import {
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuCheckboxItem,
  DropdownMenuSubContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type ThemeName = "dark" | "light" | "system";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const handleTheme = (name: ThemeName) => () => {
    setTheme(name);
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuCheckboxItem
          checked={theme === "dark"}
          onCheckedChange={handleTheme("dark")}
        >
          <Moon size={18} className="me-2" />
          <span>Dark</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "light"}
          onCheckedChange={handleTheme("light")}
        >
          <Sun size={18} className="me-2" />
          <span>Light</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "system"}
          onCheckedChange={handleTheme("system")}
        >
          <Monitor size={18} className="me-2" />
          <span>System</span>
        </DropdownMenuCheckboxItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
