import React, { useState } from 'react';
import API from '../api/api';
import { useHistory } from 'react-router-dom';

const WorkerLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/worker/login', formData);
      localStorage.setItem('token', response.data.token);
      history.push('/worker');
    } catch (error) {
      setMessage('Invalid email or password.');
    }
  };

  const containerStyle = {
    backgroundColor: 'white',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const headerStyle = {
    backgroundColor: 'rgb(0, 51, 102)', // Dark blue background
    width: '100%', // Full width
    padding: '20px 0',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white', // Header text in white
    position: 'absolute',
    top: 0,
    left: 0,
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '150px', // Space from header
    width: '300px', // Set width of form
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0', // Space between fields
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    backgroundColor: 'rgb(0, 51, 102)', // Dark blue button
    color: 'white', // Button text in white
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    margin: '10px 0',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>Polio Guard Proactive</div>

      <div style={formStyle}>
        <h2>Worker Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
        <button
          style={buttonStyle}
          onClick={() => history.push('signup')}
        >
          Worker Signup
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default WorkerLogin;
