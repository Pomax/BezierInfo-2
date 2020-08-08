import fs from "fs";

const timingFile = `.timing`;

if(fs.existsSync(timingFile)) {
  const end = Date.now();
  const start = fs.readFileSync(timingFile);
  fs.unlinkSync(timingFile);
  console.log(`Runtime: ${(end - start)/1000}s`);
}

else {
  fs.writeFileSync(timingFile, `${Date.now()}`, `utf8`);
}
