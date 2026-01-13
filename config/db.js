const mongoose = require("mongoose");
require("dotenv").config({ quiet: true });

function mongoConnection() {
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("MongoDB is connected...");
    })
    .catch((e) => {
        console.log(e);
    });
}

module.exports = mongoConnection();



// const mysql = require("mysql2");

// let connection = mysql.createPool({
//     host: "127.0.0.1",
//     port: 3306,
//     user: "root",
//     password: "1492000",
//     database: "test"
// });

// const mysqlQuery = (qry) => {
//     return new Promise((resolve, reject) => {
//         connection.query(qry, (err, row) => {
//             if (err) return reject(err);
//             resolve(row);
//         });
//     });
// };

// module.exports = { connection, mysqlQuery };
