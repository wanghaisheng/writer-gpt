"use client";

import React, { PropsWithChildren, useEffect } from "react";

import { ThemeProvider } from "next-themes";

import { useToken } from "@store/token";

import { hasProAccount } from "@lib/openai";

export const HOC = ({ children }: PropsWithChildren) => {
  const { token, setIsPro } = useToken();

  useEffect(() => {
    const onLoad = async () => {
      if (!token) return;

      setIsPro(await hasProAccount({ apiKey: token }));
    };

    onLoad();
  }, [token]);

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};
