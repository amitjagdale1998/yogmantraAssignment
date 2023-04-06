const fs = require('fs');
const path = require('path');

const filePath=path.join(__dirname,"assignment.txt");
//  const filePath="assignment.txt";




function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
        console.log(data);
      }
    });
  });
}
 readFilePromise(filePath);







 