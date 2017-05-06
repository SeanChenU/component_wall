const walk = require('walk');
const fs = require('fs');
var files = []
var path = '/Users/bokingHD/aranyaApp/js/components';

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

// fs.readFile('/Users/bokingHD/aranyaApp/js/components/General/Avatar.js', 'utf8',(err, data) => {
//   // console.log(data);
//   // console.log(data.split('\n'));
//   data.split('\n').forEach(function(line) {
//     if (line.indexOf('https://') != -1) {
//       console.log(line);
//     }
//   }, this);
// });

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
    if (checkIfMatch(line, 'https://')) {
      results.push(line);
    }
  });
  console.log(`${name} -> ${results}\n`);
}

var checkIfMatch = (target, term) => {
  return target.indexOf(term) != -1;
}
