var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var passport = require('../lib/passport');
var bcrypt = require('bcrypt');
var helpers = require('../lib/helpers');

// show all books
router.get('/', function(req, res, next) {
  res.render('books/index', { title: 'Express' });
});

// show one book
router.get('/:id', function(req, res, next) {
  res.render('books/show', { title: 'Express' });
});

// add new book
router.get('/new', function(req, res, next) {
  res.render('books/new', { title: 'Express' });
});

router.post('/new', function(req, res, next) {
  // use a query to input information into the DB.
});

// edit one book
router.get('/:id/edit', function(req, res, next) {
  res.render('books/new', { title: 'Express' });
});

router.post('/:id/edit', function(req, res, next) {
  // use a query to edit the information in the DB based on ID.
});

// delete one book
router.post('/:id/delete', function(req, res, next) {

});


module.exports = router;
