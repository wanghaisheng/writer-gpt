import { ChatCompletionRequestMessage } from "openai";

import { Models } from "@interface/openai";

import { OpenAIStream } from "@lib/gpt-stream";

export type RequestData = {
  messages?: ChatCompletionRequestMessage[];
  apiKey?: string;
  model?: Models;
};

export const runtime = "edge";

export const GET = async (request: Request) => {
  const { apiKey, messages, model } = (await request.json()) as RequestData;

  if (!apiKey?.trim())
    return new Response("Please provide api key!", { status: 400 });
  if (!messages?.length)
    return new Response("Please provide messages!", { status: 400 });
  if (!model?.trim())
    return new Response("Please provide model!", { status: 400 });

  const stream = await OpenAIStream({
    apiKey,
    messages,
    model,
    stream: true
  });

  return new Response(stream);
};
