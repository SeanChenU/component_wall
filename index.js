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
      findLineContainsComponentInfo(data);
    });

    next();
  });

  walker.on('end', function() {
    console.log(files);
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

findLineContainsComponentInfo = (fileString) => {
  var results = [];
  fileString.split('\n').forEach((line) => {
    if (line.indexOf('https://') != -1) {
      results.push(line);
    }
  });
  console.log(results);
}

