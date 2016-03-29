var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var passport = require('../lib/passport');
var bcrypt = require('bcrypt');
var helpers = require('../lib/helpers');
var queries = require('../lib/queries/queries');
var utils = require('../lib/utils');

// show all books
router.get('/', function(req, res, next) {
  queries.getAll().then(function(data) {
    res.render('books/index', {books: data});
  });
});


// add new book
router.get('/new', function(req, res, next) {
    queries.getAllAuthors().then(function(authorArray) {
      res.render('books/new', {authorArray: authorArray, title: 'Add Book', authors: []});
    });
});

router.post('/new', function(req, res, next) {
  // use a query to input information into the DB.
  queries.addBook(req.body).then(function(ids) {
    res.redirect('/books/' + ids[0]);
  });
});

// edit one book
router.get('/:id/edit', function(req, res, next) {
  queries.getAll(req.params.id).then(function(books) {
    queries.getAllAuthors().then(function(authorArray) {
      var ids = books[0].authors.reduce(function(prev, curr) {
        prev.push(+curr.id);
        return prev;
      }, []);
      res.render('books/new', { title: 'Edit Book', book: books[0], authors: ids, authorArray: authorArray });
    });
  });
  // queries.getAll(req.params.id).then(function(data) {
  //   queries.getAllAuthors().then(function(authors) {
  //     res.render('books/new', {book: data[0], title: 'Edit Book', authors: authors, currentAuthors: data[0].authors});
  //   });
  // });
});

router.post('/:id/edit', function(req, res, next) {
  // use a query to edit the information in the DB based on ID.
  queries.editBook(req.params.id, req.body).then(function(data) {
    res.redirect('/books/' + data[0]);
  });
});

// delete one book
router.post('/:id/delete', function(req, res, next) {
  queries.deleteBook(req.params.id).then(function() {
    res.redirect('/books');
  });
});

// show one book
router.get('/:id', function(req, res, next) {
  queries.getAll(req.params.id).then(function(data) {
    res.render('books/show', { book: data[0] });
  });
});


module.exports = router;
