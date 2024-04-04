import { createReadStream, readFileSync } from "fs";
import { parentPort } from "worker_threads";
import { FILES_OUTPUT_FOLDER } from "./config.js";
import * as readline from "readline";

async function grep(file, param) {
  const lines = [];
  const fileStream = createReadStream(`${FILES_OUTPUT_FOLDER}/${file}`);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    if (line.includes(param)) {
      lines.push(line);
    }
  }
  return lines;
}

parentPort.once("message", ({ file, param }) => {
  console.log(`Analisando arquivo ${file}...`);
  grep(file, param).then((lines) => parentPort.postMessage(lines));
});
