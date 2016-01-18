
var db = require("knex")({
    client: "postgres",
    connection: {
        host: "trailandcook-db.cxjxa0ftupoy.us-west-2.rds.amazonaws.com",
        user: "fructokinase",
        password: "4str0cyt3",
        database: "trailandcook",
        port: 5432,
        dateStrings: true
    },
    pool: {
        min: 0,
        max: 7
    }
});

module.exports = db;