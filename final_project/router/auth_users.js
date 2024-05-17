const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const session = require('express-session');
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
    function User(user) {
        if (user.username === username) {
            return true;
        }
        return false;
    }
    if (users.filter(User).length > 0) {
        return false;
    }
    return true;
}

const authenticatedUser = (username,password) => { //returns boolean
    //write code to check if username and password match the one we have in records.
    function User(user) {
        return (user.username === username && user.password === password);
    }
    if (users.filter(User).length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    if (authenticatedUser(username, password)) {
        let token = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });
        req.session.authorization = {
            token, username
        }
        return res.send("You are now logged in.");
    } else {
        return res.send("Error. Could not log in.");
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;
    const review = req.query.review.split('+').join(' ');
    const values = Object.values(books);
    values[isbn - 1]["reviews"][username] = review;
    return res.send("Review was added!");
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;
    const values = Object.values(books);
    delete values[isbn - 1]["reviews"][username];
    return res.send("Review deleted.");
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
