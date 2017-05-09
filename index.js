/**
 * Terminology:
 * Component-name: React component name
 * Component-details: Lines inside React files which contains "@cpn"
 * Component-property-name: ['scr', 'des', 'tag']. Should have contains three chars.
 * Component-property-value: Value extracted from component-details contains
 * Component-property-name, "@cpn-des Title with bold font" => "Title with bold font"
 */

const walk = require('walk');
const fs = require('fs');
var files = []
var path = '/Users/bokingHD/aranyaApp/js/components';
// var path = './test'
const express = require('express');
const _path = require('path');
var app = express();

const PREFIX_CPN = "@cpn-"
const SUFFIX_SCREENSHOT = "scr"
const SUFFIX_DESCRIPTION = "des"
const SUFFIX_TAG = "tag"

var walkThroughFile = () => {
  var results = [];

  // var walker = walk.walk(path, { followLinks: false });

  // walker.on('file', function(root, stat, next) {
  //   var filePath = `${root}/${stat.name}`;

  //   // Add this file to the list of files
  //   files.push(filePath);

  //   fs.readFile(filePath, 'utf8', (err, data) => {
  //     results.push(findLineContainsComponentInfo(filePath, data));
  //   });

  //   next();
  // });

  // walker.on('end', function() {
  //   // console.log(files);
  //   return results;
  // });

  var options = {
    listeners: {
      names: function(root, nodeNamesArray) {
        nodeNamesArray.sort(function(a, b) {
          if (a > b) return 1;
          if (a < b) return -1;
          return 0;
        });
      },
      directories: function(root, dirStatsArray, next) {
        // dirStatsArray is an array of `stat` objects with the additional attributes
        // * type
        // * error
        // * name

        next();
      },
      file: function(root, fileStats, next) {
        // fs.readFile(fileStats.name, function() {
          // doStuff
        //   next();
        // });

        var filePath = `${root}/${fileStats.name}`;
        console.log(filePath);
        // fs.readFileSync(filePath, 'utf8', (err, data) => {
        //   console.log(data);
        //   results.push(findLineContainsComponentInfo(filePath, data));

        // });

        var data = fs.readFileSync(filePath, {'encoding': 'utf8'});
        console.log(data);

        results.push(findLineContainsComponentInfo(filePath, data));

        next();
      },
      errors: function(root, nodeStatsArray, next) {
        next();
      }
    }
  };

  var walker = walk.walkSync(path, options);

  return results;
}

// walkThroughFile();

var findLineContainsComponentInfo = (filePath, fileString) => {
  var name = "";
  var pathDirs = filePath.split('/');
  if (pathDirs[pathDirs.length - 1].indexOf('.js') == -1) { // is not .js file
    return;
  }
  if (pathDirs.length > 2) {
    if (pathDirs[pathDirs.length - 1] == 'index.js') { // last file
      name = pathDirs[pathDirs.length - 2]
    } else {
      name = pathDirs[pathDirs.length - 1]
    }
    name = name.replace('.js', '');
  } else {

  }

  var results = [];
  fileString.split('\n').forEach((line) => {
    if (checkIfMatch(line, '@cpn')) {
      results.push(line);
    }
  });

  var scr = findPropertyValueByNameFromDetails(results, SUFFIX_SCREENSHOT);
  var des = findPropertyValueByNameFromDetails(results, SUFFIX_DESCRIPTION);
  var tag = findPropertyValueByNameFromDetails(results, SUFFIX_TAG);

  console.log(`${name} -> ${results}`);
  console.log(name + "'s screenshot: " + scr);
  console.log(name + "'s description: " + des);
  console.log(name + "'s tag: " + tag);

  console.log('\n');

  return {
    'name': name,
    'screenshot': scr,
    'description': des,
    'tag': tag
  }
}

var checkIfMatch = (target, term) => {
  return target.indexOf(term) != -1;
}

var findPropertyValueByName = (line, propertyName) => {
  var match = "";
  switch (propertyName) {
    case SUFFIX_SCREENSHOT:
      match = line.match(/@cpn-scr (.*)/)
      break;
    case SUFFIX_DESCRIPTION:
      match = line.match(/@cpn-des (.*)/)
      break;
    case SUFFIX_TAG:
      match = line.match(/@cpn-tag (.*)/)
      break;
  }

  if (match != null) {
    return match[1];
  } else {
    return null;
  }
}

var findPropertyValueByNameFromDetails = (details, propertyName) => {
  var result = null;
  details.map((line) => {
    var propertyValue = findPropertyValueByName(line, propertyName);
    if (propertyValue != null) {
      result = propertyValue;
    }
  });
  return result;
}

// Express
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(_path.join(__dirname + '/index.html'));
});

app.get('/cpn', (req, res) => {
  res.send({
    data: walkThroughFile()
  })
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});