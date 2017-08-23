//Mongo
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/comic";

//body parser
const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended:true}));


const Book = require("./models/comic");

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

// let newName = new Book ({name:"Journey into Mystery"});
// newName.save()
// .then(function(){
//   db.group.insertOne(newName);
// })
// .catch(function(){
//   // console.log("not valid");
// })
function handleSuccess(result){
  console.log(result);
}

function handleError(result){
  console.log(result);
  console.log("This is an error");
}
//rendering the online form
app.get('/', function (req, res) {
  res.render("index");
});

//rendering the return
app.get("/completed", function (req,res){
  res.render("completed");
});

//unsaved model that's being saved
// Book.create({name: "Amazing Spider-Man"})
//   .then(handleSuccess)
//   .catch(handleError);

// Book.create({})
// .then(handleSuccess)
// .catch(handleError);

//rendering to the completed page



let list =  [{
  name: "Superman",
  source: [{
    online: true,
    print: false
  }],
  version: [{
    issue: 619,
    print: 01/01/2001,
    volume: 1,
    writer: "Kurt Busiek",
    artist: "Alex Ross",
    characters: [{
      good: "Superman, Lois Lane",
      bad: "Lex Luthor",
      firstAppearance: true
    }]
  }],
  gradient: [{
    grade: 9,
    checker: "Bill Thomas",
    comments: "This is a comment",
    signatures: [{
      artist: true,
      writer: true
    }]
  }]
}]

// Book.create(list)
// .then(handleSuccess)
// .catch(handleError);

const data = {
  bookList:list
};

app.get("/completed", function(req, res){
  MongoClient.connect(url)
  .then(function(db){
    return db.collection("books").find().toArray(function(err, doc){
      res.render("completed", {data:doc});
    });
    db.close();
  });
});

app.post("/", function(req,res){
  list.push({bookList: data});
  res.redirect("/")
});

app.post("/completed", function(req,res){
  console.log(req.body);
  let completed =req.body.marked;
  function findItems(item){
    return item.todo ===completed;}
    list.find(findItems);
    res.redirect("/");
  });

  app.listen(3000, function () {
    console.log('Wolverines!!!');
  });
