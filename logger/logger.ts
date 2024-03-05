import moment from "moment";
import fs from "fs";
import { forEach } from "lodash";
const shortFormat = `MM/DD/YYYY hh:mm:ss`;

let logFile = process.env?.LOG_FILE;

export function setLogFile(path: string) {
  createDir(path);
  logFile = path;
}

const createDir = (filePath: string) => {
  const direcory =
    filePath.indexOf("/") == -1
      ? filePath.substring(0, filePath.lastIndexOf("\\"))
      : filePath.substring(0, filePath.lastIndexOf("/"));

  if (direcory != "" && !fs.existsSync(direcory)) {
    fs.mkdirSync(direcory, { recursive: true });
  }
};

export function writeLog(message: string, additionalLogFiles: string[] = []) {
  const fullMsg = getMessageWithTimestamp(message);
  console.log(fullMsg);
  writeLogToFile(fullMsg);
  forEach(additionalLogFiles, (file) => {
    writeToFile(file, fullMsg);
  });
}

export function writeError(message: string) {
  const fullMsg = getMessageWithTimestamp(message);
  console.error(fullMsg);
  writeLogToFile(fullMsg);
}

function getMessageWithTimestamp(message: string) {
  const curTime = moment().format(shortFormat);
  const fullMsg = `${curTime}|${message}`;
  return fullMsg;
}

function writeLogToFile(fullMsg: string) {
  if (!logFile) throw new Error("Need to init log file");
  writeToFile(logFile, fullMsg);
}

function writeToFile(fileName: string, fullMsg: string) {
  if (!fileName) throw new Error("Need a file name");
  if (fs.existsSync(fileName)) {
    fs.appendFileSync(fileName, `${fullMsg}\n`);
  } else {
    fs.writeFileSync(fileName, `${fullMsg}\n`);
  }
}

export function writeDataAsIs(fullMsg: any) {
  if (!logFile) throw new Error("Need to init log file");
  writeToFileAsIs(logFile, fullMsg);
}

function writeToFileAsIs(fileName: string, fullMsg: any) {
  if (!fileName) throw new Error("Need a file name");
  if (fs.existsSync(fileName)) {
    fs.appendFileSync(fileName, `${fullMsg}\n`);
  } else {
    fs.writeFileSync(fileName, `${fullMsg}\n`);
  }
}
