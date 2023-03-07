const {
  addBooksHandler,
  getBooks,
  getBooksById,
  editBooksById,
  deleteBooksById,
} = require("./handler.js");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBooksHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBooksById,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBooksById,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBooksById,
  },
];

module.exports = routes;
