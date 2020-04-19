const fs = require('fs');
const JOKES_PATH = '././jokes.json';

module.exports = class {
  save(joke){
    return new Promise((resolve, reject) => {
      this.get()
      .then((file) => {
        const files = file;
        files.push(joke);
        fs.writeFile(JOKES_PATH, JSON.stringify(files), (err) => {
          if (err) {
            reject('Error saving joke to file',err);
          }
          resolve();
        });
      })
      .catch((err) => reject(err));
    });
  };

  get() {
    return new Promise((resolve, reject) => {
      let jokes = require('../jokes.json');
      resolve(jokes);
    });
  };
}