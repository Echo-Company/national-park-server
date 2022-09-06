const mongoose = require('mongoose');
require('dotenv').config();

const Fav = require('./models/fav.js');

async function seed() {
  mongoose.connect(process.env.MONGO_URL);

  await Fav.create({
    name:  'Book 1',
    description: 'YAY A BOOK!',
    email: 'audrey@codefellows.com'
  });

  console.log('saved book 1');
  mongoose.disconnect();
}

seed();