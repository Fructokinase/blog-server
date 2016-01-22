"use strict";

var contentController = {};
var db = require("../db/knexDB.js");

contentController.getContentList = function (req, res) {

    var data = {};

    db().select().from("blog_post")
    .then(function (result) {
        data.result = result;
        data.message_code = 200;
        data.message = "ok";
        res.status(200).json(data);
    })
    .catch(function (err) {
        data.message_code = 500;
        data.message = "Internal server error";
        data.error = err;
        res.status(500).json(data);
    });
}

module.exports = contentController;