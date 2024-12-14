const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const store3Schema = new Schema({
  
  parentId: {
    type: mongoose.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  coordinates: {
    type: String, 
    required: true
  },
  color: {
    type: String, 
    required: false
  }
});

module.exports = mongoose.model('Store3', store3Schema);