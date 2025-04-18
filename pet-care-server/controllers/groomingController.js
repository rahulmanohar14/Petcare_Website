const Grooming = require('../models/GroomingAppointment');

exports.createAppointment = async (req, res) => {
  const { userEmail, petName, date, serviceType } = req.body;

  try {
    const newApp = new Grooming({ userEmail, petName, date, serviceType });
    await newApp.save();
    res.status(201).json({ message: 'Grooming appointment booked' });
  } catch (err) {
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const { email } = req.query;
    const apps = await Grooming.find({ userEmail: email });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load', error: err.message });
  }
};

exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { petName, date, serviceType, status } = req.body;

  try {
    await Grooming.findByIdAndUpdate(id, { petName, date, serviceType, status });
    res.json({ message: 'Appointment updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    await Grooming.findByIdAndDelete(id);
    res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};