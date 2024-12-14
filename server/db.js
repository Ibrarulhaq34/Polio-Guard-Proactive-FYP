


const mongoose = require('mongoose');
require('dotenv').config(); 

const uri = process.env.MONGODB_URI; 

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));

const db = mongoose.connection;

module.exports = db;




