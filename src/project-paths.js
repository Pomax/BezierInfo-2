import fs from "fs-extra";
import path from "path";
import getModulePath from "./get-module-path.js";

const src = getModulePath(import.meta.url);

/**

    This file exists as a single source of truth for all the file paths,
    so that any module can import it and just know that the named paths
    it relies on will point to "whatever it needs to point to".

**/

const project = path.join(src, `..`);
const publicDir = path.join(project, `docs`); // yeah... "docs". Because Github is fairly stupid here.
const images = path.join(publicDir, `images`);
const build = path.join(src, `build`);
const chapters = path.join(publicDir, `chapters`);
const sitejs = path.join(publicDir, `js`);
const temp = path.join(project, `temp`);

const paths = {
  project,
  build,
  chapters,
  images,
  public: publicDir,
  sitejs,
  src,
  temp,
};

Object.values(paths).forEach((loc) => fs.ensureDirSync(loc));

export default paths;
