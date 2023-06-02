"use client";

import React, { useState } from "react";

import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";

import {
  keywordsCommand,
  keywordsSystem,
  secondaryKeywordsSystem
} from "@config/chat";

import { useSettings } from "@store/settings";
import { useToken } from "@store/token";

import { SettingsMenu } from "@components/SettingsMenu";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";

import { chat } from "@lib/openai";
import { hasKeywords } from "@lib/utils";

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

  const [loadingMainKeyWords, setLoadingMainKeyWords] =
    useState<boolean>(false);
  const [loadingSecondaryKeyWords, setLoadingSecondaryKeyWords] =
    useState<boolean>(false);

  const keywords = watch("keywords");

  const onGenerateMainKeywords = async () => {
    if (!token) return;

    setLoadingMainKeyWords(true);

    try {
      const response = await chat({
        key: token,
        model: settings.model.keywords.main,
        messages: [
          {
            role: "system",
            content: keywordsSystem
          },
          {
            role: "user",
            content: (
              settings?.custom?.keywords?.main ?? keywordsCommand
            ).replaceAll("{{keywords}}", keywords.main)
          }
        ]
      });

      if (response)
        setValue(
          "keywords.main",
          `${keywords.main ? `${keywords.main}\n` : ""}${response}`
        );
    } catch (error) {
      // Handle fetch request errors
    }

    setLoadingMainKeyWords(false);
  };

  const onGenerateSecondaryKeywords = async () => {
    if (!token) return;

    setLoadingSecondaryKeyWords(true);

    try {
      const response = await chat({
        key: token,
        model: settings.model.keywords.secondary,
        messages: [
          {
            role: "system",
            content: secondaryKeywordsSystem.replace(
              "{{keywords}}",
              keywords?.main ?? ""
            )
          },
          {
            role: "user",
            content: (
              settings?.custom?.keywords?.secondary ?? keywordsCommand
            ).replaceAll("{{keywords}}", keywords.secondary)
          }
        ]
      });

      if (response)
        setValue(
          "keywords.secondary",
          `${keywords.secondary ? `${keywords.secondary}\n` : ""}${response}`
        );
    } catch (error) {
      // Handle fetch request errors
    }

    setLoadingSecondaryKeyWords(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2 md:col-span-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="keywords">Main Keywords</Label>

          <SettingsMenu
            loadingGenerate={
              loadingMainKeyWords || !hasKeywords(keywords?.main)
            }
            onGenerate={onGenerateMainKeywords}
            loadingRegenerate={true}
            onRegenerate={() => {}}
            selectedModel={settings.model.keywords.main}
            onModel={model => {
              const settingsCopy = structuredClone(settings);
              settingsCopy.model.keywords.main = model;

              setSettings(settingsCopy);
            }}
            promptPlaceholder="Please write related keywords to boats..."
            customPrompt={settings.custom.keywords?.main}
            onPrompt={prompt => {
              const settingsCopy = structuredClone(settings);
              settingsCopy.custom.keywords.main = prompt;

              setSettings(settingsCopy);
            }}
          />
        </div>

        <Textarea
          disabled={!token}
          id="keywords"
          placeholder="- Keyword 1..."
          error={errors?.keywords?.message}
          loading={loadingMainKeyWords}
          {...register("keywords.main")}
        />
      </div>

      <div className="flex flex-col gap-2 md:col-span-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="keywords">Secondary Keywords</Label>

          <SettingsMenu
            loadingGenerate={loadingSecondaryKeyWords}
            onGenerate={onGenerateSecondaryKeywords}
            loadingRegenerate={true}
            onRegenerate={() => {}}
            selectedModel={settings.model.keywords.secondary}
            onModel={model => {
              const settingsCopy = structuredClone(settings);
              settingsCopy.model.keywords.secondary = model;

              setSettings(settingsCopy);
            }}
            promptPlaceholder="Please write related keywords to boats..."
            customPrompt={settings.custom.keywords?.secondary}
            onPrompt={prompt => {
              const settingsCopy = structuredClone(settings);
              settingsCopy.custom.keywords.secondary = prompt;

              setSettings(settingsCopy);
            }}
          />
        </div>

        <Textarea
          disabled={!token}
          id="keywords"
          placeholder="- Keyword 1..."
          error={errors?.keywords?.message}
          loading={loadingSecondaryKeyWords}
          {...register("keywords.secondary")}
        />
      </div>
    </div>
  );
};
