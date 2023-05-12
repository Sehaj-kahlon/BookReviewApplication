const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
const reviews = {};
const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  // return res.status(300).json({ message: "Yet to be implemented" });
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(404).json({ message: "Body Empty" });
  }
  let accessToken = jwt.sign(
    {
      data: username,
    },
    "access",
    { expiresIn: 60 * 60 }
  );
  req.session.authorization = {
    accessToken,
  };
  // if (username in users && users.password === password) {
  req.session.username = username;
  return res.status(200).send("User successfully logged in");
  // }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const username = req.session.username;
  const isbn = req.params.isbn;
  const review = req.body.review;
  if (!username) {
    return res.status(401).send("You must be logged in to post a review.");
  }
  if (reviews[isbn] && reviews[isbn][username]) {
    // Modify the existing review
    reviews[isbn][username] = review;
    return res.send("Review modified successfully for book with isbn " + isbn);
  }
  if (!reviews[isbn]) {
    reviews[isbn] = {};
  }
  reviews[isbn][username] = review;

  return res.send("Review posted successfully for book with isbn " + isbn);
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const username = req.session.username;
  const isbn = req.params.isbn;
  if (!username) {
    return res.status(401).send("You must be logged in to post a review.");
  } 
  else {
    delete reviews[isbn][username];
    return res.send("Review deleted successfully.");
  }
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
