const Inventory = require('../Models/Inventory');

exports.getInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find().populate('supplier');
    res.json(inventories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addInventory = async (req, res) => {
  const { name, quantity, status, expirationDate, supplier } = req.body;
  try {
    const newInventory = new Inventory({ name, quantity, status, expirationDate, supplier });
    const inventory = await newInventory.save();
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateInventory = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, status, expirationDate, supplier } = req.body;
    
    try {
      let inventory = await Inventory.findById(id);
      if (!inventory) {
        return res.status(404).json({ msg: 'Inventory not found' });
      }
  
      inventory = await Inventory.findByIdAndUpdate(
        id,
        { $set: { name, quantity, status, expirationDate, supplier } },
        { new: true }
      );
  
      res.json(inventory);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  


  exports.deleteInventory = async (req, res) => {
   
    const { id } = req.params;
    console.log(id);

    try {
      const result = await Inventory.deleteOne({ _id: id });
  
      if (result.deletedCount > 0) {
        res.status(200).json({ msg: 'Deleted successfully' });
      } else {
        res.status(400).json({ msg: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: 'Internal server error' });
    }
  };
