const mongoose = require('mongoose');

const ClientpostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  content: { type: String, required: true },
 
});

module.exports = mongoose.model('Clientpost', ClientpostSchema);
