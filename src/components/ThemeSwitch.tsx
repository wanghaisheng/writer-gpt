"use client";

import React from "react";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, ButtonProps } from "@ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

const ThemeSwitch = ({ className, ...props }: ButtonProps) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <div className="relative flex items-center gap-2">
            <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 w-4 h-4 mr-2" />
            <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 w-4 h-4 mr-2" />
            <span className="sr-only">Toggle theme</span>
          </div>
          <span className="w">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitch;
