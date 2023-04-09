import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";

config();

(async () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Hello world",
    });

    console.log(completion.data.choices[0].text);
  } catch (error) {
    console.log((error as any).response);
  }
})();
