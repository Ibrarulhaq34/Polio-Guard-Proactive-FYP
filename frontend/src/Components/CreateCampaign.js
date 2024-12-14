import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateCampaign = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [geofences, setGeofences] = useState([]);
  const [selectedGeofences, setSelectedGeofences] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [selectedInventories, setSelectedInventories] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [selectedTeamLead, setSelectedTeamLead] = useState('');
  const [clients, setClients] = useState([]);
  const [selectedClientAddresses, setSelectedClientAddresses] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:2000/api/geofences')
      .then(res => setGeofences(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:2000/api/inventory')
      .then(res => setInventories(res.data.filter(item => item.quantity > 0)))
      .catch(err => console.error(err));

    axios.get('http://localhost:2000/api/allW')
      .then(res => setWorkers(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:2000/api/allT')
      .then(res => setTeamLeads(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      alert('Start Date must be earlier than End Date.');
      return;
    }

    const campaignData = {
      name,
      startDate,
      endDate,
      geofences: selectedGeofences,
      inventories: selectedInventories.map(inv => ({
        inventoryId: inv.inventoryId,
        quantityUsed: inv.quantityUsed,
      })),
      workers: selectedWorkers,
      teamLead: selectedTeamLead,
      tasks: selectedClientAddresses.map(address => ({
        taskName: address,
        status: 0,
      })),
    };

    axios.post('http://localhost:2000/api/create', campaignData)
      .then(() => {
        alert('Campaign created successfully');
        
      })
      .catch(err => console.error(err));
  };

  const handleInventoryChange = (inventoryId, quantity) => {
    const inventory = inventories.find(inv => inv._id === inventoryId);
    const usagePercentage = (quantity / inventory.quantity) * 100;

    if (usagePercentage > 70) {
      alert(`Warning: You are using more than 70% of ${inventory.name}.`);
    }

    setSelectedInventories(prev => {
      const existing = prev.find(item => item.inventoryId === inventoryId);
      if (existing) {
        return prev.map(item =>
          item.inventoryId === inventoryId ? { ...item, quantityUsed: quantity } : item
        );
      }
      return [...prev, { inventoryId, quantityUsed: quantity }];
    });
  };

  const handleGeofenceSelect = (e) => {
    const value = e.target.value;
    if (selectedGeofences.includes(value)) {
      setSelectedGeofences(selectedGeofences.filter(id => id !== value));
    } else {
      setSelectedGeofences([...selectedGeofences, value]);
    }
  };

  const handleWorkerSelect = (e) => {
    const value = e.target.value;
    if (selectedWorkers.includes(value)) {
      setSelectedWorkers(selectedWorkers.filter(worker => worker !== value));
    } else {
      setSelectedWorkers([...selectedWorkers, value]);
    }
  };

  const styles = {
    container: { padding: '0px', backgroundColor: '#f8f9fa' },
    header: {
      backgroundColor: 'rgb(0, 51, 102)',
      color: 'white',
      padding: '15px 20px', 
      textAlign: 'center',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    headerText: { fontSize: '22px', margin: 0 },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', fontWeight: 'bold', marginBottom: '5px', textAlign: 'left' },
    input: { width: '100%', padding: '10px', borderRadius: '0px', border: '1px solid #ccc' },
    select: { width: '100%', padding: '10px', borderRadius: '0px', border: '1px solid #ccc' },
    checkboxContainer: { display: 'flex', alignItems: 'center', marginBottom: '10px' },
    checkbox: { marginRight: '10px' },
    button: { backgroundColor: 'rgb(0, 51, 102)', color: 'white', padding: '10px 20px', borderRadius: '5px' },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
              <h1 style={styles.headerText}>Create New Campaign</h1>
            </div>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Campaign Name</label>
          
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Select Geofences</label>
          {geofences.map(geofence => (
            <div key={geofence._id} style={styles.checkboxContainer}>
              <input type="checkbox" value={geofence._id} onChange={handleGeofenceSelect} style={styles.checkbox} />
              {geofence.parentId.name}
            </div>
          ))}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Select Workers</label>
          {workers.map(worker => (
            <div key={worker._id} style={styles.checkboxContainer}>
              <input type="checkbox" value={worker.name} onChange={handleWorkerSelect} style={styles.checkbox} />
              {worker.name}
            </div>
          ))}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Select Team Lead</label>
          <select value={selectedTeamLead} onChange={(e) => setSelectedTeamLead(e.target.value)} required style={styles.select}>
            <option value="">--Select Team Lead--</option>
            {teamLeads.map(lead => (
              <option key={lead._id} value={lead.name}>{lead.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" style={styles.button}>Create Campaign</button>
      </form>
    </div>
  );
};

export default CreateCampaign;
