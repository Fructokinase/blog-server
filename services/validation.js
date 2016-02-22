'use strict';

var validation = {};

validation.validate_field_GET = function(req, field, type, optional_constraint){
   // created_on is in and not undefine 

   return new Promise(function (fulfill, reject) {
    if (req.query[field] !== undefined && typeof req.query[field] === type && optional_constraint) {
        fulfill(req.query[field]);
    } else if (req.query[field] === undefined) {
        reject("undefined");
    } else if (typeof req.query[field] !== type){
        reject("invalid type");
    } else {
        reject("additional constraints not met")
    }})
  
 }

module.exports = validation;