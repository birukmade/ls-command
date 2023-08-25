#!/usr/bin/env node
import fs from "fs";

const { lstat } = fs.promises; //destructore the promisified version of lstat function from fs promises API

fs.readdir(process.cwd(), async (err, files) => {
  //throw error if failed to read files
  if (err) {
    throw new Error(err.message);
  }

  //find the stats (atributes of each file)
  const statPromises = files.map((file) => {
    return lstat(file);
  });

  try {
    const fileStats = await Promise.all(statPromises);
    fileStats.forEach((fileStat, index) => {
      console.log(files[index], fileStat.isFile());
    });
  } catch (err) {
    throw new Error("failed analysing file/folder");
  }
});
