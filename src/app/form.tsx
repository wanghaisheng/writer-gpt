"use client";

import { List, ScrollText } from "lucide-react";
import React from "react";

import { title } from "@config/seo";

import ThemeSwitch from "@components/ThemeSwitch";
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";

type Props = {};

const Form = (props: Props) => {
  return (
    <>
      <h1 className="text-2xl font-semibold">✨ 🤖 {title} ✨ </h1>

      <form className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex flex-col gap-2">
          <Label htmlFor="keywords">Keywords</Label>

          <Textarea
            id="keywords"
            placeholder="Keyword 1..."
            action={
              <Button size="sm" className="rounded-full" type="button">
                <List className="w-5 h-5 mr-2" /> Generate
              </Button>
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="outline">Outline</Label>

          <Textarea
            id="outline"
            placeholder="Introduction..."
            action={
              <Button size="sm" className="rounded-full" type="button">
                <ScrollText className="w-5 h-5 mr-2" /> Generate
              </Button>
            }
          />
        </div>

        <Button type="submit">Generate</Button>
      </form>

      <ThemeSwitch />
    </>
  );
};

export default Form;
