require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./config/db");

const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.all("/", (req, res) => {
    res.send("Task management running successfully.");
});

app.use("/api", require("./routes/index.routes"));

app.use(async (req, res, next) => {
    next("URL not found");
});



const http = require("http");
const httpServer = http.createServer(app);

const { initSocket } = require("./helper/common/socket.io");
initSocket(httpServer);



httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});