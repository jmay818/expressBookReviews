const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
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

const authenticatedUser = (username,password)=>{ //returns boolean
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
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
