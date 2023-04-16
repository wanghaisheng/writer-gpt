import { readFileSync } from "fs";
import { join } from "path";

const basePath = join(__dirname, "..", "questions");

export const config = {
  structure: readFileSync(join(basePath, "structure.txt")).toString(),
  ai: readFileSync(join(basePath, "ai.txt")).toString(),
};
