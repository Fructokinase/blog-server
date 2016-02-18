"use strict";

var sanitize = function(obj){
    for (var key in obj) {
        if(obj[key] === null || obj[key] === undefined) {
            delete obj[key];
        };
    };
    return obj;
};

module.exports = sanitize;