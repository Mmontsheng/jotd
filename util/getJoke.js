const checkInternet = require('../util/havInternet');
const FileHandler = require('./FileHandler');
const fileHandler = new FileHandler(); 
const axios = require('axios');

module.exports = () => {
  return new Promise((resolve, reject) => {
    checkInternet().then((hasInternet) => {
      // if user has no internet, use jokes from jokes.json file
      if(!hasInternet) {
        fileHandler.get()
          .then((jokes) => {
            const randomNo =  Math.floor((Math.random() * jokes.length-1));
            const { joke } =  jokes[randomNo];    
            resolve(joke);
          })
          .catch((err) => reject(err));
      } else {
        axios.get('http://jokes.guyliangilsing.me/retrieveJokes.php?type=random')
        .then((response) => {
          let { joke } = response.data; 
          fileHandler.save({joke}).then(() => {
            resolve(joke);
          });
        });
      }
    });
  });

}
