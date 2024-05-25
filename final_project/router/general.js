const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.send("Error. Unable to complete registration.")
    }
    if (username.trim().length < username.length || password.trim().length < password.length) {
        return res.send("Username/password must not contain any spaces.")
    }
    if (!isValid(username)) {
        return res.send("Please choose another username.")
    } else {
        users.push({"username": username, "password": password});
        return res.send("Registration successful!")
    }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    let p = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("Books sent successfully")
        },6000)})
    console.log("Before sending books");
    res.send(books);
    p.then(function(message) {
        console.log(message)
    })
    console.log("After sending books");
    return;
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    return res.send(books[isbn]);
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const author = req.params.author.split('+').join(' ');
    const arr = [];
    const values = Object.values(books);
    for (let i = 0; i < values.length; i++) {
        if (values[i]["author"] == author ) {
            arr.push(books[i + 1]);
        }
    }
    let p = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("Books sent successfully")
        },6000)})
    console.log("Before sending books");
    res.send(arr);
    p.then(function(message) {
        console.log(message)
    })
    console.log("After sending books");
    return;
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const title = req.params.title.split('+').join(' ');
    const arr = [];
    const values = Object.values(books);
    for (let i = 0; i < values.length; i++) {
        if (values[i]["title"] == title ) {
            arr.push(books[i + 1]);
        }
    }
    let p = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("Books sent successfully")
        },6000)})
    console.log("Before sending books");
    res.send(arr);
    p.then(function(message) {
        console.log(message)
    })
    console.log("After sending books");
    return;
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    const values = Object.values(books);
    return res.send(values[isbn - 1]["reviews"]);
});

module.exports.general = public_users;