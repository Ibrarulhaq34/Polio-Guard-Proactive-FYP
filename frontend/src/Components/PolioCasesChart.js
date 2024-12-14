import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useHistory } from 'react-router-dom';

const PolioCasesChart = () => {
  const history = useHistory();
  const [sindhData, setSindhData] = useState(null);
  const [balochistanData, setBalochistanData] = useState(null);
  const [kpData, setKpData] = useState(null);
  const [punjabData, setPunjabData] = useState(null);
  const [forecastData, setForecastData] = useState(null);  

  const viewHeatMap = () => {
    history.push('/PolioHeatMap'); 
  };

  useEffect(() => {
    
    fetch('http://localhost:2000/api/data')  
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

  
  const styles = {
    container: {
      textAlign: 'center',
      padding: '0px',
      width: '100%',
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
      boxSizing: 'border-box',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    headerText: { fontSize: '22px', margin: 0 },
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
      backgroundColor: '#ffffff',  
      border: '2px solid #FF7518', 
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    forecastHeader: {
      fontSize: '20px',
      marginBottom: '10px',
      color: '#003366',  
    },
    forecastList: {
      listStyleType: 'none',
      padding: 0,
    },
    forecastItem: {
      fontSize: '16px',
      marginBottom: '5px',
      color: '#003366',  
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
              <h1 style={styles.headerText}>Polio Cases by Province (by Year)</h1>
            </div>
      
     

      {/* Forecast Section */}
      <div style={styles.forecastContainer}>
        <h3 style={styles.forecastHeader}>Estimated Polio Cases for 2025</h3>
        {forecastData ? (
          <ul style={styles.forecastList}>
            {Object.keys(forecastData).map(province => (
              <li style={styles.forecastItem} key={province}>
                {province}: {forecastData[province] === "Not enough data" ? forecastData[province] : `${forecastData[province]} cases`}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading forecast data...</p>
        )}
      </div>
    </div>
  );
};

export default PolioCasesChart;
