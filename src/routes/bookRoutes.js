const express = require('express');

const bookRouter = express.Router();

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
      'books',
      {
        nav: [{ link: '/books', title: 'Books' },
          { link: '/author', title: 'Authors' }],
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
      'book',
      {
        nav: [{ link: '/books', title: 'Books' },
          { link: '/author', title: 'Authors' }],
        title: 'Books',
        book: books[id]
      }
    );
  });

module.exports = bookRouter;
