'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.DB_URL)

const favSchema = new Schema({
  name: {type: String},
  description: {type: String},
  activities:{type:[]},
  plannedFor:  {type: Date},
  email: {type:String},
});
// Schema defines the shape of the data

const Fav = mongoose.model('Fav', favSchema);
// model is a function that creates a new 'model' with a title that has certain methods available to it

module.exports = Fav;