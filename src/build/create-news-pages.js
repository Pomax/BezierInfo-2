import glob from "glob";
import fs from "fs-extra";
import path from "path";
import paths from "../project-paths.js";
import nunjucks from "nunjucks";
import convert from "./markdown/convert.js";

nunjucks.configure(paths.html, { autoescape: false });

/**
 * ...docs go here...
 */
async function createNewsPages() {
  const start = Date.now();
  const files = await getNewsFiles();
  const details = files.filter((f) => !f.includes(`draft`)).map((file) => generateNewsPage(file));
  console.log(`Processing News posts took ${(Date.now() - start) / 1000}s`);
  generateNewsIndex(details);
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
function generateNewsPage(file) {
  const filename = path.basename(file).replace(`.md`, `.html`);
  const postDate = filename.replace(`.html`, ``);
  const data = fs.readFileSync(file).toString(`utf8`);
  const dateString = new Date(postDate).toUTCString().substring(0, 16);
  const post = convert(data).replace(`</h1>`, `</h1><h5 class="post-date">${dateString}</h5>`);
  const title = post.substring(post.indexOf(`<h1>`) + 4, post.indexOf(`</h1>`));
  const renderContext = {
    base: `<base href="..">`,
    post,
    title,
    description: title,
    urlSuffix: `/news/`,
    filename,
    locale: `en-GB`,
    publishTime: `${postDate}T12:00:00+00:00`,
    currentTime: new Date().toISOString().substring(0, 19) + "+00:00",
  };
  const newspage = nunjucks.render(`news.template.html`, renderContext);
  fs.writeFileSync(path.join(paths.news, filename), newspage, `utf8`);
  return { filename, title, dateString };
}

/**
 * ...docs go here...
 */
function generateNewsIndex(details) {
  // TODO: make this a real thing...
  const html = `<!doctype html>
  <html>
    <body>
      <h1>Posts</h1>
      <ul>
        ${details.map((data) => `<li><a href="./${data.filename}">${data.title}</a> (${data.dateString})</li>`)}
      </ul>
      <p><a href="..">Back to the primer</a></p>
    </body>
  </html>
  `;
  fs.writeFileSync(path.join(paths.news, `index.html`), html, `utf8`);
}
