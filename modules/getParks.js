'use strict';

const axios = require('axios');

let cache = {};

async function getParks(request, response) {
  let park = request.data;
  const parkList = `https://developer.nps.gov/api/v1/parks?limit=20&api_key=${process.env.NP_API_KEY}`;
  try{
    let key = park + 'park list';
    if (cache[key] && (Date.now() - cache[key].timeStamp < 9e+7)) {
      console.log('cache was hit, park present');
      response.status(200).send(cache[key].data);
    } else {
      console.log('cache missed, no park present');
      const parkResponse = await axios.get(parkList);
      const parkArray = parkResponse.data.data.map(parkObject => new Park(parkObject));
      // const parkArray = parkResponse.data.data.map(park => park );

      cache[key] = {
        data: parkArray,
        timeStamp: Date.now()
      };
      response.status(200).send(parkArray);
    }
  } catch (error) {
    console.log('error messis is: ', error);
    response.status(500).send('Server Error');
  }
}

class Park {
  constructor(parkObject) {
    this.parkName = parkObject.fullName;
    this.description = parkObject.description;
    this.parkCode = parkObject.parkCode;
    this.latitude = parkObject.latitude;
    this.longitude = parkObject.longitude;
    this.activities = parkObject.activities;
    this.url = parkObject.url;
  }
}

module.exports = getParks;
