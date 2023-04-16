import { writeFileSync } from "fs";

import Spinnies from "spinnies";
import moment from "moment";

import { config } from "./config/config";

// import { PostStructure } from "./interface/structure";

import { chat } from "./utils/openai";

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

  const response = await chat<string>({
    messages: [
      // {
      //   role: "system",
      //   content: config.ai,
      // },
      {
        role: "user",
        content: config.structure,
      },
    ],
  });

  if (!response) {
    spinner.succeed("structure");
    return;
  }

  writeFileSync("./test.json", response);

  const end = Date.now();

  spinner.add("finish", {
    text: `🚩 Finished in: ${moment.utc(end - begin).format("HH:mm:ss")}`,
  });
  spinner.succeed("finish");
  spinner.stopAll();
})();
