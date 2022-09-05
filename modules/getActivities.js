'use strict';

const axios = require('axios');

let cache = {};

async function getActivities(request, response) {
  let activity = request.data;
  const parkActivities = `https://developer.nps.gov/api/v1/activities?limit=100&api_key=${process.env.NP_API_KEY}`;
  try{
    let key = activity + 'activity list';
    if (cache[key] && (Date.now() - cache[key].timeStamp < 9e+7)) {
      console.log('cache was hit, activities present');
      response.status(200).send(cache[key].data);
    } else {
      console.log('cache missed, no activities present');
      const activityResponse = await axios.get(parkActivities);
      const activitiesArray = activityResponse.data.data.map(activityObject => new Activity(activityObject));

      cache[key] = {
        data: activitiesArray,
        timeStamp: Date.now()
      };
      response.status(200).send(activitiesArray);
    }
  } catch (error) {
    console.loeg('error messis is: ', error);
    response.status(500).send('Server Error');
  }
}

class Activity {
  constructor(activityObject) {
    this.activityName = activityObject.name;
  }
}

module.exports = getActivities;
