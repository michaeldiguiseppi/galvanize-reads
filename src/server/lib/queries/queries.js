var knex = require('../../../knex');
function Books() {
  return knex('books');
}
function Authors() {
  return knex('authors');
}


// get all books
function allBooks() {
  return Books().then(function(data) {
    return data;
  });
}
// get one book
function oneBook(id) {
  return Books().where('id', id).then(function(data) {
    return data;
  });
}
// add one book
function addBook(body) {
  return Books().insert(body).returning('id').then(function(data) {
    return data;
  });
}
// edit one book
function editBook(id, body) {
  return Books().where('id', id).update(body).returning('id').then(function(data) {
    return data;
  });
}
// delete one book
function deleteBook(id) {
  return Books().where('id', id).del();
}


// get all authors
function allAuthors() {
  return Authors().then(function(data) {
    return data;
  });
}
// get one author
function oneAuthor(id) {
  return Authors().where('id', id).then(function(data) {
    return data;
  });
}
// add one author
function addAuthor(body) {
  return Authors().insert(body).returning('id').then(function(data) {
    return data;
  });
}
// edit one author
function editAuthor(id, body) {
  return Authors().where('id', id).update(body).returning('id').then(function(data) {
    return data;
  });
}
// delete one author
function deleteAuthor(id) {
  return Authors().where('id', id).del();
}
