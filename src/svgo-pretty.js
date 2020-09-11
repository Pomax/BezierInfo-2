import fs from "fs-extra";
import path from "path";
import { spawnSync } from "child_process";
import paths from "./project-paths.js";

const svgo = [`svgo`, `--enable=derferenceUses`, `--pretty`, `-f`];
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

fs.readdirSync(path.join(paths.images, `chapters`)).forEach((dir) => {
  console.log(`Prettifiying SVG images in ${dir}...`);
  spawnSync(npx, [...svgo, `"docs/images/chapters/${dir}"`], {
    // stdio: 'inherit',
    // stderr: 'inherit'
  });
});
