import React from 'react';
import { useHistory } from 'react-router-dom';

const PolioHeatMap = () => {
  const history = useHistory(); 

  const handleBack = () => {
    history.push('/PolioCasesChart'); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
              <h1 style={styles.headerText}>Polio Cases Heat Map</h1>
            </div>
      <iframe
        src="http://localhost:2000/map"
        style={{ width: '100%', height: '600px', border: 'none' }}
        title="Polio Heatmap"
      />
      
    </div>
  );
};

export default PolioHeatMap;


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
};
