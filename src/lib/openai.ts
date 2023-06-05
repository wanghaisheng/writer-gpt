import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { Models } from "@interface/openai";

export const chat = async ({
  messages,
  key,
  model
}: {
  messages: ChatCompletionRequestMessage[];
  key: string;
  model: Models;
}) => {
  try {
    const configuration = new Configuration({
      apiKey: key
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model,
      messages
    });

    return completion.data.choices[0].message?.content;
  } catch (error) {
    console.log((error as any).response.data.error.message);
  }
};

export const hasProAccount = async ({ apiKey }: { apiKey: string }) => {
  const configuration = new Configuration({
    apiKey
  });

  const openai = new OpenAIApi(configuration);

  const modelsList = await openai.listModels();

  return !!modelsList.data.data.find(model => model.id === ("gpt-4" as Models));
};
