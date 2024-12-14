import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaUsers, FaBoxes } from 'react-icons/fa'; 

const InventoryHome = () => {
  const history = useHistory();

  
  const styles = {
    container: {
      backgroundColor: 'white', 
      height: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start', 
      padding: '20px',
      width: '100vw', 
      boxSizing: 'border-box', 
    },
    header: {
      backgroundColor: '#ADD8E6', 
      color: 'black',
      width: '100vw', 
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box', 
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: '20px', 
      paddingLeft: '20px', 
    },
    button: {
      backgroundColor: '#007bff', 
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '10px 0',
      display: 'flex', 
      alignItems: 'center',
      width: '250px', 
      height: '50px', 
      justifyContent: 'flex-start', 
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3', 
    },
    icon: {
      width: '20px', 
      height: '20px', 
      borderRadius: '50%', 
      marginRight: '10px', 
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Inventory Management System</h1>
      </header>
      <div style={styles.buttonContainer}>
        <button 
          style={styles.button} 
          onClick={() => history.push('/postForm')}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          <FaUsers style={styles.icon} /> {/* Supplier icon */}
          Post Form
        </button>
        <button 
          style={styles.button} 
          onClick={() => history.push('/postList')}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          <FaBoxes style={styles.icon} /> {/* Inventory icon */}
          View Post
        </button>
      </div>
    </div>
  );
};

export default InventoryHome;
