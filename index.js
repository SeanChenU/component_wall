/**
 * Terminology:
 * Component-name: React component name
 * Component-details: Lines inside React files which contains "@cpn"
 * Component-property-name: ['scn', 'dsc', 'tag']. Should have contains three chars.
 * Component-property-value: Value extracted from component-details contains
 * Component-property-name, "@cpn-dsc Title with bold font" => "Title with bold font"
 */

const walk = require('walk');
const fs = require('fs');
var files = []
// var path = '/Users/bokingHD/aranyaApp/js/components';
var path = './test'

const PREFIX_CPN = "@cpn-"
const SUFFIX_SCREENSHOT = "scn"
const SUFFIX_DESCRIPTION = "dsc"
const SUFFIX_TAG = "tag"

walkThrough = () => {
  var walker = walk.walk(path, { followLinks: false });

  walker.on('file', function(root, stat, next) {
    var filePath = `${root}/${stat.name}`;

    // Add this file to the list of files
    files.push(filePath);

    fs.readFile(filePath, 'utf8', (err, data) => {
      findLineContainsComponentInfo(filePath, data);
    });

    next();
  });

  walker.on('end', function() {
    // console.log(files);
  });
}

walkThrough();

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
  console.log(`${name} -> ${results}`);
  console.log(name + "'s screenshot: " + findPropertyValueByNameFromDetails(results, SUFFIX_SCREENSHOT));
  console.log(name + "'s description: " + findPropertyValueByNameFromDetails(results, SUFFIX_DESCRIPTION));
  console.log(name + "'s tag: " + findPropertyValueByNameFromDetails(results, SUFFIX_TAG));

  console.log('\n');
}

var checkIfMatch = (target, term) => {
  return target.indexOf(term) != -1;
}

var findPropertyValueByName = (line, propertyName) => {
  var match = "";
  switch(propertyName) {
    case SUFFIX_SCREENSHOT:
      match = line.match(/@cpn-scn (.*)/)
      break;
    case "dsc":
      match = line.match(/@cpn-dsc (.*)/)
      break;
    case "tag":
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

// var findComponentDetailsByName(name, ) {
//   var prefix = "@cpn-";
//   switch(name) {
//     case 'scn':

//     case 'dsc':
//     case 'tag':
//   }
// }