const Store = require('../Models/store');
const Store3 = require('../Models/store3');

const Campaign = require('../Models/Campaign');
const Campaign1 = require('../Models/Campaign1');

const Inventory = require('../Models/Inventory');

const Worker = require('../Models/Worker');
const Teamlead = require('../Models/TeamLead');
const Client = require('../Models/Client');


module.exports.addName = async (req, res) => {
  const { name } = req.body;

  try {
    const existingStore = await Store.findOne({ name });

    if (existingStore) {
      return res.status(422).json({ msg: 'This place is already added in the list!' });
    }

    const newStore = new Store({ name });
    await newStore.save();
    res.status(200).json({ msg: 'Added place successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.mapInfo = async (req, res) => {
  const { name } = req.body;

  try {
    const store = await Store.findOne({ name });

    if (store) {
      res.status(200).json(store);
    } else {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.addMap = async (req, res) => {
  const { parentId, coordinates, color } = req.body;
  //const parentId2 = parseInt(parentId);

  //const parentId2 = parentId.toString();
  try {
    console.log(parentId);
    const newMap = new Store3({ parentId, coordinates, color });
    await newMap.save();
    res.status(200).json({ msg: 'Polygon added successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.getAllMaps = async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.getGeoMapinfo = async (req, res) => {
  const { parentId } = req.body;

  try {
    const store3 = await Store3.find({ parentId });

    if (store3.length > 0) {
      res.status(200).json(store3);
    } else {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};





module.exports.updateGeoMap = async (req, res) => {
  const { parentId, coordinates, color } = req.body;

  console.log("Received parentId:", parentId);
  console.log("Received coordinates:", coordinates);
  console.log("Received color:", color);

  try {
    const result = await Store3.updateOne(
      { parentId },
      { $set: { coordinates, color } }
    );

    if (result.nModified > 0) {
      res.status(200).json({ msg: 'Updated' });
    } else {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.deleteMap = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Store3.deleteOne({ parentId: id });

    if (result.deletedCount > 0) {
      res.status(200).json({ msg: 'Deleted Map successfully' });
    } else {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.deleteMapName = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Store.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.status(200).json({ msg: 'Deleted Map successfully' });
    } else {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.getAllCoordinateMaps = async (req, res) => {
  try {
    const stores2 = await Store3.find();
    res.status(200).json(stores2);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.viewAllMaps = async (req, res) => {
  try {
    const stores2 = await Store3.find({}, 'coordinates color');
    res.status(200).json(stores2);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};


exports.createCampaign = async (req, res) => {
  try {
    const { name, startDate, endDate, geofences, inventories, workers, teamLead } = req.body;
    console.log(teamLead);

    for (const inv of inventories) {
      const inventory = await Inventory.findById(inv.inventoryId);
      if (!inventory) {
        return res.status(404).json({ message: `Inventory not found: ${inv.inventoryId}` });
      }

      if (inv.quantityUsed > inventory.quantity) {
        return res.status(400).json({ message: `Insufficient quantity for inventory: ${inventory.name}` });
      }

      inventory.quantity -= inv.quantityUsed;
      await inventory.save();
    }


    const clients = await Client.find({ geofence: { $in: geofences } });


    const tasks = clients.map(client => ({
      taskName: client.address,
      status: 0
    }));


    const newCampaign = new Campaign({
      name,
      startDate,
      endDate,
      geofences,
      inventories,
      workers,
      teamLead,
      tasks
    });

    await newCampaign.save();
    res.status(200).json({ message: 'Campaign created successfully', campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate({
        path: 'geofences',
        populate: {
          path: 'parentId',
          model: 'Store',
          select: 'name'
        }
      })
      .populate('inventories.inventoryId', 'name quantity')
      .select('name startDate endDate workers teamLead tasks');

    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};




module.exports.getGeofences = async (req, res) => {
  try {
    const geofences = await Store3.find().populate('parentId');
    res.status(200).json(geofences);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { campaignId, taskName } = req.params;


    let campaign = await Campaign.findById(campaignId);
    let campaign1 = await Campaign1.findById(campaignId);

    if (!campaign && !campaign1) {
      return res.status(404).json({ message: 'Campaign not found in both collections' });
    }


    if (campaign) {
      const task = campaign.tasks.find(t => t.taskName === taskName);
      if (!task) {
        return res.status(404).json({ message: 'Task not found in Campaign' });
      }


      task.status = task.status === 0 ? 1 : 0;
      await campaign.save();
      return res.status(200).json({ message: 'Task updated successfully in Campaign', campaign });
    }


    if (campaign1) {
      const task = campaign1.tasks.find(t => t.taskName === taskName);
      if (!task) {
        return res.status(404).json({ message: 'Task not found in Campaign1' });
      }


      task.status = task.status === 0 ? 1 : 0;
      await campaign1.save();
      return res.status(200).json({ message: 'Task updated successfully in Campaign1', campaign: campaign1 });
    }

  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

////

exports.getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getTeamleads = async (req, res) => {
  try {
    const teamleads = await Teamlead.find();
    res.status(200).json(teamleads);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getClientsByGeofence = async (req, res) => {
  try {
    const workers = await Client.find();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }

};



exports.updateTasks = async (req, res) => {
  try {
    const campaignId = req.params.id;
    const { selectedAddresses } = req.body;

    console.log(campaignId);
    console.log(selectedAddresses);

    let campaign = await Campaign.findById(campaignId);
    let campaign1 = await Campaign1.findById(campaignId);

    if (!campaign && !campaign1) {
      return res.status(404).json({ message: 'Campaign not found in both collections' });
    }


    if (campaign) {
      campaign.tasks = [...campaign.tasks, ...selectedAddresses];
      await campaign.save();
    } else if (campaign1) {
      campaign1.tasks = [...campaign1.tasks, ...selectedAddresses];
      await campaign1.save();
    }

    res.status(200).json({
      message: 'Tasks updated successfully',
      updatedCampaign: campaign || campaign1
    });
  } catch (error) {
    console.error('Error updating tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.createCampaign1 = async (req, res) => {
  try {
    const { name, startDate, endDate, geofences, inventories, workers } = req.body;


    for (const inv of inventories) {
      const inventory = await Inventory.findById(inv.inventoryId);
      if (!inventory) {
        return res.status(404).json({ message: `Inventory not found: ${inv.inventoryId}` });
      }

      if (inv.quantityUsed > inventory.quantity) {
        return res.status(400).json({ message: `Insufficient quantity for inventory: ${inventory.name}` });
      }

      inventory.quantity -= inv.quantityUsed;
      await inventory.save();
    }


    const clients = await Client.find({ geofence: { $in: geofences } });


    const tasks = clients.map(client => ({
      taskName: client.address,
      status: 0
    }));


    const newCampaign = new Campaign1({
      name,
      startDate,
      endDate,
      geofences,
      inventories,
      workers,

      tasks
    });

    await newCampaign.save();
    res.status(200).json({ message: 'Campaign created successfully', campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports.getAllCampaigns1 = async (req, res) => {
  try {
    const campaigns = await Campaign1.find()
      .populate({
        path: 'geofences',
        populate: {
          path: 'parentId',
          model: 'Store',
          select: 'name'
        }
      })
      .populate('inventories.inventoryId', 'name quantity')
      .select('name startDate endDate workers tasks');

    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteCampaign = async (req, res) => {
  const { campaignId } = req.params;
  console.log(campaignId);
  try {
    const campaign = await Campaign1.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }


    const allTasksDone = campaign.tasks.every(task => task.status === 1);
    if (!allTasksDone) {
      return res.status(400).json({ error: 'Not all tasks are completed' });
    }

    await Campaign.findByIdAndDelete(campaignId);
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
};






