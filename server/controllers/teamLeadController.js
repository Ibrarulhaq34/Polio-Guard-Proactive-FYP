
const TeamLead = require('../Models/TeamLead');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.teamLeadSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingTeamLead = await TeamLead.findOne({ email });
    if (existingTeamLead) {
      return res.status(400).json({ message: 'Team Lead already exists' });
    }

    const newTeamLead = new TeamLead({ name, email, password });
    await newTeamLead.save();

    res.status(201).json({ message: 'Team Lead registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.teamLeadLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teamLead = await TeamLead.findOne({ email });
    if (!teamLead) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, teamLead.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: teamLead._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, teamLeadId: teamLead._id ,name: teamLead.name});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
