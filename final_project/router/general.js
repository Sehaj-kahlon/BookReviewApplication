const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

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
      res.send("message : Registered Successfully! now you can log in");
    }
  }
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn]));
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

module.exports.general = public_users;
