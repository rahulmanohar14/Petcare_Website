const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  updateStatus,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');

// Public (user) can book
router.post('/', createAppointment);

// Vet can view & approve
router.get('/', getAllAppointments);
router.put('/:id', updateStatus);
router.put('/update/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;