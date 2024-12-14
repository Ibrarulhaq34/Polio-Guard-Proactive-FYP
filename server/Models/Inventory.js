const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  supplier: {type: String, required: true },
});

module.exports = mongoose.model('Inventory', InventorySchema);
