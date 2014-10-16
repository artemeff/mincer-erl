#!/usr/bin/env node
'use strict';

var env       = require('..'),
    Mincer    = require('mincer'),
    fs        = require('fs'),
    path      = process.cwd() + '/priv/static/',
    manifest  = new Mincer.Manifest(env, path),
    compiler  = require('../compiler'),
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

compiler(args.files, path, env);
