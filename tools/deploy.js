var fs = require("fs-extra");
var glob = require("glob");
var path = require("path");
var findLocales = require("./find-locales");
var fileNames = ["index.html", "article.js"];

const BASEDIR = path.join(__dirname, "..");

console.log("Copying files to over for deployment...");

// copy all content over
findLocales(locales => {
  locales.forEach(locale => {
    console.log(`Copying ${locale}`);
  	fileNames.forEach(filename => {
      fs.copySync(path.join(BASEDIR, locale, filename), path.join(BASEDIR, "..", "bezierinfo", locale, filename));
  	})
  })

  // copy over all SVG images
  console.log(`Copying images`);
  glob(path.join(BASEDIR,"images", "latex", "*.svg"), (err, files) => {
    files.forEach( file => {
      fs.copySync(file, path.join(BASEDIR, "..", "bezierinfo", "images", "latex", path.basename(file)));
    });

    // copy the base article.js as well
    console.log(`Copying default article.js`);
    fs.copySync(path.join(BASEDIR, "article.js"), path.join(BASEDIR, "..", "bezierinfo", "article.js"));

    console.log(`Deploy copy complete.`);
  });
});
