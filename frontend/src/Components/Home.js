import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Map1 from './Map1';

export default function Home() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [allMaps, setAllMaps] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const addName = async () => {
        const place = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${process.env.REACT_APP_GOOGLEAPI}`)
            .then(resp => resp.json())
            .then(data => data);

        if (place && place.results.length > 0) {
            setLatitude(place.results[0].geometry.location.lat);
            setLongitude(place.results[0].geometry.location.lng);

            if (latitude && longitude) {
                await axios.post('http://localhost:2000/api/addName', { name: name, latitude: latitude, longitude: longitude })
                    .then(response => {
                        if (response) {
                            const message = response.data.msg;
                            history.push(`/map/${name}`);
                        }
                    })
                    .catch(err => console.log(err));
            } else {
                console.log("Something went wrong 1");
            }
        } else {
            alert("Entered place is not valid! Try again");
        }
    };

    const getAllMaps = () => {
        axios.get('http://localhost:2000/api/getAllMaps')
            .then(response => {
                if (response) {
                    setAllMaps(response.data);
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getAllMaps();
    }, []);

    return (
        <div style={styles.container}>
            {/* Header Section */}
            <div style={styles.header}>
              <h1 style={styles.headerText}>Geofences</h1>
            </div>
            
            <h2 style={styles.title}></h2>

            {/* Input Section */}
            <div style={styles.inputSection}>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="searchtext"
                    style={styles.input}
                />
                <Button
                   
                    style={{ backgroundColor: 'rgb(0, 51, 102)' }}
                    disabled={name === ""}
                    onClick={addName}
                >
                    Add
                </Button>
            </div>

            <h3 style={styles.subtitle}>Map List</h3>

            {/* Map List Section */}
            <div style={styles.tableContainer}>
                <Table striped bordered hover className='w-100' >
                    <thead >
                        <tr  >
                            <th style={styles.tableHeader}>ID</th>
                            <th style={styles.tableHeader}>PLACE</th>
                            <th style={styles.tableHeader}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allMaps.map((map, index) => <Map1 key={map._id} id={map._id} name={map.name} index={index} map={map} />)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}


const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
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
    
    },
    headerText: { fontSize: '22px', margin: 0 },
    title: {
        margin: '20px 0',
    },
    inputSection: {
        
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        width: '300px',
        marginRight: '10px',
    },
   
    subtitle: {
        
        marginBottom: '20px',
    },
    tableContainer: {
        
        width: '100%', 
        maxWidth: '1200px', 
        margin: '0 auto', 
    },
    tableHeader: {
        backgroundColor: 'rgb(0, 51, 102)', 
        color: 'white',
        padding: '10px',
        border: '1px solid #ddd',
      },
};
