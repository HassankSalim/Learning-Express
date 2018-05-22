const express = require('express');
const debug = require('debug')('app:adminRoutes');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();

function router(nav) {
  const books = [
    {
      title: 'Learning JavaScript Design Patterns',
      genre: 'Technology',
      author: 'Addy Osmani',
      bookId: 656,
      read: false
    },
    {
      title: 'Eloquent JavaScript, Second Edition',
      genre: 'Technology',
      author: 'Marijn Haverbeke',
      bookId: 24280,
      read: false
    },
    {
      title: 'Learning JavaScript Design Patterns',
      genre: 'Technology',
      author: 'Addy Osmani',
      read: false
    },
    {
      title: 'Eloquent JavaScript, Second Edition',
      genre: 'Technology',
      author: 'Marijn Haverbeke',
      read: false
    },
  ];

  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://127.0.0.1:27017/';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          debug('check');
          res.json(response);
        } catch (error) {
          debug(error.stack);
        }
      }());
      // res.send('inserting books');
    });
  return adminRouter;
}

module.exports = router;

