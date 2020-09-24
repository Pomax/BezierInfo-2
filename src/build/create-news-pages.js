import glob from "glob";
import fs from "fs-extra";
import path from "path";
import paths from "../project-paths.js";
import nunjucks from "nunjucks";
import LocaleStrings from "../locale-strings.js";
import { convertMarkDown } from "./markdown/convert-markdown.js";

nunjucks.configure(paths.html, { autoescape: false });

const base = `<base href="..">`;
const locale = `en-GB`;

/**
 * ...docs go here...
 */
async function createNewsPages() {
  const start = Date.now();
  const localeStrings = new LocaleStrings();
  const files = await getNewsFiles();
  const details = await Promise.all(files.filter((f) => !f.includes(`draft`)).map((file) => generatePost(file, localeStrings)));
  console.log(`Processing News posts took ${(Date.now() - start) / 1000}s`);
  generateNewsIndex(details);
  generateRSSFeed(details);
}

export { createNewsPages };

// async, by returning a Promise
function getNewsFiles() {
  return new Promise((resolve, reject) => {
    glob(path.join(paths.news, `*.md`), (err, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });
}

/**
 * ...docs go here...
 */
async function generatePost(file, localeStrings) {
  // get the post, and the data its filename implies
  const filename = path.basename(file).replace(`.md`, `.html`);
  const postDate = filename.replace(`.html`, ``);
  const data = fs.readFileSync(file).toString(`utf8`);
  const dateString = new Date(postDate).toUTCString().substring(0, 16);

  // split off the post's title
  let post = await convertMarkDown(
    {
      imagepath: path.join(paths.images, `news`, filename),
      modulepubdir: `./news/`,
      file: file,
      id: filename,
    },
    localeStrings,
    data
  );

  const title = post.substring(post.indexOf(`<h1>`) + 4, post.indexOf(`</h1>`));
  post = post.replace(`<h1>${title}</h1>`, ``);
  const postDateTime = new Date(postDate).toString();
  const pubDate = `${postDateTime.substring(0, postDateTime.indexOf(`GMT`) - 1)} +00:00`;
  const now = new Date().toString();
  const renderContext = {
    base,
    post,
    title,
    description: title,
    urlSuffix: `/news/`,
    filename,
    locale,
    dateString,
    publishTime: pubDate,
    currentTime: `${now.substring(0, now.indexOf("GMT") - 1)} +00:00`,
  };
  const newspage = nunjucks.render(`post.template.html`, renderContext);
  fs.writeFileSync(path.join(paths.news, filename), newspage, `utf8`);
  return { filename, pubDate, title, post, dateString };
}

/**
 * ...docs go here...
 */
function generateNewsIndex(details) {
  const renderContext = {
    base,
    details,
    locale,
    publishTime: new Date(),
  };
  const index = nunjucks.render(`news.template.html`, renderContext);
  fs.writeFileSync(path.join(paths.news, `index.html`), index, `utf8`);
}

/**
 * ...docs go here...
 */
function generateRSSFeed(details) {
  const now = new Date().toString();
  const renderContext = {
    items: details,
    buildDate: `${now.substring(0, now.indexOf(`GMT`) - 1)} +00:00`,
  };
  const index = nunjucks.render(`rss.template.xml`, renderContext);
  fs.writeFileSync(path.join(paths.news, `rss.xml`), index, `utf8`);
}
