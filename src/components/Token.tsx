import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToken } from "@store/token";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const gptToken = z.object({
  token: z.string().min(1, { message: "Please add token!" })
});

type GptToken = z.infer<typeof gptToken>;

export const TokenForm = () => {
  const { token, setToken } = useToken();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<GptToken>({
    resolver: zodResolver(gptToken)
  });

  const onSaveToken = handleSubmit(payload => {
    setToken(payload.token);
  });

  if (token) return null;

  return (
    <form className="flex items-end gap-2" onSubmit={onSaveToken}>
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="tokne">API Key</Label>

        <div className="flex gap-2 w-full">
          <Input id="token" placeholder="sk-xxxx" {...register("token")} />

          <Button variant="blue">
            <Save className="w-4 h-4" />
          </Button>
        </div>

        {errors?.token && (
          <p className="text-sm text-red-600">{errors?.token.message}</p>
        )}
      </div>
    </form>
  );
};
