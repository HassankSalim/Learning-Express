const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(bookSerivce, nav) {
  function getIndex(req, res) {
    const url = 'mongodb://127.0.0.1:27017/';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const bookCollection = await db.collection('books');
        const books = await bookCollection.find().toArray();
        debug('check ', books);
        res.render(
          'bookListView',
          {
            nav,
            title: 'Books',
            books
          }
        );
      } catch (error) {
        debug(error.stack);
        res.send('error');
      }
      client.close();
    }());
  }
  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://127.0.0.1:27017/';
    const dbName = 'libraryApp';

    (async function singleQuery() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const bookCollection = db.collection('books');
        const queryBook = await bookCollection.findOne({ _id: new ObjectID(id) });
        queryBook.details = await bookSerivce.getBookById(queryBook.bookId);
        debug(queryBook);
        res.render(
          'bookView',
          {
            nav,
            title: 'Books',
            book: queryBook
          }
        );
      } catch (error) {
        debug(error.stack);
      }
    }());
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    getById,
    getIndex,
    middleware
  };
}

module.exports = bookController;
