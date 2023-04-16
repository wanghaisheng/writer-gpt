import ora from "ora";

import { config } from "./config/config";

import { PostStructure } from "./interface/structure";

import { chat } from "./utils/openai";

(async () => {
  const spinner = ora("Loading unicorns").start();

  spinner.text = "Building Structure";

  const response = await chat<PostStructure>({
    messages: [
      {
        role: "system",
        content: config.ai,
      },
      {
        role: "user",
        content: config.structure,
      },
    ],
  });

  if (!response) {
    spinner.fail("Failed to create structure!");
    return;
  }
})();
