
const Client = require('../Models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.clientSignup = async (req, res) => {
  const { name, email, password, address, location } = req.body;

  try {
    const existingclient = await Client.findOne({ email });
    if (existingclient) {
      return res.status(400).json({ message: 'Client already exists' });
    }

    const newclient = new Client({
      name,
      email,
      password,
      address,
      location
    });

    await newclient.save();
    res.status(201).json({ message: 'Client registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



exports.clientLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const client = await Client.findOne({ email });
   
    if (!client) {
        
      return res.status(400).json({ message: 'Invalid email or password' });
    }

   

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, clientId: client._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error ', error });
  }
};
