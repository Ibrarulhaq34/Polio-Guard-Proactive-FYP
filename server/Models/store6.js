const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const store3Schema = new Schema({
  
  parentId: {
    type: mongoose.Types.ObjectId,
    ref: 'Store5',
    required: true
  },
  coordinates: {
    type: String, // Adjusted to match the varchar(200) type from MySQL
    required: true
  },
  color: {
    type: String, // Adjusted to match the varchar(45) type from MySQL
    required: false
  }
});

module.exports = mongoose.model('Store6', store3Schema);