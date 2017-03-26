var fs = require('fs');
var markfile = '.buildmark';
var resolve = process.argv.indexOf('resolve') > -1;

if (!resolve) {
  fs.writeFileSync(markfile, Date.now());
} else {
  let mark = parseInt(fs.readFileSync(markfile).toString());
  console.log(`Build ran in ${(Date.now() - mark)/1000} seconds.`);
  fs.unlinkSync(markfile);
}
