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