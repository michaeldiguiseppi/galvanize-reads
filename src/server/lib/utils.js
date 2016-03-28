//
// function matchAuthorsToBooks(books) {
//   var bookArray = [];
//   var titleArray = [];
//   books.forEach(function(book) {
//     if (titleArray.indexOf(book.title) === -1) {
//       titleArray.push(book.title);
//       bookArray.push({
//         id: book.book_id,
//         title: book.title,
//         genre: book.genre,
//         description: book.description,
//         cover_url: book.cover_url
//       });
//     }
//   });
//   return bookArray;
// }
// 
//
//
// // {
// //   title: '',
// //   genre: '',
// //   authors: []
// // }
//
// module.exports = {
//   matchAuthorsToBooks: matchAuthorsToBooks,
// };
