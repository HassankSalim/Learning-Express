const express = require('express');

const bookRouter = express.Router();

function router(nav) {
  const books = [
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
  bookRouter.route('/')
    .get((req, res) => {
      res.render(
        'bookListView',
        {
          nav,
          title: 'Books',
          books
        }
      );
    });
  bookRouter.route('/:id')
    .get((req, res) => {
      // const { params: { id } } = req;
      const { id } = req.params;
      res.render(
        'bookView',
        {
          nav,
          title: 'Books',
          book: books[id]
        }
      );
    });
  return bookRouter;
}

module.exports = router;
