//Mongo
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/comic";

//body parser
const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended:true}));


const books = require("./models/comic");

//Express
const express = require ("express");
const app = express ();

//Mustache
const mustacheExpress = require("mustache-express");
app.engine("mustache", mustacheExpress());
app.set("views", "./views")
app.set("view engine", "mustache")

//styling
app.use(express.static("public"))

//Mongoose
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/comic');

// MongoClient.connect(url)
//   .then(function(db){
//     return db.collection("comic").insertMany(data.book)
//   })
//   .then(function(result){
//     console.log(result);
//   });


//rendering the online form
app.get('/', function (req, res) {
  res.render("index");
});

//rendering the return
app.get("/completed", function (req,res){
  res.render("completed");
});

//making an instance. how to do signatures: artist: true?
// let book = new Book({name: "Superman"});
// book.version.push({issue: '619', artist: "Alex Ross", writer: "Kurt Busiek"});
// console.log(book.toObject()); //what does toObject do?

//unsaved model that's being saved
Book.create({name: "Journey Into Mystery"})
  .then(handleSuccess)
  .catch(handleError);

app.listen(3000, function () {
  console.log('Wolverines!!!');
});
