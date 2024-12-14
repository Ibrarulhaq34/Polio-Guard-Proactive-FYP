const mongoose = require('mongoose');




const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  geofences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store3' }],
  inventories: [
    {
      inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
      quantityUsed: { type: Number, required: true }
    }
  ],
  workers: [String],
   
  tasks: [
    {
      taskName: { type: String, required: true },
      status: { type: Number, default: 0 }  
    }
  ]
});

const Campaign = mongoose.model('Campaign1', campaignSchema);
module.exports = Campaign;

