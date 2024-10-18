"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export default function Providers(props: ThemeProviderProps) {
  return <NextThemeProvider {...props} />;
}
