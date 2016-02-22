"use strict";

var imageController = {};

var db = require("../db/knexDB.js");
var moment = require("moment");

imageController.getFeaturedImages = function (req, res) {

    var data = {};

    db().select().from("image_path")
    .where({
        homepage_feature: true
    })
    .orderBy('priority', 'desc')
    .limit(req.query.limit || 9)
    .offset(req.query.offset || 0)
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
module.exports = imageController;