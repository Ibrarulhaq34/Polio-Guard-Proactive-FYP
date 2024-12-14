const express = require('express');
const router = express.Router();
const { addSupplier, updateSupplier, deleteSupplier, getSuppliers } = require('../controllers/supplierController');


router.get('/supplier', getSuppliers);
router.post('/supplier', addSupplier);
router.put('/supplier/:id', updateSupplier);
router.delete('/supplier/:id', deleteSupplier);

module.exports = router;
