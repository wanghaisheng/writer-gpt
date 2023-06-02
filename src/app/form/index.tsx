"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Circle, Play } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { title } from "@config/seo";

import { useToken } from "@store/token";

import ThemeSwitch from "@components/ThemeSwitch";
import { TokenForm } from "@components/Token";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";

import { KeyWordsInputs } from "./inputs/keywords";
import { OutlineInput } from "./inputs/outline";

export const generateContent = z.object({
  keywords: z.string().min(1, { message: "Please add keywords!" }),
  outline: z.string().min(1, { message: "Please add outline!" })
});

export type GenerateContent = z.infer<typeof generateContent>;

export const Form = () => {
  const { token } = useToken();

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

  const onSubmit = handleSubmit(async payload => {
    if (!token) return;

    try {
      // const response = await chat({
      //   key: token,
      //   model: settings.model.outline,
      //   messages: [
      //     {
      //       role: "user",
      //       content:
      //         settings?.custom?.outline ??
      //         structure.replaceAll("{{keywords}}", keywords)
      //     }
      //   ]
      // });
    } catch (error) {
      // Handle fetch request errors
    }
  });

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
          trigger={trigger}
        />

        <Button
          type="submit"
          variant="blue"
          className="md:col-start-6"
          disabled
        >
          <Play className="w-6 h-6 mr-2" /> Generate
        </Button>
      </form>
    </div>
  );
};
