"use strict";

var contentController = {};
var db = require("../db/knexDB.js");
var moment = require("moment");

contentController.getContentList = function (req, res) {

    var data = {};

    db().select().from("blog_post")
    .where({
        show_on_blog: true
    })
    .then(function (result) {
        data.result = result;
        data.message_code = 200;
        data.message = "ok";
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.status(200).json(data);
    })
    .catch(function (err) {
        data.message_code = 500;
        data.message = "Internal server error";
        data.error = err;
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.status(500).json(data);
    });
}

contentController.postBlog = function (req, res) {

    var data = {};

    db().insert({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        created_on: moment().format("X"),
        show_on_blog: req.body.show_on_blog
    }).into('blog_post')
    .then(function (result) {
        data.result = result
        data.message_code = 200;
        data.message = "ok";
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.status(200).json(data);
    })
    .catch(function (err) {
        data.message_code = 500;
        data.message = "Internal server error";
        data.error = err;
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.status(500).json(data);
    });
}

contentController.getPictureByBlogId = function (req, res) {
    var data = {};

    db().select().from("image_path")
    .where({
        blog_post_id: req.query.blog_post_id 
    })
    .then(function (result) {
        data.result = result;
        data.message_code = 200;
        data.message = "ok";
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.status(200).json(data);
    })
    .catch(function (err) {
        data.message_code = 500;
        data.message = "Internal server error";
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.status(500).json(data);
    });
}

module.exports = contentController;