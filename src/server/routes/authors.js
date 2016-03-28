var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var passport = require('../lib/passport');
var bcrypt = require('bcrypt');
var helpers = require('../lib/helpers');

// show all authors
router.get('/', function(req, res, next) {
  res.render('authors/index', { title: 'Express' });
});

// show one author
router.get('/:id', function(req, res, next) {
  res.render('authors/show', { title: 'Express' });
});

// add new author
router.get('/new', function(req, res, next) {
  res.render('authors/new', { title: 'Express' });
});

router.post('/new', function(req, res, next) {
  // use a query to input information to the DB.
});

// edit one author
router.get('/:id/edit', function(req, res, next) {
  res.render('authors/new', { title: 'Express' });
});

router.post('/:id/edit', function(req, res, next) {
  // use a query to edit the information based on ID.
});

// delete one author
router.post('/:id/delete', function(req, res, next) {

});

module.exports = router;
