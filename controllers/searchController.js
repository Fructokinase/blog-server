"use strict";

var searchController = {};
var db = require("../db/knexDB.js");
var sanitize = require("../services/sanitize");
var moment = require("moment");



searchController.filterByTags = function(req, res) {
    var data = {};

    //req.query.tags is an array


    db().select().from("blog_post")
    .where({
        show_on_blog: req.query.show_on_blog || true
    })
    .andWhere(db.raw("? = ANY (tags)", req.query.tags[0]))
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

module.exports = searchController;