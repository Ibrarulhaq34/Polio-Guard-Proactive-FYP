const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    workerName: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    
 
});

module.exports = mongoose.model('Alerts', AlertSchema);
