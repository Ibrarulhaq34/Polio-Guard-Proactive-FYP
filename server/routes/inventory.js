
const express = require('express');
const router = express.Router();
const { addInventory, updateInventory, deleteInventory, getInventories } = require('../controllers/inventoryController');

router.get('/inventory', getInventories);
router.post('/inventory',  addInventory);
router.put('/inventory/:id',  updateInventory);
router.delete('/inventory/:id',  deleteInventory);

module.exports = router;

