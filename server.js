'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Fav = require('./models/fav')

const getParks = require('./modules/getParks');
const getActivities = require('./modules/getActivities');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const PORT = process.env.PORT || 3001;

//routes
app.get('/parks', getParks);
app.get('/activities', getActivities);
app.get('/favs', handleGetFavs)

async function handleGetFavs(req, res) {
  console.log("getting faves for",req.query.email)
  try {
    const favsFromDb = await Fav.find({ email: req.query.email });
     res.status(200).send(favsFromDb);
    } catch (e) {
    console.error(e);
    res.status(500).send('server error');
  }
}

app.post('/favs', handlePostParks)
async function handlePostParks(req, res) {
  try {
    console.log(res)
    const newFav = await Fav.create({ ...req.body })
    res.status(201).send(newFav)
  } catch (e) {
    res.status(500).send('server error');
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
