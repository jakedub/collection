const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true},
  source: [{
    online: Boolean,
    print: Boolean
  }],
  version: [{
    issue: { type: Number, required: true},
    print: Date,
    volume: { type: Number, default: 1},
    writer: { type: String, required: true},
    artist: { type: String, required: true},
    characters: [{
      good: String,
      bad: String,
      firstAppearance: Boolean
    }]
  }],
  gradient: [{
    grade: { type: Number, required: true},
    checker: { type: String, required: true},
    comments: String,
    signatures: [{
      artist: Boolean,
      writer: Boolean
    }]
  }]
})


const Book = mongoose.model('Book', bookSchema); //Recipe is uppercase to sygnify model. "Recipe" is collection name. Model/Collection should be same name. Passing in schema as well. Models should have uppercase
 
module.exports = Book;
