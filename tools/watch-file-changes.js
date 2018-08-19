// Using chokidar directly, rather than chokidar-cli,
// because chokidar-cli doesn't work in the slightest,
// and hasn't been maintained for over three years now.

var chokidar = require('chokidar');
var runAll = require("npm-run-all");
var log = console.log.bind(console);
var rebuildScripts = ["content", "dev:en-GB", "default"];


/**
 * Run an npm script in parallel to whatever
 * is already running, so that it does not block
 * anything.
 */
function run(scripts, why) {
  log(`[[CHOKIDAR]] ${why}`);

  runAll(scripts, {
    stdout: process.stdout,
    parallel: false
  })
  .then(() => {
      console.log("done!");
  })
  .catch(err => {
      console.log("failed!", err);
  });
}


function monitor(watcher, scripts) {
  var ready = false;

  // Add event listeners.
  watcher
    .on('add',    path => !ready ? '' : run(scripts, `File ${path} has been added`))
    .on('change', path => !ready ? '' : run(scripts, `File ${path} has been changed`))
    .on('unlink', path => !ready ? '' : run(scripts, `File ${path} has been removed`));

  // More possible events.
  watcher
    .on('addDir', path => !ready ? '' : run(scripts, `Directory ${path} has been added`))
    .on('unlinkDir', path => !ready ? '' : run(scripts, `Directory ${path} has been removed`))
    .on('ready', () => {
      ready = true;
      log('Initial scan complete. Ready for changes');
    })
//    .on('raw', (event, path, details) => {
//      log('Raw event info:', event, path, details);
//    }).
    .on('error', error => log(`Watcher error: ${error}`));
}

/**
 * Watch for code changes
 */
monitor(
  chokidar.watch([
    'components/**/*.js',
    'components/**/*.md',
    'components/**/*.jsx',
    'lib/**/*.js',
    'changelog.js'
  ], {
    ignored: [
      'components/sections/**/index.js',
      'lib/site/handlers.js'
    ]
  }),
  rebuildScripts
);

/**
 * Watch for style changes
 */
monitor(
  chokidar.watch(
    'stylesheets/*.less'
  ), [
    "less"
  ]
);
