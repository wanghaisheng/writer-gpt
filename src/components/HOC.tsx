"use client";

import React, { PropsWithChildren } from "react";

import { ThemeProvider } from "next-themes";

export const HOC = ({ children }: PropsWithChildren) => (
  <ThemeProvider attribute="class" defaultTheme="light">
    {children}
  </ThemeProvider>
);
