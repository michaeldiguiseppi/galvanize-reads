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

function getAll(arg) {
  var queryString = 'select books.id, books.title, books.genre, books.description, '+
  'books.cover_url, array_agg(authors.first_name || \' \' || authors.last_name || \', \' || authors.id) '+
  'as authors from books inner join books_authors on books_authors.book_id = books.id '+
  'inner join authors on books_authors.author_id = authors.id ';
  if (arg) {
    queryString += ('where books.id = ' + arg);
  }
  var queryEnd = ' group by books.id, books.title, books.genre, books.description, books.cover_url order by books.id';
  queryString += queryEnd;
  return knex.raw(queryString)
  .then(function(data) {
    var returner = [];
    data.rows.forEach(function(row) {
      var authorsArray = [];
      row.authors.forEach(function(author) {
        var newArray = author.split(', ');
        authorsArray.push({name: newArray[0], id: newArray[1]});
      });
      row.authors = authorsArray;
      returner.push(row);
    });
    return returner;
  });
}

function getAllAuthors(arg) {
  var queryString = 'select authors.id, authors.first_name, authors.last_name, authors.biography, '+
  'authors.portrait_url, array_agg(books.title || \', \' || books.id) '+
  'as books from authors inner join books_authors on books_authors.author_id = authors.id '+
  'inner join books on books_authors.book_id = books.id ';
  if (arg) {
    queryString += ('where authors.id = ' + arg);
  }
  var queryEnd = ' group by authors.id, authors.first_name, authors.last_name, authors.biography, authors.portrait_url order by authors.id';
  queryString += queryEnd;
  return knex.raw(queryString)
  .then(function(data) {
    var returner = [];
    data.rows.forEach(function(row) {
      var booksArray = [];
      row.books.forEach(function(book) {
        var newArray = book.split(', ');
        booksArray.push({title: newArray[0], id: newArray[1]});
      });
      row.books = booksArray;
      returner.push(row);
    });
    return returner;
  });
}

// add one book
function addBook(body, id) {
  return Books().insert({
    title: body.title,
    genre: body.genre,
    description: body.genre,
    cover_url: body.cover_url
  }).returning('id').then(function(book) {
    return Authors().where('id', id).then(function(author) {
      return BooksAuthors().insert({
        book_id: book,
        author_id: author.id
      }).then(function(data) {
        return data;
      });
    });
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
  getAllAuthors: getAllAuthors,
  addBook: addBook,
  editBook: editBook,
  deleteBook: deleteBook,
  allAuthors: allAuthors,
  oneAuthor: oneAuthor,
  addAuthor: addAuthor,
  editAuthor: editAuthor,
  deleteAuthor: deleteAuthor,
};
