"use client";

import React from "react";

import { Bot, Settings, Sparkle } from "lucide-react";

import { Models } from "@interface/openai";

import { useToken } from "@store/token";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@components/ui/dropdown-menu";

type Props = {
  loadingGenerate?: boolean;
  onGenerate: () => void;

  selectedModel?: Models;
  onModel: (model: Models) => void;
};

export const SettingsMenu = ({
  loadingGenerate,
  onGenerate,

  selectedModel,
  onModel
}: Props) => {
  const { token, isPro } = useToken();

  const modelsList: {
    name: string;
    value: Models;
    disabled?: boolean;
  }[] = [
    {
      name: "GPT-3.5 Turbo",
      value: "gpt-3.5-turbo"
    },
    {
      name: "GPT-4",
      value: "gpt-4",
      disabled: !isPro
    },
    {
      name: "GPT-4 32k",
      value: "gpt-4-0314",
      disabled: !isPro
    }
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="xs" disabled={!token}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={onGenerate}
            disabled={loadingGenerate || !token}
          >
            <Sparkle className="mr-2 h-4 w-4" />
            <span>Generate</span>
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Bot className="mr-2 h-4 w-4" />
              <span>Model</span>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {modelsList.map(({ name, value, disabled }, index) => (
                  <DropdownMenuCheckboxItem
                    key={index}
                    checked={selectedModel === value}
                    onCheckedChange={() => onModel(value)}
                    disabled={disabled}
                  >
                    {name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
