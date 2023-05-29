"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

import { SystemThemes, Themes } from "@interface/theme";

import { Button, ButtonProps } from "@ui/button";

const ThemeSwitch = ({ className, ...props }: ButtonProps) => {
  const { theme, setTheme, systemTheme } = useTheme() as {
    theme: Themes;
    setTheme: (theme: Themes) => void;
    systemTheme: SystemThemes;
  };

  return (
    <Button
      variant="ghost"
      onClick={() =>
        setTheme(
          theme === "light"
            ? "dark"
            : theme === "system"
            ? systemTheme === "light"
              ? "dark"
              : "light"
            : "light"
        )
      }
      {...props}
    >
      {theme === "light" || systemTheme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
};

export default ThemeSwitch;
