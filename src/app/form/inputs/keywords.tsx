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

import { useDisabled } from "@store/disabled";
import { useLoading } from "@store/loading";
import { useSettings } from "@store/settings";
import { useToken } from "@store/token";

import { SettingsMenu } from "@components/SettingsMenu";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";

import { chat } from "@lib/openai";
import { hasKeywords as hasKeywordsFn } from "@lib/utils";

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
  const { setMainLoading, setSecondaryLoading, mainLoading, secondaryLoading } =
    useLoading();
  const {
    setFormDisabled,
    setMainDisabled,
    setOutlineDisabled,
    setSecondaryDisabled,
    mainDisabled,
    secondaryDisabled
  } = useDisabled();

  const keywords = watch("keywords");
  const hasKeywords = hasKeywordsFn(keywords?.main);

  const onGenerateMainKeywords = async () => {
    if (!token) return;

    setMainLoading(true);
    setSecondaryDisabled(true);
    setOutlineDisabled(true);
    setFormDisabled(true);

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

    setMainLoading(false);
    setSecondaryDisabled(false);
    setOutlineDisabled(false);
    setFormDisabled(false);
  };

  const onGenerateSecondaryKeywords = async () => {
    if (!token) return;

    setMainDisabled(true);
    setSecondaryLoading(true);
    setOutlineDisabled(true);
    setFormDisabled(true);

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
            ).replaceAll(
              "{{keywords}}",
              !!keywords.secondary.trim() ? keywords.secondary : keywords.main
            )
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

    setMainDisabled(false);
    setSecondaryLoading(false);
    setOutlineDisabled(false);
    setFormDisabled(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2 md:col-span-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="keywords">Main Keywords</Label>

          <SettingsMenu
            loadingGenerate={mainLoading || mainDisabled || !hasKeywords}
            onGenerate={onGenerateMainKeywords}
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
          disabled={!token || mainDisabled}
          id="keywords"
          placeholder="- Keyword 1..."
          error={errors?.keywords?.message}
          loading={mainLoading}
          {...register("keywords.main")}
        />
      </div>

      <div className="flex flex-col gap-2 md:col-span-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="keywords">Secondary Keywords</Label>

          <SettingsMenu
            loadingGenerate={
              secondaryLoading || secondaryDisabled || !hasKeywords
            }
            onGenerate={onGenerateSecondaryKeywords}
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
          disabled={!token || secondaryDisabled}
          id="keywords"
          placeholder="- Keyword 2..."
          error={errors?.keywords?.message}
          loading={secondaryLoading}
          {...register("keywords.secondary")}
        />
      </div>
    </div>
  );
};
