import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Supplier.css'; // Import the CSS file

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplierId, setEditingSupplierId] = useState(null);
  const [form, setForm] = useState({ name: '', contactInfo: '', performance: '' });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const result = await axios.get('http://localhost:2000/api/supplier');
    setSuppliers(result.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:2000/api/supplier/${id}`);
    fetchSuppliers();
  };

  const handleEdit = (supplier) => {
    setEditingSupplierId(supplier._id);
    setForm({
      name: supplier.name,
      contactInfo: supplier.contactInfo,
      performance: supplier.performance,
    });
  };

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:2000/api/supplier/${id}`, form);
    setEditingSupplierId(null);
    setForm({ name: '', contactInfo: '', performance: '' });
    fetchSuppliers();
  };

  const handleAdd = async () => {
    await axios.post('http://localhost:2000/api/supplier', form);
    setForm({ name: '', contactInfo: '', performance: '' });
    fetchSuppliers();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Suppliers</h1>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Contact Info</th>
            <th style={styles.tableHeader}>Performance</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <tr key={supplier._id} style={styles.tableRow}>
                <td>
                  {editingSupplierId === supplier._id ? (
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  ) : (
                    supplier.name
                  )}
                </td>
                <td>
                  {editingSupplierId === supplier._id ? (
                    <input
                      type="text"
                      name="contactInfo"
                      value={form.contactInfo}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  ) : (
                    supplier.contactInfo
                  )}
                </td>
                <td>
                  {editingSupplierId === supplier._id ? (
                    <input
                      type="text"
                      name="performance"
                      value={form.performance}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  ) : (
                    supplier.performance
                  )}
                </td>
                <td>
                  {editingSupplierId === supplier._id ? (
                    <button
                      style={styles.button}
                      onClick={() => handleUpdate(supplier._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        style={styles.button}
                        onClick={() => handleEdit(supplier)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.button}
                        onClick={() => handleDelete(supplier._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={styles.noSuppliers}>
                No suppliers available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h3 style={styles.subHeader}>Add New Supplier</h3>
      <div style={styles.formContainer}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          style={styles.input}
        />
        <input
          type="text"
          name="contactInfo"
          value={form.contactInfo}
          onChange={handleChange}
          placeholder="Contact Info"
          style={styles.input}
        />
        <input
          type="text"
          name="performance"
          value={form.performance}
          onChange={handleChange}
          placeholder="Performance"
          style={styles.input}
        />
        <button style={styles.addButton} onClick={handleAdd}>
          Add Supplier
        </button>
      </div>
    </div>
  );
};

export default Supplier;

// Inline styles
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
  table: {
    width: '100%',
    marginTop: '20px',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: 'rgb(0, 51, 102)',
    color: 'white',
    padding: '10px',
    border: '1px solid #ddd',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  button: {
    backgroundColor: 'rgb(0, 51, 102)',
    color: 'white',
    margin: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  addButton: {
    backgroundColor: 'rgb(0, 51, 102)',
    color: 'white',
    padding: '8px 12px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    width: '300px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  noSuppliers: {
    textAlign: 'center',
    padding: '10px',
    color: '#888',
  },
  subHeader: {
    marginTop: '30px',
    fontSize: '20px',
    textAlign: 'center',
    color: '#333',
  },
};
