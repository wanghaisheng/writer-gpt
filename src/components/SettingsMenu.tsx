"use client";

import { Bot, Pencil, Rotate3d, Settings, Sparkle } from "lucide-react";
import React from "react";

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

  loadingRegenerate?: boolean;
  onRegenerate: () => void;

  selectedModel?: Models;
  onModel: (model: Models) => void;
  onPrompt: () => void;
};

const modelsList: {
  name: string;
  value: Models;
}[] = [
  {
    name: "GPT-4",
    value: "gpt-4"
  },
  {
    name: "GPT-3.5 Turbo",
    value: "gpt-3.5-turbo"
  }
];

export const SettingsMenu = ({
  loadingGenerate,
  onGenerate,

  loadingRegenerate,
  onRegenerate,

  selectedModel,
  onModel,

  onPrompt
}: Props) => {
  const { token } = useToken();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="xs">
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

        <DropdownMenuItem
          onClick={onRegenerate}
          disabled={loadingRegenerate || !token}
        >
          <Rotate3d className="mr-2 h-4 w-4" />
          <span>Regenerate</span>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Bot className="mr-2 h-4 w-4" />
            <span>Model</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {modelsList.map(({ name, value }, index) => (
                <DropdownMenuCheckboxItem
                  key={index}
                  checked={selectedModel === value}
                  onCheckedChange={() => onModel(value)}
                >
                  {name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem onClick={onPrompt}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Prompt</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
