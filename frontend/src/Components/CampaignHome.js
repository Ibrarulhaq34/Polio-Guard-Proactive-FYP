import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEye } from 'react-icons/fa';

const CampaignHome = () => {
  
  const styles = {
    header: {
      backgroundColor: 'lightblue',
      padding: '20px',
      textAlign: 'center',
      width: '100vw',
      boxSizing: 'border-box',
      marginBottom: '20px',
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '20px',
      marginTop: '20px',
      paddingLeft: '20px',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px 20px',
      backgroundColor: 'rgb(0, 51, 102)', 
      color: 'white', 
      fontFamily: 'Times New Roman, Times, serif', 
      textDecoration: 'none',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      width: '250px',
      height: '50px',
    },
    icon: {
      marginRight: '10px',
    }
  };

  return (
    <div>
      {/* Header section */}
      <header style={styles.header}>
        <h1>Create Campaign</h1>
      </header>

      {/* Button section */}
      <div style={styles.buttonsContainer}>
        <Link to="/create-campaign" style={styles.button}>
          <FaPlus style={styles.icon} />
          Create Campaign
        </Link>
        <Link to="/campaigns" style={styles.button}>
          <FaEye style={styles.icon} />
          View All Campaigns
        </Link>
        <Link to="/nextScreen" style={styles.button}>
          <FaEye style={styles.icon} />
          nextScreen
        </Link>
      </div>
    </div>
  );
};

export default CampaignHome;
