const express = require("express");
const mongoose = require("mongoose");
// const Router = require("./routes/users")

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/miniprojet',
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



var Users = require('./routes/users')

app.use('/users', Users)

var News = require('./routes/news')

app.use('/news', News)

var Coments = require('./routes/comentaires')

app.use('/comentaires', Coments)

app.listen(3003, () => {
  console.log("Server is running at port 3003");
});