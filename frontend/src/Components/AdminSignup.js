import React, { useState } from 'react';
import API from '../api/api';

const AdminSignup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/admin/signup', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error signing up.');
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
    backgroundColor: 'rgb(0, 51, 102)', 
    width: '100%', 
    padding: '20px 0',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '150px', 
    width: '300px', 
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0', 
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    backgroundColor: 'rgb(0, 51, 102)', 
    color: 'white',
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
        <h2>Admin Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
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
            Sign Up
          </button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AdminSignup;
