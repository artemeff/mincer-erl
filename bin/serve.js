#!/usr/bin/env node
'use strict';

var env       = require('..'),
    path      = require('path'),
    connect   = require('connect'),
    Mincer    = require('mincer'),
    app       = connect(),
    ArgParser = require('argparse').ArgumentParser;

// parse arguments
var cli = new ArgParser({
  prog: 'mincer-erl-serve',
  version: require('../package.json').version,
  addHelp: true
});

cli.addArgument(['-p', '--port'], {
  help: 'Port to run',
  defaultValue: 3000
});

var args = cli.parseArgs();

// cache
env.cache = new Mincer.FileStore(path.join(__dirname, 'priv/.cache'));

// logging
Mincer.logger.use(console);

// create server with assets
app.use('/', Mincer.createServer(env));
app.listen(args.port, function(err) {
  if (err) {
    console.error("Failed start server: " + (err.message || err.toString()));
    process.exit(128);
  }

  console.info('Static serves on localhost:'+args.port);
});
