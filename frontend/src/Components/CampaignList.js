import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:2000/api/all')
      .then((res) => {
        console.log(res.data);
        setCampaigns(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const generatePDF = (campaign) => {
    const doc = new jsPDF();

  
    doc.setFontSize(18);
    doc.text('Campaign Details', 20, 20);

    
    doc.setFontSize(12);
    doc.text(`Name: ${campaign.name}`, 20, 30);
    doc.text(`Start Date: ${new Date(campaign.startDate).toLocaleDateString()}`, 20, 40);
    doc.text(`End Date: ${new Date(campaign.endDate).toLocaleDateString()}`, 20, 50);

   
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

    
  

   
    doc.save(`${campaign.name}_details.pdf`);
  };

  const styles = {
    container: {
      textAlign: 'center',
      padding: '0px',
      backgroundColor: '#f8f9fa',
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
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    headerText: {
      fontSize: '22px',
      margin: 0,
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '20px',
    },
    campaignItem: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    campaignTitle: {
      fontWeight: 'bold',
      fontSize: '22px',
      marginBottom: '10px',
    },
    button: {
      backgroundColor: 'rgb(0, 51, 102)',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>All Campaigns</h1>
      </div>

      {campaigns.length > 0 ? (
        <div style={styles.gridContainer}>
          {campaigns.map((campaign) => (
            <div key={campaign._id} style={styles.campaignItem}>
              <div style={styles.campaignTitle}>{campaign.name}</div>
              <p>Start Date: {new Date(campaign.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(campaign.endDate).toLocaleDateString()}</p>

              {/* Associated Geofences */}
              <h4>Associated Geofences:</h4>
              <ul style={{ listStyleType: 'none', padding: '0' }}>
                {campaign.geofences && campaign.geofences.length > 0 ? (
                  campaign.geofences.map((geofence) => (
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

              <button
                onClick={() => generatePDF(campaign)}
                style={styles.button}
              >
                Generate PDF
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No campaigns found.</p>
      )}
    </div>
  );
};

export default CampaignList;
