const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  const { petName, date, concern, userEmail } = req.body;

  try {
    const newApp = new Appointment({ petName, date, concern, userEmail });
    await newApp.save();
    res.status(201).json({ message: 'Appointment booked' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to book', error: err.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load', error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Appointment.findByIdAndUpdate(id, { status });
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { petName, date, concern } = req.body;

  try {
    await Appointment.findByIdAndUpdate(id, { petName, date, concern });
    res.json({ message: 'Appointment updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Cancel failed', error: err.message });
  }
};