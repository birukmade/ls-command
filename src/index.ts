#!/usr/bin/env node
import fs from "fs";

fs.readdir(process.cwd(), (err, files) => {
  if (err) {
    throw new Error(err.message);
  }

  console.log(files);
});
