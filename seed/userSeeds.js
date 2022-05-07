const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect('mongodb://localhost:27017/social-network');

const userSeeds = [
    {
        userName:  'Jordan',
        email: 'jordan@email.com'
    },
    {
        userName: 'Sean',
        email: 'sean@email.com'
    },
    {
        userName: 'bob',
        email: 'bob@email.com'
    }
  // objects go here to match User fields
];

 db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userSeeds))
  .then((data) => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });