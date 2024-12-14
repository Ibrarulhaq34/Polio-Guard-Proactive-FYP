import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [editMode, setEditMode] = useState(null); 
  const [editForm, setEditForm] = useState({}); 
  const [form, setForm] = useState({ name: '', quantity: '', expirationDate: '', supplier: '' });

  useEffect(() => {
    fetchInventories();
    fetchSuppliers();
  }, []);

  const fetchInventories = async () => {
    try {
      const result = await axios.get('http://localhost:2000/api/inventory');
      setInventories(result.data);
    } catch (error) {
      console.error('Error fetching inventories:', error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const result = await axios.get('http://localhost:2000/api/supplier');
      setSuppliers(result.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/inventory/${id}`);
      fetchInventories();
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
  };

  const enableEditMode = (inventory) => {
    setEditMode(inventory._id);
    setEditForm({ ...inventory });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:2000/api/inventory/${editMode}`, editForm);
      setEditMode(null);
      fetchInventories();
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  const handleAdd = async () => {
    try {
      const dataToSend = { ...form, status: 'available' };
      await axios.post('http://localhost:2000/api/inventory', dataToSend);
      setForm({ name: '', quantity: '', expirationDate: '', supplier: '' });
      fetchInventories();
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isExpired = (expirationDate) => {
    const today = new Date().toISOString().split('T')[0];
    return expirationDate < today;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Inventories</h1>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Quantity</th>
            <th style={styles.tableHeader}>Status</th>
            <th style={styles.tableHeader}>Expiration Date</th>
            <th style={styles.tableHeader}>Supplier</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventories.length > 0 ? (
            inventories.map((inventory) => (
              <tr key={inventory._id} style={styles.tableRow}>
                <td style={styles.fixedCell}>
                  {editMode === inventory._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      style={styles.editInput}
                    />
                  ) : (
                    inventory.name
                  )}
                </td>
                <td style={styles.fixedCell}>
                  {editMode === inventory._id ? (
                    <input
                      type="number"
                      name="quantity"
                      value={editForm.quantity}
                      onChange={handleEditChange}
                      style={styles.editInput}
                    />
                  ) : (
                    inventory.quantity
                  )}
                </td>
                <td style={styles.fixedCell}>{inventory.status}</td>
                <td style={styles.fixedCell}>
                  {editMode === inventory._id ? (
                    <input
                      type="date"
                      name="expirationDate"
                      value={editForm.expirationDate}
                      onChange={handleEditChange}
                      style={styles.editInput}
                    />
                  ) : (
                    inventory.expirationDate
                  )}
                  {isExpired(inventory.expirationDate) && (
                    <span style={{ color: 'red', marginLeft: '10px' }}>Expired</span>
                  )}
                </td>
                <td style={styles.fixedCell}>
                  {editMode === inventory._id ? (
                    <select
                      name="supplier"
                      value={editForm.supplier}
                      onChange={handleEditChange}
                      style={styles.editInput}
                    >
                      <option value="">Select Supplier</option>
                      {suppliers.map((supplier) => (
                        <option key={supplier._id} value={supplier.name}>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    inventory.supplier
                  )}
                </td>
                <td style={styles.fixedCell}>
                  {editMode === inventory._id ? (
                    <>
                      <button style={styles.button} onClick={handleUpdate}>
                        Save
                      </button>
                      <button style={styles.button} onClick={() => setEditMode(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button style={styles.button} onClick={() => enableEditMode(inventory)}>
                        Edit
                      </button>
                      <button style={styles.button} onClick={() => handleDelete(inventory._id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={styles.noInventories}>No inventories available</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3 style={styles.formHeader}>Add New Inventory</h3>
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
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          style={styles.input}
        />
        <input
          type="date"
          name="expirationDate"
          value={form.expirationDate}
          onChange={handleChange}
          style={styles.input}
        />
        <select
          name="supplier"
          value={form.supplier}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier.name}>
              {supplier.name}
            </option>
          ))}
        </select>
        
      </div>
      <button style={styles.addButton} onClick={handleAdd}>Add Inventory</button>
    </div>
  );
};

export default Inventory;

const styles = {
  container: { padding: '0px', textAlign: 'center' },
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
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
  tableHeader: { backgroundColor: '#003366', color: 'white', padding: '10px', textAlign: 'left' },
  tableRow: { borderBottom: '1px solid #ddd' },
  fixedCell: { padding: '10px', textAlign: 'center', width: '150px' },
  editInput: { width: '100%', padding: '5px' },
  button: { margin: '5px', padding: '5px 10px', backgroundColor: '#003366', color: 'white' },
  addButton: { marginTop: '10px', padding: '10px', backgroundColor: '#003366', color: 'white' },
  formContainer: { marginTop: '20px' },
};
