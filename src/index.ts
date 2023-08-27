#!/usr/bin/env node
import fs from "fs";
import path from "path";
import chalk from "chalk";

const { lstat } = fs.promises; //destructore the promisified version of lstat function from fs promises API
const targetDir = process.argv[2] || process.cwd();
fs.readdir(targetDir, async (err, files) => {
  //throw error if failed to read files
  if (err) {
    throw new Error(err.message);
  }

  //find the stats (atributes of each file)
  const statPromises = files.map((file) => {
    return lstat(path.join(targetDir, file));
  });

  try {
    const fileStats = await Promise.all(statPromises);
    fileStats.forEach((fileStat, index) => {
      !fileStat.isFile()
        ? console.log(chalk.bold.green(files[index]))
        : console.log(chalk.italic.yellow(files[index]));
    });
  } catch (err) {
    throw new Error("failed analysing file/folder");
  }
});
