const Supplier = require('../Models/Supplier');

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addSupplier = async (req, res) => {
  const { name, contactInfo, performance } = req.body;
  try {
    const newSupplier = new Supplier({ name, contactInfo, performance });
    const supplier = await newSupplier.save();
    res.json(supplier);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { name, contactInfo, performance } = req.body;
    
    try {
      let supplier = await Supplier.findById(id);
      if (!supplier) {
        return res.status(404).json({ msg: 'Supplier not found' });
      }
  
      supplier = await Supplier.findByIdAndUpdate(
        id,
        { $set: { name, contactInfo, performance } },
        { new: true }
      );
  
      res.json(supplier);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
//   exports.deleteSupplier = async (req, res) => {
//     console.log(id);
//     const { id } = req.params;
  
//     try {
//       let supplier = await Supplier.findById(id);
//       if (!supplier) {
//         return res.status(404).json({ msg: 'Supplier not found' });
//       }
  
//       await Supplier.findByIdAndRemove(id);
  
//       res.json({ msg: 'Supplier removed' });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   };


  exports.deleteSupplier = async (req, res) => {
   
    const { id } = req.params;
    console.log(id);
    
    try {
      const result = await Supplier.deleteOne({ _id: id });
  
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
  
