import React from 'react';
import { useHistory } from 'react-router-dom';

const Home1 = () => {
  const history = useHistory();

  const containerStyle = {
    backgroundColor: 'white', 
    height: '100vh', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };

  const headerStyle = {
    backgroundColor: 'rgb(0, 51, 102)', 
    width: '100%', 
    padding: '20px 0', 
    position: 'absolute',
    top: 0,
    left: 0,
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'white', 
  };

  const contentStyle = {
    marginTop: '150px', 
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center', 
  };

  const loginSignupTextStyle = {
    fontSize: '22px',
    marginBottom: '20px', 
  };

  const buttonStyle = {
    backgroundColor: 'rgb(0, 51, 102)', 
    color: 'white',
    padding: '10px 20px',
    border: '1px solid white', 
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
    width: '200px', 
    height: '50px', 
    textAlign: 'center', 
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        Welcome to Polio Guard Proactive
      </div>

      <div style={contentStyle}>
        <div style={loginSignupTextStyle}>Choose Your Role to Proceed</div>

       
        <button style={buttonStyle} onClick={() => history.push('/admin/login')}>Admin </button>

      
        <button style={buttonStyle} onClick={() => history.push('/teamlead/login')}>TeamLead</button>

       
        <button style={buttonStyle} onClick={() => history.push('/client/login')}>Client </button>

      
        <button style={buttonStyle} onClick={() => history.push('/worker/login')}>Worker </button>
      </div>
    </div>
  );
};

export default Home1;
