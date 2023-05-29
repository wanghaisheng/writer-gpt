import { writeFileSync } from "fs";
import { join } from "path";

import { ChatCompletionRequestMessage } from "openai";
import Spinnies from "spinnies";
import moment from "moment";

import dotenv from "dotenv";

import { config } from "./config/config";

import { chat } from "./utils/openai";
import { PostStructure } from "./interface/structure";
import { Bard } from "googlebard";

import slugify from "slugify";
import { BARD_KEY } from "./config/env";

dotenv.config();

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
    text: `🏗️  Building Structure for ${title.slice(0, 20)}...`,
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

    const end = Date.now();

    spinner.add("finish", {
      text: `💀 Failed in: ${moment.utc(end - begin).format("HH:mm:ss")}`,
    });
    spinner.fail("finish");
    spinner.stopAll();
    return;
  }

  const structure = JSON.parse(response) as PostStructure;
  let postContent: string[] = [
    `# ${structure.title}\n\n ## Introduction\n${structure.introduction}`,
  ];

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
    text: "✍️  Generating Content",
    indent: 2,
  });

  const postFile = join(
    __dirname,
    "..",
    "output",
    `${slugify(title, { lower: true, trim: true })}.md`
  );

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
        text: `😓  Heading: ${content.heading.slice(0, 20)}... Failed`,
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
    writeFileSync(postFile, postContent.join("\n\n"));
  }

  const faqContent = structure.faq
    .map(
      ({ question, answer }, index) =>
        `${index + 1}. **${question}**\n${answer}`
    )
    .join("\n\n");
  postContent.push(`## FAQ:\n\n${faqContent}`);

  postContent.push(`## Conclusion:\n\n${structure.conclusion}`);

  writeFileSync(postFile, postContent.join("\n\n"));

  spinner.succeed("content");

  const end = Date.now();

  spinner.add("finish", {
    text: `🚩  Finished in: ${moment.utc(end - begin).format("HH:mm:ss")}`,
  });
  spinner.succeed("finish");
  spinner.stopAll();
};

(async () => {
  // for (const title of config.titles) {
  //   await write(title);
  // }
})();

(async () => {
  // for (const title of config.titles) {
  //   await write(title);
  // }
  // let bot = new Bard(BARD_KEY);
  // let response = await bot.ask("Hello?");
  // console.log(response);
})();
