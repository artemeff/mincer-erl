'use strict';

var Mincer = require('mincer'),
    env    = new Mincer.Environment(process.cwd()),
    prop   = require('mincer/lib/mincer/common').prop;

// export environment
module.exports = env;

// sources
env.appendPath('priv/source/js');
env.appendPath('priv/source/css');

// autoprefixer
env.enable("autoprefixer");

// React JSX engine
var JsxEngine = Mincer.JsxEngine = function JsxEngine() {
  Mincer.Template.apply(this, arguments);
  this.jsx = Mincer.Template.libs.jsx || require('react-tools');
};

require('util').inherits(JsxEngine, Mincer.Template);

JsxEngine.prototype.evaluate = function evaluate(context, locals) {
  this.data = this.jsx.transform(this.data);
};

env.registerEngine('.jsx', Mincer.JsxEngine);

prop(Mincer.JsxEngine, 'defaultMimeType', 'application/javascript');
