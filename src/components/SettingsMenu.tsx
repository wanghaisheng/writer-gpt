"use client";

import {
  Bot,
  Pencil,
  Rotate3d,
  RotateCcw,
  Save,
  Settings,
  Sparkle
} from "lucide-react";
import React, { useEffect, useState } from "react";

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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

type Props = {
  loadingGenerate?: boolean;
  onGenerate: () => void;

  loadingRegenerate?: boolean;
  onRegenerate: () => void;

  selectedModel?: Models;
  onModel: (model: Models) => void;

  promptPlaceholder?: string;
  customPrompt?: string;
  onPrompt: (prompt?: string) => void;
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

  promptPlaceholder,
  customPrompt,
  onPrompt
}: Props) => {
  const { token } = useToken();

  const [open, setOpen] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");

  useEffect(() => {
    if (open) setPrompt(customPrompt ?? "");
  }, [open]);

  return (
    <>
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

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            <span>Prompt</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={state => setOpen(state)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Prompt</DialogTitle>
            <DialogDescription>
              Type below your custom prompt.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder={promptPlaceholder ?? "Prompt..."}
          />

          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => {
                setPrompt("");
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              <span>Reset</span>
            </Button>
            <Button
              disabled={
                customPrompt === prompt ||
                (!customPrompt && prompt.trim().length === 0)
              }
              onClick={() => {
                onPrompt(prompt.trim().length > 0 ? prompt : undefined);
                setOpen(false);
              }}
            >
              <Save className="w-4 h-4 mr-2" />
              <span>Save Changes</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
