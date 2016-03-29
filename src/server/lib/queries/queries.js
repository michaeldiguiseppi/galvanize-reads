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
  'as books from authors left join books_authors on books_authors.author_id = authors.id '+
  'left join books on books_authors.book_id = books.id ';
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
      if (row.books[0] !== null) {
        row.books.forEach(function(book) {
            var newArray = book.split(', ');
            booksArray.push({title: newArray[0], id: newArray[1]});
        });
        row.books = booksArray;
        returner.push(row);
      }
    });
    return returner;
  });
}

// add one book
function addBook(body) {
  if (!Array.isArray(body.authors)) {
    body.authors = [body.authors];
  }
  return Books().insert({
    title: body.title,
    genre: body.genre,
    description: body.description,
    cover_url: body.cover_url
  }).returning('id').then(function(book) {
    var authorIds = body.authors || [body.authors];
    var authorPromises = authorIds.map(function(id) {
      return Authors().where('id', id).returning('id');
    });
    return Promise.all(authorPromises).then(function(ids) {
      var bookObject = ids.map(function(id) {
         return {
          book_id: book[0],
          author_id: id[0].id
        };
      });
      console.log('Book!', bookObject);
      return BooksAuthors().insert(bookObject).returning('book_id');
    });
    // map over authors and make new query for each author, then get array of promises.
    // then promise.all and do something with that.  the result is an array of what im returning.
  });
}
// edit one book
function editBook(id, body) {
  return BooksAuthors().where('book_id', id).del().then(function() {
    return Books().where('id', id).del().then(function() {
      return addBook(body).then(function(id) {
        return id;
      });
    });
  });
}
// delete one book
function deleteBook(id) {
  return BooksAuthors().where('book_id', id).del().then(function() {
    return Books().whereNotIn('id', BooksAuthors().select('book_id')).del().then(function(id) {
      return id;
    });
  });
}

// add one author
function addAuthor(body) {
  return Authors().insert({
    first_name: body.first_name,
    last_name: body.last_name,
    biography: body.biography,
    portrait_url: body.portrait_url
  }).returning('id').then(function(author) {
    if (body.books === undefined) {
      body.books = [];
    }
    if (!Array.isArray(body.books)) {
      body.books = [body.books];
    }
    console.log(body.books);
    if (body.books.length) {
      var bookIds = body.books;
      var bookPromises = bookIds.map(function(id) {
        return Books().where('id', id).returning('id');
      });
      return Promise.all(bookPromises).then(function(ids) {
        var bookObject = ids.map(function(id) {
           return {
            book_id: id[0].id,
            author_id: author[0]
          };
        });
        return BooksAuthors().insert(bookObject).returning('author_id');
      });
      // map over authors and make new query for each author, then get array of promises.
      // then promise.all and do something with that.  the result is an array of what im returning.
    } else {
      return author;
    }
  });
}
// edit one author
function editAuthor(id, body) {
  return BooksAuthors().where('author_id', id).del().then(function() {
    return Authors().where('id', id).del().then(function() {
      return addAuthor(body).then(function(id) {
        return id;
      });
    });
  });
}

// delete one author
function deleteAuthor(id) {
  return BooksAuthors().where('author_id', id).del().then(function() {
    return Authors().whereNotIn('id', BooksAuthors().select('author_id')).del().then(function(id) {
      return Books().whereNotIn('id', BooksAuthors().select('book_id')).del().then(function(id) {
        return id;
      });
    });
  });
}

module.exports = {
  getAll: getAll,
  getAllAuthors: getAllAuthors,
  addBook: addBook,
  editBook: editBook,
  deleteBook: deleteBook,
  addAuthor: addAuthor,
  editAuthor: editAuthor,
  deleteAuthor: deleteAuthor,
};
