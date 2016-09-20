var JsonRefs = require('json-refs');
var path = require('path');
var YAML = require('js-yaml');
var fs = require('fs-extra');
var ejs = require('ejs');
var marked = require('marked');

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

JsonRefs.resolveRefs(index, options).then(function(result) {
  renderHtml(result.resolved);
}, function(err) {
  console.error('error: ' + err);
});

function renderHtml(data) {
  var dest = path.join(__dirname, '..', 'build');

  try {
    var html = ejs.render(data.templates.home.src, {
      sections: data.sections,
      href: href
    });
  } catch(e) {
    console.log(e);
    return;
  }

  fs.outputFile(path.join(dest, 'index.html'), html);

  data.sections.forEach(function(section) {
    section.index.guides.forEach(function(guide) {
      try {
        var html = ejs.render(data.templates.guide.src, {
          guide: guide,
          md: md
        });
      } catch (e) {
        console.log(e);
        return;
      }
      fs.outputFile(path.join(dest, href(guide)), html);
    });
  });
}

function href(doc) {
  var href = doc.title.toLowerCase();
  href = href.replace(/\s/g, '-');
  return href + '.html';
}

function md(raw) {
  return marked(raw);
}



