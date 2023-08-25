#!/usr/bin/env node
import fs from "fs";
import util from "util";

fs.readdir(process.cwd(), async (err, files) => {
  if (err) {
    throw new Error(err.message);
  }

  /*

  //Solution 1
  const fileStats: fs.Stats[] = Array(files.length).fill(null);
  files.forEach((file, index) => {
    fs.lstat(file, (err, stat) => {
      if (err) {
        throw new Error(err.message);
      }
      fileStats[index] = stat;
      const ready = fileStats.every((stat) => stat);
      if (ready) {
        fileStats.forEach((val, index) => {
          console.log(files[index], val.isFile());
        });
      }
    });
  });
  //end soluion 1
  */

  for (let file of files) {
    try {
      const stat = await lstat(file);
      console.log(file, stat.isFile());
    } catch (err) {
      throw new Error("faile identifying file/folder");
    }
  }
});

/*
//solution 2
//method 1 - wrap the lstat function with a promise
const lstat = (filePath: string) => {
  return new Promise((resolve, reject) => {
    fs.lstat(filePath, (err, stat) => {
      if (err) {
        reject(err);
      }
      resolve(stat);
    });
  });
};
*/

/*
//method 2 - promisify the lstat function with util.promisify function
const lstat = util.promisify(fs.lstat);
*/

//method 3 - use the fs promises API
const { lstat } = fs.promises;
