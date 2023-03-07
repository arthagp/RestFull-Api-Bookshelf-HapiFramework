const { nanoid } = require("nanoid");
const notes = require("./notes.js");

const addBooksHandler = async (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = false;

  const newNote = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  notes.push(newNote);

  //filter untuk noname
  const filterNoName = notes.filter((note) => note.name === undefined);
  //filter untuk readpage > pagecount

  if (filterNoName.length > 0) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  } else if (newNote.readPage > newNote.pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  } else {
    const finished = newNote.pageCount === newNote.readPage;
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
      finished: finished,
      name: name,
    });
    response.code(201);
    return response;
  }
};

const getBooks = (request, h) => {
  const books = notes.map((note) => ({
    id: note.id,
    name: note.name,
    publisher: note.publisher,
  }));

  const response = h.response({
    status: "success",
    data: {
      books: books,
    },
  });
  response.code(200);
  return response;
};

const getBooksById = (request, h) => {
  const { id } = request.params;

  //cari note dengan id yang sama
  const note = notes.filter((n) => n.bookId === id)[0];

  if (note !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book: note,
      },
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};

const editBooksById = (request, h) => {
  const { id } = request.params;
  const updatedAt = new Date().toISOString();

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const index = notes.findIndex((note) => note.bookId === id);
  const filterNoName = notes.filter((note) => note.name === undefined);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  } else if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(404);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(404);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};

const deleteBooksById = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.bookId === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};


module.exports = {
  addBooksHandler,
  getBooks,
  getBooksById,
  editBooksById,
  deleteBooksById,
};
