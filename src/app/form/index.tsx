"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Circle, Play } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  contentPrompt,
  outlineToArraySystemPrompt,
  systemPrompt
} from "@config/chat";
import { outlineToArrayPrompt } from "@config/chat";
import { title } from "@config/seo";

import { PostSection } from "@interface/structure";

import { useSettings } from "@store/settings";
import { useToken } from "@store/token";

import ThemeSwitch from "@components/ThemeSwitch";
import { TokenForm } from "@components/Token";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";

import { chat } from "@lib/openai";

import { KeyWordsInputs } from "./inputs/keywords";
import { OutlineInput } from "./inputs/outline";

export const generateContent = z.object({
  keywords: z.object({
    main: z.string().min(1, { message: "Please add main keywords!" }),
    secondary: z.string().min(1, { message: "Please add secondary keywords!" })
  }),
  outline: z.string().min(1, { message: "Please add outline!" })
});

export type GenerateContent = z.infer<typeof generateContent>;

export const Form = () => {
  const { token } = useToken();
  const { settings } = useSettings();

  const [postContent, setPostContent] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger
  } = useForm<GenerateContent>({
    resolver: zodResolver(generateContent)
  });

  const outline = watch("outline");

  const onSubmit = handleSubmit(async payload => {
    if (!token) return;

    const sections: PostSection[] = [];

    try {
      const response = await chat({
        key: token,
        model: settings.model.outline,
        messages: [
          {
            role: "system",
            content: outlineToArraySystemPrompt
          },
          {
            role: "user",
            content: outlineToArrayPrompt.replace("{{outline}}", outline)
          }
        ]
      });

      console.log(response);
    } catch (error) {
      console.log("Failed to make section structure");

      return;
      // Handle fetch request errors
    }

    for (const section of sections) {
      try {
        const response = await chat({
          key: token,
          model: settings.model.outline,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "assistant",
              content: outline
            },
            {
              role: "user",
              content: contentPrompt
                .replaceAll(`{{heading}}`, section.heading)
                .replaceAll(`{{subpoints}}`, section.subpoints.join(", "))
            }
          ]
        });

        if (response) setPostContent(prevState => `${prevState}${response}`);
      } catch (error) {
        // Handle fetch request errors
      }
    }
  });

  return (
    <div className="flex flex-col w-full max-w-3xl gap-8">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-between gap-4">
        <div className="flex items-center flex-col sm:flex-row gap-4">
          <h1 className="text-2xl font-semibold flex items-center">
            <Circle className="fill-blue-600 stroke-blue-600 mr-2" /> {title}
          </h1>

          <Separator orientation="vertical" className="h-8 hidden sm:flex" />
          <Separator orientation="horizontal" className="sm:hidden" />

          <p className="flex items-center">
            <AlertTriangle className="text-yellow-600 mr-2" /> Under
            Construction
          </p>
        </div>

        <ThemeSwitch />
      </div>

      <TokenForm />

      <form className="flex flex-col gap-4 w-full flex-1" onSubmit={onSubmit}>
        <KeyWordsInputs
          errors={errors}
          register={register}
          setValue={setValue}
          watch={watch}
        />

        <OutlineInput
          errors={errors}
          register={register}
          setValue={setValue}
          watch={watch}
          trigger={trigger}
        />

        <Button
          type="submit"
          variant="blue"
          className="md:col-start-6"
          disabled
        >
          <Play className="w-6 h-6 mr-2" /> Generate
        </Button>
      </form>

      <div className="bg-blue-600/10">{postContent}</div>
    </div>
  );
};
