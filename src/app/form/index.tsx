"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Circle, Loader2, Play } from "lucide-react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { z } from "zod";

import {
  contentPrompt,
  outlineToArraySystemPrompt,
  systemPrompt
} from "@config/chat";
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

  const [loading, setLoading] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>("");
  const [failedSections, setFailedSections] = useState<PostSection[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<GenerateContent>({
    resolver: zodResolver(generateContent),
    defaultValues: {
      keywords: {
        main: "",
        secondary: ""
      },
      outline: ""
    }
  });

  const outline = watch("outline");

  const onSubmit = handleSubmit(async payload => {
    if (!token) return;

    setLoading(true);

    let sections: PostSection[] = [];

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
            content: outline
          }
        ]
      });

      if (response) sections = JSON.parse(response) as unknown as PostSection[];
    } catch (error) {
      console.log("Failed to make section structure");

      return;
      // Handle fetch request errors
    }

    try {
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
          setFailedSections(prevState => [...prevState, section]);
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  });

  return (
    <div className="flex flex-col w-full max-w-3xl gap-8 py-10">
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
        />

        <Button
          type="submit"
          variant="blue"
          className="md:col-start-6"
          disabled={loading || !outline.trim()}
        >
          {!loading && <Play className="w-6 h-6" />}
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          <span className="ml-2">Generate</span>
        </Button>
      </form>

      <ul>
        {failedSections.map((section, index) => (
          <li key={index}>
            <p className="text-sm text-red-600">
              Heading Failed: {section.heading}
            </p>
          </li>
        ))}
      </ul>

      {!!postContent.trim() && (
        <div className="p-4 rounded-sm border">
          <ReactMarkdown>{postContent}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
