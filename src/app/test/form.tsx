"use client";

import React, { useState } from "react";

import { RequestData } from "@app/api/chat/route";
import { Loader2 } from "lucide-react";

import { useToken } from "@store/token";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

type Props = {};

export const TestForm = (props: Props) => {
  const { token } = useToken();

  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const payload: RequestData = {
      apiKey: token,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo"
    };

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(response.statusText);

    const data = response.body;
    if (!data) return;

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let currentResponse: string[] = [];
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      currentResponse = [...currentResponse, chunkValue];
      setResponse(prev => [...prev.slice(0, -1), currentResponse.join("")]);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input value={prompt} onChange={e => setPrompt(e.currentTarget.value)} />
      <Button type="submit">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>Test</span>
      </Button>

      {response.join("")}
    </form>
  );
};
