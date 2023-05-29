import { readFileSync } from "fs";
import { join } from "path";

import { load } from "js-yaml";

const basePath = join(__dirname, "..", "questions");

const getFile = (file: "structure" | "content" | "system") =>
  readFileSync(join(basePath, `${file}.txt`)).toString();

const yamlFile = readFileSync(
  join(__dirname, "..", "data", "list.yaml"),
  "utf8"
);
const titles = load(yamlFile) as string[];

export const config = {
  structure: getFile("structure"),
  content: getFile("content"),
  system: getFile("system"),
  titles,
};
