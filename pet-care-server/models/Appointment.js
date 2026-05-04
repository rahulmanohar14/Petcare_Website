const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  petName: String,
  date: String,
  concern: String,
  userEmail: String,
  status: {
    type: String,
    default: 'Pending' // or 'Approved'
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);