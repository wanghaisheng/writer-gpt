"use client";

import React, { useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch
} from "react-hook-form";

import { structure } from "@config/chat";

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
  trigger: UseFormTrigger<GenerateContent>;
  errors: FieldErrors<GenerateContent>;
};

export const OutlineInput = ({
  setValue,
  register,
  watch,
  errors,
  trigger
}: Props) => {
  const { token } = useToken();
  const { settings, setSettings } = useSettings();

  const [loadingOutline, setLoadingOutline] = useState<boolean>(false);

  const [keywords, outline] = watch(["keywords", "outline"]);

  const noKeywords = (keywords ?? "").trim().length === 0;

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

  return (
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
        error={errors?.outline?.message}
        {...register("outline")}
      />
    </div>
  );
};
