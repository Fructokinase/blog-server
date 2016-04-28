"use strict";

var authController = {};
var db = require("../db/knexDB.js");
var moment = require("moment");
var auth = require("../services/auth.js");

function UserNotFoundError() {}
UserNotFoundError.prototype = Object.create(Error.prototype);

function PasswordIncorrectError() {}
UserNotFoundError.prototype = Object.create(Error.prototype);


authController.signin = function(req, res) {
    var data = {};

    db().select().from("users")
    .where({
        user_name: req.body.user_name
    })
    .then(function(user){
        if(user[0] !== undefined) {
            return user[0];
        } else {
            throw new UserNotFoundError();
        }
    })
    .then(function (existing_user){
        if (auth.verifyPassword(req.body.password, existing_user.user_password)) {
            return auth.generateToken(existing_user);
        } else {
            throw new PasswordIncorrectError();
        }
    })
    .then(function (token) {
        data.token = token;
        res.status(200).json(data);
    })
    .catch(UserNotFoundError, PasswordIncorrectError, function(err) {
        data.message_code = 2;
        data.message = "Invalid username or password";
        res.status(401).json(data);
    });
};

module.exports = authController;