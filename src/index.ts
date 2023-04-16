import { writeFileSync } from "fs";

import { ChatCompletionRequestMessage } from "openai";
import Spinnies from "spinnies";
import moment from "moment";

import { config } from "./config/config";

// import { PostStructure } from "./interface/structure";

import { chat } from "./utils/openai";
import { PostStructure } from "./interface/structure";

(async () => {
  const begin = Date.now();

  const spinner = new Spinnies({
    spinner: {
      interval: 80,
      frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
    },
    failColor: "redBright",
    succeedColor: "greenBright",
    failPrefix: "❌",
    succeedPrefix: "✅",
  });

  spinner.add("structure", { text: "🏗️ Building Structure" });

  let messages: ChatCompletionRequestMessage[] = [
    {
      role: "user",
      content: config.structure,
    },
  ];

  const response = await chat({
    messages,
  });

  if (!response) {
    spinner.succeed("structure");
    return;
  }

  const structure = JSON.parse(response) as PostStructure;
  let postContent: string[] = [];

  messages = [
    {
      role: "system",
      content: config.system,
    },
    {
      role: "assistant",
      content: response,
    },
  ];

  spinner.add("content", {
    text: "✍️ Generating Content!",
    indent: 2,
  });

  for (const content of structure.sections) {
    messages.push({
      role: "user",
      content: config.content
        .replaceAll(`{{heading}}`, content.heading)
        .replaceAll(`{{subpoints}}`, content.subpoints.join(", ")),
    });

    const contentResponse = await chat({
      messages,
    });

    if (!contentResponse) {
      spinner.add("error", {
        text: `😓 Heading: ${content.heading.slice(0, 20)}... Failed!`,
        indent: 2,
      });
      spinner.fail("error");
      spinner.remove("error");
    }

    messages.push({
      role: "assistant",
      content: response,
    });

    postContent.push(response);
  }

  spinner.succeed("content");

  writeFileSync("./content.md", postContent.join("\n\n"));

  const end = Date.now();

  spinner.add("finish", {
    text: `🚩 Finished in: ${moment.utc(end - begin).format("HH:mm:ss")}`,
  });
  spinner.succeed("finish");
  spinner.stopAll();
})();
