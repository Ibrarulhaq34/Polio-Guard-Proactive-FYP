
const Worker = require('../Models/Worker');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.workerSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingWorker = await Worker.findOne({ email });
    if (existingWorker) {
      return res.status(400).json({ message: 'Worker already exists' });
    }

    const newWorker = new Worker({ name, email, password });
    await newWorker.save();

    res.status(201).json({ message: 'Worker registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.workerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const worker = await Worker.findOne({ email });
    if (!worker) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: worker._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, workerId: worker._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
