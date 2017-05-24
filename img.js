'use strict'

var path = process.cwd();
const walk = require('walk');
const fs = require('fs');
const sizeOf = require('image-size');

module.exports = class ImageFilesParser {
  constructor() {
    console.log('image files parser');
  }

  walkThrough() {
    var images = [];

    var options = {
      filters: ["node_modules", "ios", "android", ".git"],
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
          var filePath = `${root}/${fileStats.name}`;
          // console.log(filePath);
          // console.log(isImage(filePath));

          // var data = fs.readFileSync(filePath, { 'encoding': 'utf8' });

          if (isImage(filePath)) {
            var dimensions = sizeOf(filePath);
            // console.log(dimensions.width, dimensions.height);

            images.push({
              'path': filePath,
              'name': getFileName(filePath),
              'size': dimensions.width + 'x' + dimensions.height
            });
          }

          next();
        },
        errors: function(root, nodeStatsArray, next) {
          next();
        }
      }
    };

    var walker = walk.walkSync(path, options);

    return images;
  }

}

function isImage(filePath) {
  var pathDirs = filePath.split('/');
  var lastFileName = pathDirs[pathDirs.length - 1];
  lastFileName = lastFileName.toLowerCase();
  var imgExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  // imgExtensions.map(function(ext) {
  //   console.log(lastFileName);
  //   console.log(lastFileName.indexOf(ext));
  //   if (lastFileName.indexOf(ext) != -1) {
  //     // is image
  //     return true;
  //   }
  // });
  var fileExt = lastFileName.split('.').slice(-1).pop()
    // console.log(fileExt);
  if (imgExtensions.indexOf(fileExt) != -1) {
    return true;
  } else {
    return false;
  }
}

function getFileName(filePath) {
  var pathDirs = filePath.split('/');
  var lastFileName = pathDirs[pathDirs.length - 1];
  lastFileName = lastFileName.toLowerCase();
  return lastFileName;
}