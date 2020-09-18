import path from "path";

/**
 * Function-onto-itself because the platform check makes it too
 * tricky to allow several files to all hopefully implemented
 * that correctly.
 */
export default function getModulePath(urlstring) {
  const moduleURL = new URL(urlstring);
  const moduleDir = path.dirname(moduleURL.href.replace(`file:///`, process.platform === `win32` ? `` : `/`));
  return moduleDir;
}
