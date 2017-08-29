//Express
const express = require ("express");
const app = express ();
//Mongo
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/comic";
//body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
//model
const Book = require("./models/comic");
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


//render the edit page. Needs to pass through the object from Mongo
app.get("/edit/:name", function(req, res) {
  MongoClient.connect(url, function(db) {
    db.collections("books").findOne({name: req.params.name}).then(function(docs) {
      console.log(docs);
      res.render("edit", docs);
    });
    db.close();
  })
});

app.post("/edit/:name/edit", function (req,res){
  MongoClient.connect(url, function(db){
    console.log("Does this work");
    db.collections("books").updateOne({name: req.params.name}, {set:
      {name: req.body.name,
      source: [{
        online: req.body.online,
        print: req.body.print
      }],
      version: [{
        issue: req.body.issue,
        print: req.body.print,
        volume: req.body.volume,
        writer: req.body.writer,
        artist: req.body.artist,
        characters: [{
          good: req.body.good,
          bad: req.body.bad,
          firstAppearance: req.body.firstAppearance
        }]
      }],
      gradient: [{
        grade: req.body.grade,
        checker: req.body.checker,
        comments: req.body.comments,
        signatures: [{
          artist: req.body.artist,
          writer: req.body.writer
        }]
      }]
    });
    .then(function() {
      console.log("Present");
      res.redirect("/completed");
      db.close();
    })
  })
})

//unsaved model that's being saved
// Book.create({name: "Amazing Spider-Man"})
//   .then(handleSuccess)
//   .catch(handleError);

// Book.create({})
// .then(handleSuccess)
// .catch(handleError);

//rendering to the completed page

app.post("/", function(req,res){
  console.log(req.body);
  Book.create({
    name: req.body.name,
    source: [{
      online: req.body.online,
      print: req.body.print
    }],
    version: [{
      issue: req.body.issue,
      print: req.body.print,
      volume: req.body.volume,
      writer: req.body.writer,
      artist: req.body.artist,
      characters: [{
        good: req.body.good,
        bad: req.body.bad,
        firstAppearance: req.body.firstAppearance
      }]
    }],
    gradient: [{
      grade: req.body.grade,
      checker: req.body.checker,
      comments: req.body.comments,
      signatures: [{
        artist: req.body.artist,
        writer: req.body.writer
      }]
    }]
  })
  .then(handleSuccess)
  .catch(handleError);

  res.redirect("/completed")
});

app.get("/completed", function(req, res){
  return Book.find()
  .then(function(books){
  res.render("completed", {data: books})
  })


//creates a hashed password. that being the password set for all the robots
app.get("/", function(req, res){
  let hash = bcrypt.hashSync("that", 8)
  console.log(hash);
})

app.get("/login", function(req,res){
  res.render("login");
});

app.post("/login", function(req,res){
  req.session.username = req.body.username
  req.session.password = req.body.password
  MongoClient.connect(url)
  .then(function functionName(db){
    db.collection("users")
    .findOne({username: username})
    .then(function(data){
      db.close()
      if (bcrypt.compareSynce(password.data.passwordHash)){
        res.render("/");
      } else {
        res.send("no")
      }
    })
  })
})

  app.listen(3000, function () {
    console.log('Wolverines!!!');
  });

//logging out
app.get("/logout", function(req,res) {
  req.session.destroy();
  res.redirect("/");
})
