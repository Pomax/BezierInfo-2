import path from "path";

export default function toPOSIX(pathstring) {
  return pathstring.split(path.sep).join(path.posix.sep);
}
