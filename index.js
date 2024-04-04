import fs from "fs";
import { FILES_OUTPUT_FOLDER } from "./config.js";
import { Worker, isMainThread, parentPort } from "worker_threads";

const final = [];
let finishedWorkers = 0;

function reduceLines(mappedLines) {
  return mappedLines.reduce((acc, partial) => {
    acc += partial + "\n";
    return acc;
  }, "");
}

const param = process.argv[2];
const files = fs.readdirSync(FILES_OUTPUT_FOLDER);
for (const file of files) {
  const FILENAME = file;
  const worker = new Worker("./worker.js", { env: { FILENAME } });
  worker.once("message", (message) => {
    final.push(message);
    finishedWorkers++;
    if (finishedWorkers === files.length) {
      console.log("Finalizando o processamento...");
      console.log(reduceLines(final));
    }
  });
  worker.on("error", (err) => console.error(err.message));
  console.log(
    `Iniciando worker de ID ${worker.threadId} e enviando o payload "${file}"`
  );
  worker.postMessage({ file, param });
}
