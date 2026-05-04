const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: String,
  image: String,
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);