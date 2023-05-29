import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { Models } from "@interface/openai";

export const chat = async ({
  messages,
  key
}: {
  messages: ChatCompletionRequestMessage[];
  key: string;
}) => {
  try {
    const configuration = new Configuration({
      apiKey: key
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo" as Models,
      messages
    });

    return completion.data.choices[0].message?.content;
  } catch (error) {
    console.log((error as any).response.data.error.message);
  }
};
