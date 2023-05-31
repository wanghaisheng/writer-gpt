"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Circle, Play } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { keywordsCommand, keywordsSystem, structure } from "@config/chat";
import { title } from "@config/seo";

import { useSettings } from "@store/settings";
import { useToken } from "@store/token";

import { SettingsMenu } from "@components/SettingsMenu";
import ThemeSwitch from "@components/ThemeSwitch";
import { TokenForm } from "@components/Token";
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { Separator } from "@components/ui/separator";
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
  const { settings, setSettings } = useSettings();

  const [loadingKeyWords, setLoadingKeyWords] = useState<boolean>(false);
  const [loadingOutline, setLoadingOutline] = useState<boolean>(false);

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

  const [keywords, outline] = watch(["keywords", "outline"]);

  const noKeywords = (keywords ?? "").trim().length === 0;

  const onGenerateKeywords = async () => {
    if (!token) return;

    setLoadingKeyWords(true);

    try {
      const response = await chat({
        key: token,
        model: settings.model.keywords,
        messages: [
          {
            role: "system",
            content: keywordsSystem
          },
          {
            role: "user",
            content: (settings?.custom?.keywords ?? keywordsCommand).replaceAll(
              "{{keywords}}",
              keywords
            )
          }
        ]
      });

      if (response)
        setValue("keywords", `${keywords ? `${keywords}\n` : ""}${response}`);
    } catch (error) {
      // Handle fetch request errors
    }

    setLoadingKeyWords(false);
  };

  const onGenerateOutline = async () => {
    if (!keywords || (keywords && keywords.trim().length === 0)) {
      trigger("keywords", { shouldFocus: true });
      return;
    }

    if (!token) return;

    setLoadingOutline(true);

    try {
      const response = await chat({
        key: token,
        model: settings.model.outline,
        messages: [
          {
            role: "user",
            content:
              settings?.custom?.outline ??
              structure.replaceAll("{{keywords}}", keywords)
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

      <form
        className="grid md:grid-cols-6 gap-4 w-full flex-1"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-2 md:col-span-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="keywords">Keywords</Label>

            <SettingsMenu
              loadingGenerate={loadingKeyWords || noKeywords}
              onGenerate={onGenerateKeywords}
              loadingRegenerate={true}
              onRegenerate={() => {}}
              selectedModel={settings.model.keywords}
              onModel={model => {
                setSettings({
                  ...settings,
                  model: {
                    ...settings.model,
                    keywords: model
                  }
                });
              }}
              promptPlaceholder="Please write related keywords to boats..."
              customPrompt={settings.custom.keywords}
              onPrompt={prompt =>
                setSettings({
                  ...settings,
                  custom: {
                    ...settings,
                    keywords: prompt
                  }
                })
              }
            />
          </div>

          <Textarea
            disabled={!token}
            id="keywords"
            placeholder="- Keyword 1..."
            error={!!errors?.keywords}
            loading={loadingKeyWords}
            {...register("keywords")}
          />

          {errors?.keywords && (
            <p className="text-sm text-red-600">{errors?.keywords.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 md:col-span-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="outline">Outline</Label>

            <SettingsMenu
              loadingGenerate={loadingOutline || noKeywords}
              onGenerate={onGenerateOutline}
              loadingRegenerate={true}
              onRegenerate={() => {}}
              selectedModel={settings.model.outline}
              onModel={model => {
                setSettings({
                  ...settings,
                  model: {
                    ...settings.model,
                    outline: model
                  }
                });
              }}
              promptPlaceholder="Please write a creative outline..."
              customPrompt={settings.custom.outline}
              onPrompt={prompt =>
                setSettings({
                  ...settings,
                  custom: {
                    ...settings,
                    outline: prompt
                  }
                })
              }
            />
          </div>

          <Textarea
            disabled={!token || noKeywords}
            id="outline"
            placeholder="Introduction..."
            loading={loadingOutline}
            {...register("outline")}
          />

          {errors?.outline && (
            <p className="text-sm text-red-600">{errors?.outline.message}</p>
          )}
        </div>

        <Button type="submit" variant="blue" className="md:col-start-6">
          <Play className="w-6 h-6 mr-2" /> Generate
        </Button>
      </form>
    </div>
  );
};

export default Form;
