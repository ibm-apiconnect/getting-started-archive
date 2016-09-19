var JsonRefs = require('json-refs');
var path = require('path');
var YAML = require('js-yaml');
var fs = require('fs-extra');

var indexPath = path.join(__dirname, '..', 'src', 'index.yaml');
var index = YAML.safeLoad(fs.readFileSync(indexPath));
var loaderOptions = {
  processContent: function (res, callback) {
    try {
      var obj = YAML.safeLoad(res.text);
    } catch(e) {
      return callback(e);
    }

    callback(undefined, obj);
  }
};
var options = {
  relativeBase: path.join(__dirname, '..', 'src'),
  loaderOptions: loaderOptions
};

JsonRefs.resolveRefs(index, options).then(function(resolved) {
  Object.keys(resolved.refs).forEach(function(key) {
    var info = resolved.refs[key];
    if (info.missing && info.error && info.error.indexOf('JSON Pointer') == -1) {
      var missingFile = info.error.replace("ENOENT: no such file or directory, open \'", "");
      missingFile = missingFile.substr(0, missingFile.length - 1);
      createStub(missingFile);
    }
  });
}, function(err) {
  console.error('error: ' + err);
});

function createStub(missingFile) {
  console.log('Creating', missingFile);
  fs.outputFileSync(missingFile, 'TBD');
}
