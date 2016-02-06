"use strict";

var commentController = {};
var db = require("../db/knexDB.js");
var moment = require("moment");

commentController.getComments = function (req, res) {

    var data = {};

    db().select().from("blog_comments")
    .where({
        blog_id: req.query.blog_id
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

commentController.deleteComment = function(req, res){
    var data = {};

    db().del().from("blog_comments")
    .where({
        id: req.body.id
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

commentController.postComment = function (req, res) {

    var data = {};

    db().insert({
        blog_id: req.body.blog_id,
        commenter_name: req.body.commenter_name,
        comment: req.body.comment,
        posted_on: moment().format("X"),
    }).into('blog_comments')
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

commentController.likeComment = function (req, res) {

    var data = {};

    db('blog_comments').where({
        id: req.body.id
    }).increment('likes',1)
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
        console.log(err)
    });
}

module.exports = commentController;