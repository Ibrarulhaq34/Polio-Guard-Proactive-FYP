import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CampaignList1 = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2000/api/all1')
      .then(res => {
        console.log(res.data);
        setCampaigns(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleTaskClick = (campaignId, taskName, currentStatus) => {
    const newStatus = currentStatus === 0 ? 1 : 0;

    axios.put(`http://localhost:2000/api/update-task-status/${campaignId}/${taskName}`)
      .then(res => {
        const updatedCampaign = res.data.campaign;

        setCampaigns(prevCampaigns =>
          prevCampaigns.map(campaign =>
            campaign._id === updatedCampaign._id
              ? { ...updatedCampaign }
              : campaign
          )
        );
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleDeleteCampaign = (campaignId) => {
    axios.delete(`http://localhost:2000/api/delete-campaign/${campaignId}`)
      .then(() => {
        setCampaigns(prevCampaigns =>
          prevCampaigns.filter(campaign => campaign._id !== campaignId)
        );
        alert('Campaign deleted successfully!');
      })
      .catch(err => {
        console.error(err);
        alert('Failed to delete campaign.');
      });
  };

  const generatePDF = (campaign) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Campaign Details', 20, 20);

    // Campaign Info
    doc.setFontSize(12);
    doc.text(`Name: ${campaign.name}`, 20, 30);
    doc.text(`Start Date: ${new Date(campaign.startDate).toLocaleDateString()}`, 20, 40);
    doc.text(`End Date: ${new Date(campaign.endDate).toLocaleDateString()}`, 20, 50);

    // Associated Geofences
    doc.setFontSize(12);
    doc.text('Associated Geofences:', 20, 60);
    let yOffset = 70;
    if (campaign.geofences && campaign.geofences.length > 0) {
      campaign.geofences.forEach((geofence) => {
        doc.text(
          geofence.parentId && geofence.parentId.name
            ? geofence.parentId.name
            : 'Unknown Geofence',
          20,
          yOffset
        );
        yOffset += 10;
      });
    } else {
      doc.text('No Geofences Associated', 20, yOffset);
      yOffset += 10;
    }

    // Tasks (manual way without `jspdf-autotable`)
    const taskData = campaign.tasks.map((task) => [
      task.taskName,
      task.status === 1 ? 'Done' : 'Pending',
    ]);

    // Tasks Heading
    doc.setFontSize(12);
    doc.text('Tasks:', 20, yOffset);
    yOffset += 10;

    taskData.forEach((task) => {
      if (task[1] === 'Done') {
        doc.setTextColor(0, 128, 0); // Green for done
        doc.text(task[0], 20, yOffset);
        doc.line(20, yOffset + 1, 180, yOffset + 1); // Line through the task name
      } else {
        doc.setTextColor(255, 0, 0); // Red for pending
        doc.text(task[0], 20, yOffset);
      }
      yOffset += 10;
    });

    // Save PDF
    doc.save(`${campaign.name}_details.pdf`);
  };

  const styles = {
    container: { padding: '0px' },
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
    campaignList: { listStyleType: 'none', padding: 0 },
    campaignItem: {
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '20px',
    },
    campaignTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' },
    subHeader: { fontSize: '16px', fontWeight: 'bold', margin: '10px 0' },
    taskItem: { cursor: 'pointer', marginBottom: '5px' },
    PDF: {
      backgroundColor: 'rgb(0, 51, 102)',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
      marginRight: '10px',
    },
    deleteButton: {
      backgroundColor: 'rgb(0, 51, 102)',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>All Campaigns</h1>
      </div>

      

      {campaigns.length > 0 ? (
        <ul style={styles.campaignList}>
          {campaigns.map(campaign => {
            const taskStats = campaign.tasks.reduce(
              (acc, task) => {
                if (task.status === 1) acc.done += 1;
                else acc.pending += 1;
                return acc;
              },
              { done: 0, pending: 0 }
            );

            const pieData = {
              labels: ['Done', 'Pending'],
              datasets: [
                {
                  data: [taskStats.done, taskStats.pending],
                  backgroundColor: ['#28a745', '#ffc107'],
                  hoverBackgroundColor: ['#218838', '#e0a800'],
                },
              ],
            };

            // Check if all tasks are done
            const allTasksDone = campaign.tasks.every(task => task.status === 1);

            return (
              <li key={campaign._id} style={styles.campaignItem}>
                <div style={styles.campaignTitle}>{campaign.name}</div>
                <p>Start Date: {new Date(campaign.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(campaign.endDate).toLocaleDateString()}</p>

                <h4 style={styles.subHeader}>Associated Geofences:</h4>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                  {campaign.geofences && campaign.geofences.length > 0 ? (
                    campaign.geofences.map(geofence => (
                      <li key={geofence._id}>
                        {geofence.parentId && geofence.parentId.name
                          ? geofence.parentId.name
                          : 'Unknown Geofence'}
                      </li>
                    ))
                  ) : (
                    <li>No Geofences Associated</li>
                  )}
                </ul>

                <h4 style={styles.subHeader}>Inventory:</h4>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                  {campaign.inventories && campaign.inventories.length > 0 ? (
                    campaign.inventories.map(inv => (
                      <li key={inv.inventoryId?._id} style={styles.inventoryItem}>
                        Inventory Name: {inv.inventoryId?.name || 'Unknown Inventory'} -
                        Available: {inv.inventoryId?.quantity || 'Unknown Quantity'}
                      </li>
                    ))
                  ) : (
                    <li>No Inventory Used</li>
                  )}
                </ul>

                <h4 style={styles.subHeader}>Task Breakdown</h4>
                <div style={{ width: '200px', height: '200px', margin: '0 auto' }}>
                  <Pie data={pieData} />
                </div>

                <h4 style={styles.subHeader}>Tasks</h4>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                  {campaign.tasks.map((task, index) => (
                    <li
                      key={index}
                      style={{
                        ...styles.taskItem,
                        textDecoration: task.status === 1 ? 'line-through' : 'none',
                        color: task.status === 1 ? 'green' : 'red',
                      }}
                      onClick={() => handleTaskClick(campaign._id, task.taskName, task.status)}
                    >
                      {task.taskName}
                    </li>
                  ))}
                </ul>

                <button onClick={() => generatePDF(campaign)} style={styles.PDF}>
                  Generate PDF
                </button>

                {allTasksDone && (
                  <button
                    onClick={() => handleDeleteCampaign(campaign._id)}
                    style={styles.deleteButton}
                  >
                    Delete Campaign
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No campaigns found.</p>
      )}
    </div>
  );
};

export default CampaignList1;