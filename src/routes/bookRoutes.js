const express = require('express');
const debug = require('debug')('app:bookRoutes');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadsServices');

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
  const { getIndex, getById, middleware } = bookController(bookService, nav);
  bookRouter.use(middleware);
  bookRouter.route('/')
    .get(getIndex);
  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
}


module.exports = router;
