"use strict";


var Promise = require("bluebird");
//var config = require("services/config");
var jwt = require("jsonwebtoken");
var moment = require("moment");
var pbkdf2 = Promise.promisify(require("pbkdf2").pbkdf2);
var randomBytes = Promise.promisify(require("crypto").randomBytes); // returns a buffer object
var scmp = require("scmp");

var auth = {};

var jwtSecret = "abcd"//process.env.jwtSecret;

auth.generateToken = function (user) {
    var issuedTime = moment();
    var expiredTime = issuedTime.add(10,"days");

    var token = jwt.sign({
        exp: expiredTime.valueOf(), // exp = Expiration date
        iat: issuedTime.valueOf(),  // iat = Issued At Time
        nam: user.user_name,
        grp: user.user_group
    }, jwtSecret);

    return token;
};


// Returns a string which includes the hash itself, as well as the salt and iterations used to
// produce it, in the following format: <iterations>:<salt>:<hash/
function pbkdf2Hash(password, salt, iterations) {
    var keyLength = 32;
    var hashFunction = "sha256";
    return pbkdf2(password, salt, iterations, keyLength, hashFunction)
    .then(function (key) {
        return key.toString("base64");
    });
};

auth.verifyPassword = function (password, fullHash) {
    var parts = fullHash.split(":");
    var iterations = Number(parts[0]);
    var salt = parts[1];
    var oldHash = parts[2];

    return pbkdf2Hash(password, salt, iterations)
    .then(function (newHash) {
        return scmp(oldHash, newHash);
    });
};

auth.verifyToken = function (token) {
    return jwt.verify(token, jwtSecret);
};

module.exports = auth;