"use client";

import React, { useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";

import { keywordsCommand, keywordsSystem } from "@config/chat";

import { useSettings } from "@store/settings";
import { useToken } from "@store/token";

import { SettingsMenu } from "@components/SettingsMenu";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";

import { chat } from "@lib/openai";

import { GenerateContent } from "../index";

type Props = {
  setValue: UseFormSetValue<GenerateContent>;
  register: UseFormRegister<GenerateContent>;
  watch: UseFormWatch<GenerateContent>;
  errors: FieldErrors<GenerateContent>;
};

export const KeyWordsInputs = ({
  setValue,
  register,
  watch,
  errors
}: Props) => {
  const { token } = useToken();
  const { settings, setSettings } = useSettings();

  const [loadingKeyWords, setLoadingKeyWords] = useState<boolean>(false);

  const [keywords] = watch(["keywords"]);

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

  return (
    <div className="grid md:grid-cols-2">
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
          error={errors?.keywords?.message}
          loading={loadingKeyWords}
          {...register("keywords")}
        />
      </div>
    </div>
  );
};
