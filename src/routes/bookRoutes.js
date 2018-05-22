const express = require('express');
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectID } = require('mongodb');

const bookRouter = express.Router();

function router(nav) {
  //   bookRouter.route('/')
  //     .get((req, res) => {
  //       connection.query('SELECT * FROM books ', function (error, results, fields) {
  //         if (error) debug(error);
  //         else {
  //           books = results;
  //           res.render(
  //             'bookListView',
  //             {
  //               nav,
  //               title: 'Books',
  //               books
  //             }
  //           );
  //         }
  //       });

  //     });
  //   bookRouter.route('/:id')
  //     .all((req, res, next) => {
  //       const { id } = req.params;
  //       connection.query('SELECT * FROM books WHERE id = ?', [id], function(error, results, fields) {
  //         req.book = results[0];
  //         next();
  //         })
  //      })
  //     .get((req, res) => {
  //       const { id } = req.params;
  //         res.render(
  //           'bookView',
  //           {
  //             nav,
  //             title: 'Books',
  //             book: req.book
  //           }
  //         );
  //       });

  //   return bookRouter;
  // }
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  bookRouter.route('/')
    .get((req, res) => {
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
    });
  bookRouter.route('/:id')
    .get((req, res) => {
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
    });

  return bookRouter;
}


module.exports = router;
