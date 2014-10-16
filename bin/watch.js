#!/usr/bin/env node
'use strict';

var env       = require('..'),
    path      = require('path'),
    Mincer    = require('mincer'),
    ArgParser = require('argparse').ArgumentParser,
    source    = process.cwd() + '/priv/source/',
    result    = process.cwd() + '/priv/static/',
    compiler  = require('../compiler'),
    watch     = require('node-watch');

// parse arguments
var cli = new ArgParser({
  prog: 'mincer-erl-watch',
  version: require('../package.json').version,
  addHelp: true
});

cli.addArgument(['files'], {
  help: 'Files to process',
  metavar: 'FILE',
  nargs: '+'
});

var args = cli.parseArgs();

// cache
env.cache = new Mincer.FileStore(path.join(process.cwd(), 'priv/.cache'));

// logging
Mincer.logger.use(console);

watch(source, function(changedFile) {
  // args.files.forEach(function(file) {
  //   var changedFilename = path.basename(changedFile);
  //   if (new RegExp(file + '*').test(changedFilename)) {
  //     compiler([file], result, env);
  //   }
  // });
  compiler(args.files, result, env);
});
