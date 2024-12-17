

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Home from '../Components/Home';
import CreateCampaign1 from '../Components/CreateCampaign1';
import CampaignList1 from '../Components/CampaignList1';
import CampaignList from '../Components/CampaignList';
import NextScreen from '../Components/NextScreen';
import { FaFlag,FaHome, FaTasks ,FaMapMarkedAlt,FaBell} from 'react-icons/fa';
import Footer from '../Components/Footer';

import ViewAlert from '../Components/ViewAlert';

const TeamLeadPage = () => {
  const location = useLocation();
  const { name: teamLeadName } = location.state || {}; 
  const [matchedRecords, setMatchedRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentScreen, setCurrentScreen] = useState('Home'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/all');
        const data = response.data;
        const matches = data.filter((item) => item.teamLead === teamLeadName);
        setMatchedRecords(matches.length > 0 ? matches : ['No matching team lead found.']);
      } catch (err) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teamLeadName]);

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div style={{ textAlign: 'center', color: 'red' }}>
          <p>{error}</p>
        </div>
      );
    }

    switch (currentScreen) {
      case 'Home': 
        return (
          <div>
           

            <div style={styles.header}>
                  <h1 style={styles.headerText}>Welcome, {teamLeadName}!</h1>
            </div>


            <h2>You are part of this campaign:</h2>
            {matchedRecords.length > 0 && Array.isArray(matchedRecords) ? (
              <ul>
                {matchedRecords.map((record, index) => (
                  <li key={index}>{record.name || record}</li>
                ))}
              </ul>
            ) : (
              <p>{matchedRecords[0]}</p>
            )}
          
          </div>
        );
      case 'CreateCampaign1':
        return <CreateCampaign1 />;
      case 'CampaignList1':
        return <CampaignList1 />;
      case 'CampaignList':
        return <CampaignList />;
      case 'NextScreen':
        return <NextScreen />;
      case 'home':
        return <Home/>;
        case 'ViewAlert':
        return <ViewAlert/>
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarHeader}>Team Lead</h2>



        <button
          style={{
            ...styles.button,
            color: currentScreen === 'Home' ? '#FF7518' : 'white', 
          }}
          onClick={() => setCurrentScreen('Home')}
        > <FaHome style={styles.icon} />
          Home
        </button>
        <button
          style={{
            ...styles.button,
            color: currentScreen === 'home' ? '#FF7518' : 'white', 
          }}
          onClick={() => setCurrentScreen('home')}
        ><FaMapMarkedAlt style={styles.icon} />
          Manage Geofence
        </button>
        <button
          style={{
            ...styles.button,
            color: currentScreen === 'CreateCampaign1' ? '#FF7518' : 'white', 
          }}
          onClick={() => setCurrentScreen('CreateCampaign1')}
        ><FaTasks style={styles.icon} />
          Create Campaign
        </button>
        <button
          style={{
            ...styles.button,
            color: currentScreen === 'CampaignList1' ? '#FF7518' : 'white',
          }}
          onClick={() => setCurrentScreen('CampaignList1')}
        ><FaTasks style={styles.icon} />
          Sub Campaign List 
        </button>
        <button
          style={{
            ...styles.button,
            color: currentScreen === 'CampaignList' ? '#FF7518' : 'white', 
          }}
          onClick={() => setCurrentScreen('CampaignList')}
        ><FaFlag  style={styles.icon} />
          Major Campaign List
        </button>
        <button
          style={{
            ...styles.button,
            color: currentScreen === 'NextScreen' ? '#FF7518' : 'white',
          }}
          onClick={() => setCurrentScreen('NextScreen')}
        >< FaTasks style={styles.icon} />
          Task Assignment 
        </button>
        <button
          style={{
            ...styles.button,
            color: currentScreen === 'ViewAlert' ? '#FF7518' : 'white',
          }}
          onClick={() => setCurrentScreen('ViewAlert')}
        >< FaBell style={styles.icon} />
          View Alert
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>{renderContent()}
      <Footer />
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
  },
  icon: { marginRight: '10px' },
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
  sidebar: {
    width: '300px',
    backgroundColor: 'rgb(0, 51, 102)', 
    color: 'white',
    padding: '20px',
    boxSizing: 'border-box',
  },
  sidebarHeader: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: 'rgb(0, 51, 102)', 
    color: 'white', 
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'left',
    marginBottom: '10px',
    fontSize: '16px',
  },
  mainContent: {
    flexGrow: 1,
    padding: '20px',
    backgroundColor: '#f4f7f9',
  },
};

export default TeamLeadPage;