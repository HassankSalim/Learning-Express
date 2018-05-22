const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });

function goodreadsService() {
  function getBookById(bookID) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${bookID}?key=enEi647QxUaAiHqELobXyQ`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        }).catch((err) => {
          reject(err);
          debug(err);
        });
    });
  }

  return {
    getBookById
  };
}

module.exports = goodreadsService();
