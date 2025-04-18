const express = require('express');
const router = express.Router();
const AdoptionRequest = require('../models/AdoptionRequest');

// ✅ GET all adoption requests
router.get('/', async (req, res) => {
  try {
    const requests = await AdoptionRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch adoption requests', error: err.message });
  }
});

// ✅ POST a new adoption request
router.post('/', async (req, res) => {
  const { petId, petName, userEmail, name, contact, message } = req.body;

  try {
    const request = new AdoptionRequest({
      petId,
      petName,
      userEmail,
      name,
      contact,
      message,
      status: 'Pending',
      createdAt: new Date()
    });

    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create request', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await AdoptionRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ PUT update adoption request status
router.put('/:id', async (req, res) => {
  try {
    const updated = await AdoptionRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update request', error: err.message });
  }
});

module.exports = router;