const express = require('express');
const router = express.Router();
const GroomingAppointment = require('../models/GroomingAppointment');

// ✅ Get all grooming appointments (for Groomer Dashboard)
// GET grooming appointments
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;

    const query = email ? { userEmail: email } : {}; // filter only if query param exists
    const appointments = await GroomingAppointment.find(query);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch grooming appointments' });
  }
});

// ✅ Post a new appointment (from User side)
router.post('/', async (req, res) => {
  const { userEmail, petName, date, serviceType } = req.body;

  try {
    const newAppointment = new GroomingAppointment({
      userEmail,
      petName,
      date,
      serviceType,
      status: 'Pending'
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error('Failed to save grooming appointment:', err);
    res.status(500).json({ message: 'Failed to book appointment' });
  }
});

// ✅ Update appointment status (e.g., to Completed)
router.put('/:id', async (req, res) => {
  try {
    const updated = await GroomingAppointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status || 'Completed' },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error('Failed to update appointment:', err);
    res.status(400).json({ message: 'Update failed' });
  }
});

module.exports = router;