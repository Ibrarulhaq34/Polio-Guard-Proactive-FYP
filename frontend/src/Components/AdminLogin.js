import React, { useState } from 'react';
import API from '../api/api';
import { useHistory } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/admin/login', formData);
      localStorage.setItem('token', response.data.token);
      history.push('/admin');
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
    width: '100%',
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
    backgroundColor: 'rgb(0, 51, 102)', // Dark blue color
    color: 'white', // Button text in white
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    margin: '10px 0',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>Polio Guard Proactive</div>

      <div style={formStyle}>
        <h2>Admin Login</h2>
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
          Admin Signup
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AdminLogin;
