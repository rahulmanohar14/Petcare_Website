const mongoose = require('mongoose');

const groomingAppointmentSchema = new mongoose.Schema({
  userEmail: String,
  petName: String,
  date: String,
  serviceType: String,
  status: {
    type: String,
    default: 'Pending' // or 'Completed'
  }
});

module.exports = mongoose.model('GroomingAppointment', groomingAppointmentSchema);