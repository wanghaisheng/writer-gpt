import { readFileSync } from "fs";
import { join } from "path";

const basePath = join(__dirname, "..", "questions");

const getFile = (file: "structure" | "content" | "system" | "title") =>
  readFileSync(join(basePath, `${file}.txt`)).toString();

export const config = {
  structure: getFile("structure"),
  content: getFile("content"),
  system: getFile("system"),
  postTitle: getFile("title"),
};
