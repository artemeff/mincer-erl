var fs = require('fs');

module.exports = function(assets, destination, env) {
  try {
    assets.map(function(file) {
      var asset = env.findAsset(file);
      if (asset) {
        // TODO gzip
        fs.writeFile(destination + file, asset.toString(), function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('[compiled] ' + file);
          }
        });
      } else {
        console.log(file, 'not found or case errors');
      }
    });
  } catch (err) {
    console.error('Error: ' + (err.message || err.toString()));
  }
}
