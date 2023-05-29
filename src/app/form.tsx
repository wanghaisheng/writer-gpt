"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { List, Loader2, ScrollText } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { apiURL, structure } from "@config/chat";
import { title } from "@config/seo";

import { OpenAIStreamPayload } from "@interface/openai";

import { useToken } from "@store/token";

import ThemeSwitch from "@components/ThemeSwitch";
import { TokenForm } from "@components/Token";
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";

import { chat } from "@lib/openai";

export const generateContent = z.object({
  keywords: z.string().min(1, { message: "Please add keywords!" }),
  outline: z.string().min(1, { message: "Please add outline!" })
});

type GenerateContent = z.infer<typeof generateContent>;

type Props = {};

const Form = (props: Props) => {
  const { token } = useToken();

  const [loadingKeyWords, setLoadingKeyWords] = useState<boolean>(false);
  const [loadingOutline, setLoadingOutline] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<GenerateContent>({
    resolver: zodResolver(generateContent)
  });

  const [keywords, outline] = watch(["keywords", "outline"]);

  const onGenerateKeywords = async () => {
    if (!token) return;

    setLoadingKeyWords(true);

    setLoadingKeyWords(false);
  };

  const onGenerateOutline = async () => {
    if (!token) return;

    setLoadingOutline(true);

    try {
      const response = await chat({
        key: token,
        messages: [
          {
            role: "user",
            content: structure.replaceAll("{{keywords}}", keywords)
          }
        ]
      });

      if (response) setValue("outline", response);
    } catch (error) {
      // Handle fetch request errors
    }

    setLoadingOutline(false);
  };

  const onSubmit = handleSubmit(payload => {});

  return (
    <div className="flex flex-col w-full max-w-md gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">✨ 🤖 {title} ✨ </h1>

        <ThemeSwitch />
      </div>

      <TokenForm />

      <form className="flex flex-col gap-4 w-full flex-1" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="keywords">Keywords</Label>

          <Textarea
            disabled={loadingKeyWords}
            id="keywords"
            placeholder="Keyword 1..."
            action={
              <Button
                size="sm"
                className="rounded-full"
                type="button"
                disabled={loadingKeyWords}
                onClick={onGenerateKeywords}
              >
                {loadingKeyWords ? (
                  <Loader2 className="animate-spin mr-2 w-5 h-6" />
                ) : (
                  <List className="w-5 h-5 mr-2" />
                )}
                Generate
              </Button>
            }
            {...register("keywords")}
          />

          {errors?.keywords && (
            <p className="text-sm text-red-600">{errors?.keywords.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="outline">Outline</Label>

          <Textarea
            disabled={loadingOutline}
            id="outline"
            placeholder="Introduction..."
            action={
              <Button
                size="sm"
                className="rounded-full"
                type="button"
                disabled={loadingOutline}
                onClick={onGenerateOutline}
              >
                {loadingOutline ? (
                  <Loader2 className="animate-spin mr-2 w-5 h-6" />
                ) : (
                  <ScrollText className="w-5 h-5 mr-2" />
                )}
                Generate
              </Button>
            }
            {...register("outline")}
          />

          {errors?.outline && (
            <p className="text-sm text-red-600">{errors?.outline.message}</p>
          )}
        </div>

        <Button type="submit">Generate</Button>
      </form>
    </div>
  );
};

export default Form;
