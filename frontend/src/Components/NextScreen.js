import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NextScreen = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [clients, setClients] = useState([]);
  const [matchedAddresses, setMatchedAddresses] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get('http://localhost:2000/api/all1');
        setCampaigns(res.data);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      }
    };

    const fetchClients = async () => {
      try {
        const res = await axios.get('http://localhost:2000/api/clients');
        setClients(res.data);
      } catch (err) {
        console.error('Error fetching clients:', err);
      }
    };

    fetchCampaigns();
    fetchClients();
  }, []);

  const handleCampaignSelect = (campaign) => {
    setSelectedCampaign(campaign);
    const campaignGeofences = campaign.geofences.map(g => g.parentId.name);
    const matched = clients
      .filter(client => campaignGeofences.includes(client.location))
      .map(client => client.address);
    setMatchedAddresses(matched);
    setFilteredAddresses(matched);
    setSelectedAddresses([]);
    setSelectedArea("");
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    if (area) {
      setFilteredAddresses(
        matchedAddresses.filter(address => {
          const parts = address.split(", ");
          return parts[parts.length - 2] === area;
        })
      );
    } else {
      setFilteredAddresses(matchedAddresses);
    }
  };

  const handleAddressSelect = (address) => {
    if (selectedAddresses.includes(address)) {
      setSelectedAddresses(selectedAddresses.filter(a => a !== address));
    } else {
      setSelectedAddresses([...selectedAddresses, address]);
    }
  };

  const handleUpdateTasks = () => {
    if (!selectedCampaign || selectedAddresses.length === 0) return;

    const newTasks = selectedAddresses.map(address => ({
      taskName: address,
      status: 0,
    }));

    axios.put(`http://localhost:2000/api/update/${selectedCampaign._id}`, {
      selectedAddresses: newTasks,
    })
      .then(() => {
        alert('Tasks updated successfully');
        window.location.reload();
      })
      .catch(err => {
        console.error('Error updating campaign tasks:', err);
      });
  };

  const styles = {
    container: {
      textAlign: 'center',
      padding: '0px',
      width: '100%',
      backgroundColor: '#f8f9fa',
      height: '100vh', // Fullscreen height
    },
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
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f0f8ff',
    },
    button: {
      backgroundColor: 'rgb(0, 51, 102)',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: '16px',
    },
    tableContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
    },
    table: {
      borderCollapse: 'collapse',
      width: '45%',
      backgroundColor: '#f0f8ff',
      border: '2px solid #FF7518',
    },
    th: {
      border: '1px solid #FF7518',
      padding: '8px',
      backgroundColor: 'rgb(0, 51, 102)',
      color: 'white',
    },
    td: {
      border: '1px solid #FF7518',
      padding: '8px',
      cursor: 'pointer',
    },
    selected: {
      backgroundColor: '#ADD8E6',
    },
    alreadyAssigned: {
      color: 'red',
      fontSize: '12px',
      marginTop: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Select Campaign and Client Addresses</h1>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Select Campaign</label>
        <select
          onChange={(e) => handleCampaignSelect(campaigns.find(c => c._id === e.target.value))}
          style={styles.select}
        >
          <option value="">--Select Campaign--</option>
          {campaigns.map(campaign => (
            <option key={campaign._id} value={campaign._id}>
              {campaign.name}
            </option>
          ))}
        </select>
      </div>

      {matchedAddresses.length > 0 && (
        <div style={styles.formGroup}>
          <label style={styles.label}>Filter by Area</label>
          <select
            onChange={(e) => handleAreaSelect(e.target.value)}
            style={styles.select}
          >
            <option value="">--Select Area--</option>
            {[...new Set(matchedAddresses.map(address => {
              const parts = address.split(", ");
              return parts[parts.length - 2];
            }))].map(area => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      )}

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Assigned Tasks</th>
            </tr>
          </thead>
          <tbody>
            {selectedCampaign && selectedCampaign.tasks.map((task, index) => (
              <tr key={index}>
                <td style={styles.td}>{task.taskName}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Available Tasks</th>
            </tr>
          </thead>
          <tbody>
            {filteredAddresses.map((address, index) => {
              const alreadyAssigned = selectedCampaign.tasks.some(task => task.taskName === address);
              if (alreadyAssigned) return null;
              return (
                <tr
                  key={index}
                  style={selectedAddresses.includes(address) ? styles.selected : {}}
                  onClick={() => handleAddressSelect(address)}
                >
                  <td style={styles.td}>{address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedAddresses.length > 0 && (
        <button style={styles.button} onClick={handleUpdateTasks}>
          Update Task with Selected Addresses
        </button>
      )}
    </div>
  );
};

export default NextScreen;
