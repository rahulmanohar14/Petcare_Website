const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
  petName: String,
  userEmail: String,
  name: String,
  contact: String,
  message: String,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('AdoptionRequest', adoptionRequestSchema);