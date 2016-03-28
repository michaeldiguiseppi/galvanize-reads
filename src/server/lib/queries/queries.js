var knex = require('../../../../db/knex');
function Books() {
  return knex('books');
}
function Authors() {
  return knex('authors');
}

function BooksAuthors() {
  return knex('books_authors');
}

// function getAllAuthors() {
//   return Authors()
//     .innerJoin('books_authors', 'authors.id', 'books_authors.author_id')
//     .then(function(data) {
//       return data;
//     });
// }

// function getAllBooks() {
//   return Books()
//     .innerJoin('books_authors', 'books.id', 'books_authors.book_id')
//     .then(function(books) {
//       allAuthors().then(function(authors) {
//         return authors;
//       });
//       attachAuthorsToBooks(books, authors);
//     });
// }

// function attachAuthorsToBooks(books, authors) {
//
// }

function getAll(arg) {

  var queryString = 'select books.id, books.title, books.genre, books.description, '+
  'books.cover_url, string_agg(authors.first_name || \' \' || authors.last_name, \', \') '+
  'as authors from books inner join books_authors on books_authors.book_id = books.id '+
  'inner join authors on books_authors.author_id = authors.id ';

  if (arg) {
    queryString += ('where books.id = ' + arg);
  }
  var queryEnd = ' group by books.id, books.title, books.genre, books.description, books.cover_url order by books.id';
  queryString += queryEnd;
  return knex.raw(queryString)
  .then(function(data) {
    return data.rows;
  });
}

// get all books
function allBooks() {
  return Books()
  .innerJoin('books_authors', 'books.id', 'books_authors.book_id')
  .innerJoin('authors', 'authors.id', 'books_authors.author_id')
  .then(function(data) {
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

module.exports = {
  getAll: getAll,
  //getAllBooks: getAllBooks,
  allBooks: allBooks,
  oneBook: oneBook,
  addBook: addBook,
  editBook: editBook,
  deleteBook: deleteBook,
  allAuthors: allAuthors,
  oneAuthor: oneAuthor,
  addAuthor: addAuthor,
  editAuthor: editAuthor,
  deleteAuthor: deleteAuthor,
};
