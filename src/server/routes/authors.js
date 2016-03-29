var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var passport = require('../lib/passport');
var bcrypt = require('bcrypt');
var helpers = require('../lib/helpers');
var queries = require('../lib/queries/queries');
var utils = require('../lib/utils');

// show all authors
router.get('/', function(req, res, next) {
  queries.getAllAuthors().then(function(data) {
    res.render('authors/index', { authors: data });
  });
});


// add new author
router.get('/new', function(req, res, next) {
  var booksArray = [];
  queries.getAllAuthors().then(function(data) {
    res.render('authors/new', { books: data.books, title: 'Add Author' });
  });
});

router.post('/new', function(req, res, next) {
  // use a query to input information to the DB.
});

// edit one author
router.get('/:id/edit', function(req, res, next) {
  queries.getAllAuthors(req.params.id).then(function(authors) {
    queries.getAll().then(function(bookArray) {
      var ids = authors[0].books.reduce(function(prev, curr) {
        prev.push(+curr.id);
        return prev;
      }, []);
      res.render('authors/new', { title: 'Edit Author', author: authors[0], books: ids, bookArray: bookArray });
    });
  });
});

router.post('/:id/edit', function(req, res, next) {
  // use a query to edit the information based on ID.
});

// delete one author
router.post('/:id/delete', function(req, res, next) {

});


// show one author
router.get('/:id', function(req, res, next) {
  queries.oneAuthor(req.params.id).then(function(data) {
      res.render('authors/show', {author: data[0]});
  });
});

module.exports = router;
