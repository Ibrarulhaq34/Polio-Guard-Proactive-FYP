import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

const CreateCampaign1 = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [geofences, setGeofences] = useState([]);
  const [selectedGeofences, setSelectedGeofences] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [selectedInventories, setSelectedInventories] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const location = useLocation();
  const history = useHistory();

  const { name: teamLead } = location.state || {};

  useEffect(() => {
    axios
      .get("http://localhost:2000/api/geofences")
      .then((res) => setGeofences(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:2000/api/inventory")
      .then((res) =>
        setInventories(res.data.filter((item) => item.quantity > 0))
      )
      .catch((err) => console.error(err));

    if (teamLead) {
      axios
        .get("http://localhost:2000/api/all")
        .then((res) => {
          const matchedTeamLead = res.data.find(
            (lead) => lead.teamLead === teamLead
          );
          if (matchedTeamLead) {
            setWorkers(matchedTeamLead.workers);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [teamLead]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(startDate) >= new Date(endDate)) {
      alert("Start Date must be earlier than End Date.");
      return;
    }

    const campaignData = {
      name,
      startDate,
      endDate,
      geofences: selectedGeofences,
      inventories: selectedInventories.map((inv) => ({
        inventoryId: inv.inventoryId,
        quantityUsed: inv.quantityUsed,
      })),
      workers: selectedWorkers,
      teamLead,
    };

    axios
      .post("http://localhost:2000/api/create1", campaignData)
      .then(() => {
        alert("Campaign created successfully");
      })
      .catch((err) => console.error(err));
  };

  const handleInventoryChange = (inventoryId, quantity) => {
    const inventory = inventories.find((inv) => inv._id === inventoryId);
    const usagePercentage = (quantity / inventory.quantity) * 100;

    if (usagePercentage > 70) {
      alert(`Warning: You are using more than 70% of ${inventory.name}.`);
    }

    setSelectedInventories((prev) => {
      const existing = prev.find((item) => item.inventoryId === inventoryId);
      if (existing) {
        return prev.map((item) =>
          item.inventoryId === inventoryId
            ? { ...item, quantityUsed: quantity }
            : item
        );
      }
      return [...prev, { inventoryId, quantityUsed: quantity }];
    });
  };

  const handleGeofenceSelect = (e) => {
    const value = e.target.value;
    setSelectedGeofences((prev) =>
      prev.includes(value)
        ? prev.filter((id) => id !== value)
        : [...prev, value]
    );
  };

  const handleWorkerSelect = (e) => {
    const value = e.target.value;
    setSelectedWorkers((prev) =>
      prev.includes(value)
        ? prev.filter((worker) => worker !== value)
        : [...prev, value]
    );
  };

  const styles = {
    container: { padding: "0px", backgroundColor: "#f8f9fa" },
    header: {
      backgroundColor: 'rgb(0, 51, 102)',
      color: 'white',
      padding: '15px 20px', // Added padding for spacing
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
    formGroup: { marginBottom: "15px" },
    label: {
      fontWeight: "bold",
      marginBottom: "5px",
      display: "block",
      textAlign: "left",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "0",
    },
    checkboxContainer: { display: "flex", alignItems: "center" },
    inventoryRow: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    inventoryInput: { marginLeft: "10px", width: "80px", padding: "5px" },
    button: {
      backgroundColor: "rgb(0, 51, 102)",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
      <div style={styles.header}>
              <h1 style={styles.headerText}>Create Campaign</h1>
            </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Campaign Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Select Geofences</label>
          {geofences.map((geofence) => (
            <div key={geofence._id} style={styles.checkboxContainer}>
              <input
                type="checkbox"
                value={geofence._id}
                onChange={handleGeofenceSelect}
              />
              {geofence.parentId.name}
            </div>
          ))}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Select Inventories</label>
          {inventories.map((inventory) => (
            <div key={inventory._id} style={styles.inventoryRow}>
              <label>{inventory.name} (Available: {inventory.quantity})</label>
              <input
                type="number"
                min="1"
                max={inventory.quantity}
                onChange={(e) =>
                  handleInventoryChange(inventory._id, Number(e.target.value))
                }
                style={styles.inventoryInput}
              />
            </div>
          ))}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Select Workers</label>
          {workers.map((worker) => (
            <div key={worker} style={styles.checkboxContainer}>
              <input
                type="checkbox"
                value={worker}
                onChange={handleWorkerSelect}
              />
              {worker}
            </div>
          ))}
        </div>
        <button type="submit" style={styles.button}>
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign1;
