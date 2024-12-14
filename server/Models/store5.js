const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({

  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Store5', storeSchema);
