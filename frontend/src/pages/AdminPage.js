import React, { useEffect, useState  } from 'react';
import Home from '../Components/Home';
import InventoryHome from '../Components/Inventory';
import SupplierHome from '../Components/Supplier';
import CampaignHome from '../Components/CampaignHome';
import CreateCampaign from '../Components/CreateCampaign';
import CampaignList from '../Components/CampaignList';
import NextScreen from '../Components/NextScreen';
import PolioCasesChart from '../Components/PolioCasesChart';
import CaptureImage from '../assets/Capture1.PNG';
import CaptureImage1 from '../assets/Capture.PNG';
import PostList from '../Components/PostList';
import PolioHeatMap from '../Components/PolioHeatMap';
import Footer from '../Components/Footer';
import ViewAdverseReport from '../Components/ViewAdverseReport';


import { FaGlobeAmericas, FaFileAlt,FaRegEdit,FaHome,FaMapMarkedAlt, FaTasks, FaWarehouse, FaChartLine} from 'react-icons/fa';

import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useHistory } from 'react-router-dom';

const AdminPage = () => {
  const [activePage, setActivePage] = useState(null);
  const [showInventoryOptions, setShowInventoryOptions] = useState(false);
  const [showCampaignOptions, setShowCampaignOptions] = useState(false);
  //

  const history = useHistory();
  const [sindhData, setSindhData] = useState(null);
  const [balochistanData, setBalochistanData] = useState(null);
  const [kpData, setKpData] = useState(null);
  const [punjabData, setPunjabData] = useState(null);
  const [forecastData, setForecastData] = useState(null);  // State to hold the forecasted data
  useEffect(() => {
    // Fetch historical data
    fetch('http://localhost:2000/api/data')  // Replace with your backend URL
      .then(response => response.json())
      .then(data => {
        const processProvinceData = (province) => {
          const provinceData = data.filter(entry => entry.Province === province);
          provinceData.sort((a, b) => a.Year - b.Year);

          const years = provinceData.map(entry => entry.Year);
          const cases = provinceData.map(entry => parseInt(entry['Total Cases'], 10));

          return {
            labels: years,
            datasets: [{
              label: `Polio Cases in ${province}`,
              data: cases,
              borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
              fill: false,
            }],
          };
        };

        setSindhData(processProvinceData('Sindh'));
        setBalochistanData(processProvinceData('Balochistan'));
        setKpData(processProvinceData('Khyber Pakhtunkhwa'));
        setPunjabData(processProvinceData('Punjab'));
      })
      .catch(error => console.error('Error fetching data:', error));

    // Fetch forecast data for 2025
    fetch('http://localhost:2000/predict')  
      .then(response => response.json())
      .then(forecast => {
        setForecastData(forecast);  
      })
      .catch(error => console.error('Error fetching forecast data:', error));
  }, []);

  
  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'createCampaign':
        return <CreateCampaign />;
      case 'campaignList':
        return <CampaignList />;
      case 'nextScreen':
        return <NextScreen />;
      case 'inventory':
        return <InventoryHome />;
      case 'supplier':
        return <SupplierHome />;
      case 'prediction':
        return <PolioCasesChart />;
      case 'post':
        return <PostList />;
      case 'polioHeatMap':
        return <PolioHeatMap />;
      case 'viewAdverseReport':
        return <ViewAdverseReport/>;
      case 'goHome':
        return (
          <div style={styles.defaultContent}>
            <div style={styles.header}>
              <h1 style={styles.headerText}>Welcome Admin</h1>
            </div>
            <div style={styles.imageContainer}>
              <img src={CaptureImage1} alt="Polio Guard Logo" style={styles.mainImage1} />
            </div>
            <div style={styles.textContent}>
              <p>
              Polio, also known as poliomyelitis, has been recognized for thousands of years, with evidence of its impact dating back to ancient Egypt. The disease became more prominent in the 19th and 20th centuries, causing widespread fear as it led to paralysis and death, particularly among children. In the early 1900s, the poliovirus was identified, and researchers began studying ways to prevent the disease.

The breakthrough came in 1952 when Dr. Jonas Salk developed the inactivated polio vaccine (IPV), followed by the oral polio vaccine (OPV) by Albert Sabin in the 1960s. These vaccines became instrumental in reducing polio cases worldwide. In 1988, the World Health Organization (WHO) launched the Global Polio Eradication Initiative (GPEI), which significantly reduced polio cases. However, the disease is still present in a few regions, especially in Afghanistan and Pakistan, where vaccination efforts continue to face challenges.
              </p>
             
            </div>
            <div style={styles1.container}>
      <header style={styles1.header}>
        <h2>Polio Cases by Province (by Year)</h2>
      </header>
     
      
      <div style={styles1.graphContainer}>
        <div style={styles1.graph}>
          <h3>Sindh</h3>
          {sindhData ? <Line data={sindhData} /> : <p>Loading Sindh chart...</p>}
        </div>

        <div style={styles1.graph}>
          <h3>Balochistan</h3>
          {balochistanData ? <Line data={balochistanData} /> : <p>Loading Balochistan chart...</p>}
        </div>
      </div>

      <div style={styles1.graphContainer}>
        <div style={styles1.graph}>
          <h3>Khyber Pakhtunkhwa</h3>
          {kpData ? <Line data={kpData} /> : <p>Loading Khyber Pakhtunkhwa chart...</p>}
        </div>

        <div style={styles1.graph}>
          <h3>Punjab</h3>
          {punjabData ? <Line data={punjabData} /> : <p>Loading Punjab chart...</p>}
        </div>
      </div>

      {/* Forecast Section */}
      
    </div>
          </div>
          //
          
        );
      default:
        return (
          <div style={styles.defaultContent}>
            <div style={styles.header}>
              <h1 style={styles.headerText}>Welcome</h1>
            </div>
            <div style={styles.imageContainer}>
              <img src={CaptureImage1} alt="Polio Guard Logo" style={styles.mainImage1} />
            </div>
            <div style={styles.textContent}>
              <p>
              Polio, also known as poliomyelitis, has been recognized for thousands of years, with evidence of its impact dating back to ancient Egypt. The disease became more prominent in the 19th and 20th centuries, causing widespread fear as it led to paralysis and death, particularly among children. In the early 1900s, the poliovirus was identified, and researchers began studying ways to prevent the disease.

The breakthrough came in 1952 when Dr. Jonas Salk developed the inactivated polio vaccine (IPV), followed by the oral polio vaccine (OPV) by Albert Sabin in the 1960s. These vaccines became instrumental in reducing polio cases worldwide. In 1988, the World Health Organization (WHO) launched the Global Polio Eradication Initiative (GPEI), which significantly reduced polio cases. However, the disease is still present in a few regions, especially in Afghanistan and Pakistan, where vaccination efforts continue to face challenges.
              </p>
             
            </div>
            <div style={styles1.container}>
      <header style={styles1.header}>
        <h2>Polio Cases by Province (by Year)</h2>
      </header>
     
      
      <div style={styles1.graphContainer}>
        <div style={styles1.graph}>
          <h3>Sindh</h3>
          {sindhData ? <Line data={sindhData} /> : <p>Loading Sindh chart...</p>}
        </div>

        <div style={styles1.graph}>
          <h3>Balochistan</h3>
          {balochistanData ? <Line data={balochistanData} /> : <p>Loading Balochistan chart...</p>}
        </div>
      </div>

      <div style={styles1.graphContainer}>
        <div style={styles1.graph}>
          <h3>Khyber Pakhtunkhwa</h3>
          {kpData ? <Line data={kpData} /> : <p>Loading Khyber Pakhtunkhwa chart...</p>}
        </div>

        <div style={styles1.graph}>
          <h3>Punjab</h3>
          {punjabData ? <Line data={punjabData} /> : <p>Loading Punjab chart...</p>}
        </div>
      </div>

      {/* Forecast Section */}
      
    </div>
          </div>
          //
          
        );
    }
  
    
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <img src={CaptureImage} alt="Polio Guard Proactive Logo" style={styles.logo} />
          <h2 style={styles.logoText}>Polio Guard Proactive</h2>
        </div>

        <ButtonWithHover 
          onClick={() => setActivePage('goHome')} 
          isActive={activePage === 'goHome'}
        >
          <FaHome style={styles.icon} /> Home
        </ButtonWithHover>
        <ButtonWithHover 
          onClick={() => setActivePage('home')} 
          isActive={activePage === 'home'}
        >
          <FaMapMarkedAlt style={styles.icon} /> Manage Geofence
        </ButtonWithHover>

        <ButtonWithHover 
          onClick={() => setShowCampaignOptions(!showCampaignOptions)} 
          isActive={showCampaignOptions}
        >
          <FaTasks style={styles.icon} /> Manage Campaign
        </ButtonWithHover>

        {showCampaignOptions && (
          <div style={styles.nestedButtons}>
            <ButtonWithHover 
              onClick={() => setActivePage('createCampaign')}
              isActive={activePage === 'createCampaign'}
              isNested={true}
            >
              Create New Campaign
            </ButtonWithHover>
            <ButtonWithHover 
              onClick={() => setActivePage('campaignList')}
              isActive={activePage === 'campaignList'}
              isNested={true}
            >
              Campaign List
            </ButtonWithHover>
            
          </div>
        )}

        <ButtonWithHover 
          onClick={() => setShowInventoryOptions(!showInventoryOptions)} 
          isActive={showInventoryOptions}
        >
          <FaWarehouse style={styles.icon} />Supply Chain
        </ButtonWithHover>

        {showInventoryOptions && (
          <div style={styles.nestedButtons}>
            <ButtonWithHover 
              onClick={() => setActivePage('inventory')}
              isActive={activePage === 'inventory'}
              isNested={true}
            >
              Inventory
            </ButtonWithHover>
            <ButtonWithHover 
              onClick={() => setActivePage('supplier')}
              isActive={activePage === 'supplier'}
              isNested={true}
            >
              Supplier
            </ButtonWithHover>
          </div>
        )}

        <ButtonWithHover 
          onClick={() => setActivePage('prediction')} 
          isActive={activePage === 'prediction'}
        >
          <FaChartLine style={styles.icon} /> Prediction
        </ButtonWithHover>

        <ButtonWithHover 
          onClick={() => setActivePage('post')} 
          isActive={activePage === 'post'}
        >
          <FaRegEdit style={styles.icon} /> Post
        </ButtonWithHover>

        <ButtonWithHover 
          onClick={() => setActivePage('polioHeatMap')} 
          isActive={activePage === 'polioHeatMap'}
        >
          <FaGlobeAmericas  style={styles.icon} /> View Heat Map
        </ButtonWithHover>

        <ButtonWithHover 
          onClick={() => setActivePage('viewAdverseReport')} 
          isActive={activePage === 'viewAdverseReport'}
        >
          <FaFileAlt style={styles.icon} /> View Adverse Reports
        </ButtonWithHover>
      </div>

      <div style={styles.mainContent}>
        {renderContent()}
        <Footer />
      </div>
    </div>
  );
};

export default AdminPage;

const styles = {
  container: { display: 'flex', minHeight: '100vh' },
  sidebar: {
    width: '320px', 
    backgroundColor: 'rgb(0, 51, 102)',
    padding: '20px',
    color: 'white',
    position: 'sticky',
    top: 0,
    height: '100vh',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logo: { width: '50px', marginRight: '10px' }, 
  logoText: { fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap' },
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
  mainContent: {
    flexGrow: 1,
    padding: '20px',
    backgroundColor: '#f4f7f9',
    overflowY: 'auto',
  },
  imageContainer: { textAlign: 'center', margin: '20px 0' },
  mainImage: { maxWidth: '100%', height: 'auto' },
  mainImage1: { maxWidth: '100%', height: 'auto' },
  textContent: { fontSize: '16px', 
    lineHeight: '1.6', 
    marginTop: '20px', 
    textAlign: 'justify'},
  nestedButtons: {
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px', 
  },
  buttonActive: {
    color: '#FF7518',
    fontWeight: 'bold',
  },
  buttonNested: {
    marginLeft: '20px',
  },
};

const ButtonWithHover = ({ children, onClick, isActive, isNested }) => (
  <button
    style={{
      ...styles.button,
      ...(isActive && styles.buttonActive),
      ...(isNested && styles.buttonNested),
    }}
    onClick={onClick}
    onMouseEnter={(e) => (e.target.style.color = '#FF7518')}
    onMouseLeave={(e) => (e.target.style.color = isActive ? '#FF7518' : 'white')}
  >
    {children}
  </button>
);

const styles1 = {
  container: {
    padding: '20px',
    maxWidth: '100%', 
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
     
    padding: '10px',
    textAlign: 'left',
    fontSize: '24px',
    color: 'black',
    borderRadius: '5px',
    width: '100%', 
    boxSizing: 'border-box', 
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#ADD8E6',
    color: 'black',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '16px',
    width: '100%', 
    boxSizing: 'border-box',
  },
  graphContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px', 
    width: '100%',
  },
  graph: {
    flex: '1',
    minWidth: '300px', 
    backgroundColor: '#f0f8ff',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  forecastContainer: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#fff8dc', 
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  forecastHeader: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  forecastList: {
    listStyleType: 'none',
    padding: 0,
  },
  forecastItem: {
    fontSize: '16px',
    marginBottom: '5px',
  },
};



