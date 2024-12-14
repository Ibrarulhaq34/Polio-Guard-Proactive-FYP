
const express = require('express');
const {
  addName,
  mapInfo,
  addMap,
  getAllMaps,
  getGeoMapinfo,
  updateGeoMap,
  deleteMap,
  getAllCoordinateMaps,
  deleteMapName,
  viewAllMaps,
  createCampaign,
  getAllCampaigns,
  getGeofences,
  updateTaskStatus,
  getWorkers,
  getTeamleads,
  getClientsByGeofence,
  updateTasks,
  createCampaign1,
  getAllCampaigns1,
  deleteCampaign,
} = require('../controllers/mapController');
const router = express.Router();

router.post('/addName', addName);
router.post('/getMapInfo', mapInfo);
router.post('/addMap', addMap);
router.get('/getAllMaps', getAllMaps);
router.post('/allGeoMapInfo', getGeoMapinfo);
router.post('/updateGeoMap', updateGeoMap);
router.delete('/deleteMap/:id', deleteMap);
router.get('/getAllCoordinateMaps', getAllCoordinateMaps);
router.delete('/deleteMapName/:id', deleteMapName);
router.get('/viewAllMaps', viewAllMaps);

router.post('/create', createCampaign);  
router.post('/create1', createCampaign1); 

router.get('/all', getAllCampaigns); 
router.get('/all1', getAllCampaigns1); 

router.get('/geofences', getGeofences); 
router.put('/update-task-status/:campaignId/:taskName', updateTaskStatus);  

router.get('/allW', getWorkers);  

router.get('/allT', getTeamleads); 

router.get('/clients', getClientsByGeofence);

router.put('/update/:id', updateTasks);

router.delete('/delete-campaign/:campaignId', deleteCampaign);





module.exports = router;
