import { writeFileSync } from "fs";
import { join } from "path";

import { ChatCompletionRequestMessage } from "openai";
import Spinnies from "spinnies";
import moment from "moment";

import { config } from "./config/config";

// import { PostStructure } from "./interface/structure";

import { chat } from "./utils/openai";
import { PostStructure } from "./interface/structure";
import slugify from "slugify";

const write = async (title: string) => {
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

  spinner.add("structure", {
    text: `🏗️ Building Structure for ${title.slice(0, 10)}...`,
  });

  let messages: ChatCompletionRequestMessage[] = [
    {
      role: "user",
      content: config.structure.replaceAll("{{title}}", title),
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
  let postContent: string[] = [`# ${structure.title}`];

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
    text: "✍️ Generating Content",
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
        text: `😓 Heading: ${content.heading.slice(0, 20)}... Failed`,
        indent: 2,
      });
      spinner.fail("error");
      spinner.remove("error");
      continue;
    }

    messages.push({
      role: "assistant",
      content: contentResponse,
    });

    postContent.push(contentResponse);
  }

  spinner.succeed("content");

  const postFile = join(
    __dirname,
    "..",
    "output",
    `${slugify(title.slice(0, 10))}.mdx`
  );

  writeFileSync(postFile, postContent.join("\n\n"));

  const end = Date.now();

  spinner.add("finish", {
    text: `🚩 Finished in: ${moment.utc(end - begin).format("HH:mm:ss")}`,
  });
  spinner.succeed("finish");
  spinner.stopAll();
};

(async () => {
  for (const title of config.titles) {
    await write(title);
  }
})();
