
var db = require("knex")({
    client: "postgres",
    connection: {
        host: "trailandcook-db.cxjxa0ftupoy.us-west-2.rds.amazonaws.com",
        user: process.env.AWS_RDS_trailandcook_user,
        password: process.env.AWS_RDS_trailandcook_password,
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
