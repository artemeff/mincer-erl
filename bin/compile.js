#!/usr/bin/env node
'use strict';

var env       = require('..'),
    Mincer    = require('mincer'),
    fs        = require('fs'),
    path      = process.cwd() + '/priv/static/',
    manifest  = new Mincer.Manifest(env, path),
    ArgParser = require('argparse').ArgumentParser;

// parse arguments
var cli = new ArgParser({
  prog: 'mincer-erl-compile',
  version: require('../package.json').version,
  addHelp: true
});

cli.addArgument(['files'], {
  help: 'Files to process',
  metavar: 'FILE',
  nargs: '+'
});

var args = cli.parseArgs();

env.jsCompressor  = 'uglify';
env.cssCompressor = 'csso';

try {
  var assets = args.files;

  assets.map(function(file) {
    var asset = env.findAsset(file);
    if (asset) {
      var filepath = path + file;
      // TODO gzip
      fs.writeFile(filepath, asset.toString(), function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Saved to " + filepath);
        }
      });
    } else {
      console.log(file, 'not found or case errors');
    }
  });
} catch (err) {
  console.error("Error: " + (err.message || err.toString()));
}
