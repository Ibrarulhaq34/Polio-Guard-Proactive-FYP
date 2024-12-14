import React, { useState } from 'react';
import axios from 'axios';

const ClientAdversePost = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage('');
    setError('');

    const postData = {
      name,
      content,
    };

    try {
      const response = await axios.post('http://localhost:2000/api/clientPost/clientPost', postData);
      setResponseMessage('Post submitted successfully!');
      setName('');
      setContent('');
    } catch (err) {
      setError('Error submitting post. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Client Adverse Posts</h1>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="content" style={styles.label}>
          Have you experienced any adverse effects after receiving the polio vaccination?
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="4"
            placeholder=" Enter Adverse Affects"
            style={styles.textarea}
          ></textarea>
        </div>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
      {responseMessage && <p style={styles.success}>{responseMessage}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

// Styles
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
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
    textAlign: 'left', 
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    backgroundColor: 'rgb(0, 51, 102)',
    color: 'white',
    padding: '6px 10px',  
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px', 
  },
  success: {
    color: 'green',
    marginTop: '10px',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default ClientAdversePost;
