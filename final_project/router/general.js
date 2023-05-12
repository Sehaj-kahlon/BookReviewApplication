const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios");
const fs = require("fs");
const { resolve } = require("path");
const { rejects } = require("assert");
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    // return res.status(404).json({message: "Body Empty"});
    res.send("No username or password");
  } else {
    if (username in users) {
      res.send("User already exists");
    } else {
      users.push({ username, password });
      // console.log(users);
      res.send("message : Registered Successfully! now you can log in");
    }
  }
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books));
});
// get books list using promise
let getBooks = new Promise((resolve, rejects) => {
  resolve(books);
});
getBooks
  .then((books) => {
    console.log(JSON.stringify(books));
  })
  .catch((error) => {
    console.log(error);
  });
// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn]));
});

// get books list using async await
const getBooks2 = async () => {
  try {
    return books;
  } catch (error) {
    throw error;
  }
};

// Usage
(async () => {
  try {
    const books = await getBooks2();
    console.log(JSON.stringify(books));
  } catch (error) {
    console.error(error);
  }
})();
//get book details based on ISBN using promise
let isbnBook = (isbn) => {
  return new Promise((resolve, rejects) => {
    const book = books[isbn];
    resolve(book);
  });
};
const isbn = "1";
isbnBook(isbn)
  .then((book) => {
    console.log(book);
  })
  .catch((erroe) => {
    console.error(erroe);
  });
// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  let filtered_Book = Object.values(books).filter((books) => books.author === author);
  res.send(JSON.stringify(filtered_Book));

  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title;
  let filtered_Book = Object.values(books).filter((books) => books.title === title);
  res.send(JSON.stringify(filtered_Book));
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let filtered_Book = books[isbn];
  res.send(JSON.stringify(filtered_Book.reviews));
});
//searh book by author using prmoise
let autorBook = (author) => {
  return new Promise((resolve, reject) => {
    let filtered_Book = Object.values(books).filter((books) => books.author === author);
    resolve(filtered_Book);
  });
};

const author = "Unknown";
autorBook(author)
  .then((filtered_Book) => {
    console.log(filtered_Book);
  })
  .catch((error) => {
    console.log(error);
  });
//search by title using async await
let getBooksTitle =  async (title) => {
  try {
    let filtered_Book = Object.values(books).filter((books) => books.title === title);
    return filtered_Book;
  } catch (error) {
    throw error;
  }
};
const title = "Njál's Saga";
// Usage
(async () => {
  try {
    const book = await getBooksTitle(title);
    console.log(book);
  } catch (error) {
    console.error(error);
  }
})();
module.exports.general = public_users;
