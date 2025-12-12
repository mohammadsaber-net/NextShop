"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <button
      className="p-1 fixed top-10 right-2 rounded-full dark:bg-gray-50 bg-gray-900 dark:text-gray-900 text-gray-50 z-[1000000] cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}

