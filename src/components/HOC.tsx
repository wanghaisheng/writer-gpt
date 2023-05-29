"use client";

import { ThemeProvider } from "next-themes";
import React, { PropsWithChildren } from "react";

export const HOC = ({ children }: PropsWithChildren) => (
  <ThemeProvider attribute="class">{children}</ThemeProvider>
);
