"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Heart, Loader2, ScrollText } from "lucide-react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { z } from "zod";

import {
  contentPrompt,
  outlineToArraySystemPrompt,
  systemPrompt
} from "@config/chat";

import { PostSection } from "@interface/structure";

import { useDisabled } from "@store/disabled";
import { useLoading } from "@store/loading";
import { useSettings } from "@store/settings";
import { useToken } from "@store/token";

import Header from "@components/header";
import { TokenForm } from "@components/Token";
import { Button } from "@components/ui/button";

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
  const { setFormLoading, formLoading } = useLoading();
  const {
    setMainDisabled,
    setOutlineDisabled,
    setSecondaryDisabled,
    formDisabled
  } = useDisabled();

  const [postContent, setPostContent] = useState<string>(``);
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

    setFormLoading(true);
    setMainDisabled(true);
    setSecondaryDisabled(true);
    setOutlineDisabled(true);

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

          if (response)
            setPostContent(
              prevState =>
                `${prevState}\n${response.replace(" | | ", " | \n | ")}`
            );
        } catch (error) {
          setFailedSections(prevState => [...prevState, section]);
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setFormLoading(false);
    setMainDisabled(false);
    setSecondaryDisabled(false);
    setOutlineDisabled(false);
  });

  return (
    <div className="flex flex-col w-full max-w-3xl gap-8 py-10">
      <Header />

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
          disabled={formDisabled || formLoading || !outline.trim()}
        >
          {!formLoading && <ScrollText className="w-4 h-4" />}
          {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          <span className="ml-2">Generate</span>
        </Button>
      </form>

      {failedSections.length > 0 && (
        <ul>
          {failedSections.map((section, index) => (
            <li key={index}>
              <p className="text-sm text-red-600">
                Heading Failed: {section.heading}
              </p>
            </li>
          ))}
        </ul>
      )}

      {!!postContent.trim() && (
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="xs"
            className="w-fit ml-auto"
            onClick={() => {
              navigator.clipboard.writeText(postContent);
            }}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>

          <div className="p-4 rounded-sm border">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {postContent}
            </ReactMarkdown>
          </div>
        </div>
      )}

      <p className="flex items-center gap-1">
        Made with <Heart className="heart-icon fill-red-600 stroke-red-600" />{" "}
        in Albania
      </p>
    </div>
  );
};
