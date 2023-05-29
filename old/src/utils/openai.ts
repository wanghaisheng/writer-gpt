import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";

config();

export const chat = async ({
  messages,
}: {
  messages: ChatCompletionRequestMessage[];
}) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages,
    });

    return completion.data.choices[0].message?.content;
  } catch (error) {
    console.log((error as any).response.data.error.message);
  }
};
