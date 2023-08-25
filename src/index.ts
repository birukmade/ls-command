#!/usr/bin/env node
import fs from "fs";

fs.readdir(process.cwd(), (err, files) => {
  if (err) {
    throw new Error(err.message);
  }

  //Bad code
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
  //end of bad code
});
