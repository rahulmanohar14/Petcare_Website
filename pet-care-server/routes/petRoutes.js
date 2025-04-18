const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// ✅ GET all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    console.error('❌ Error in GET /api/pets:', err);
    res.status(500).json({
      message: 'Server error while fetching pets',
      error: err.message
    });
  }
});

// ✅ POST add new pet using Cloudinary URL
router.post('/', async (req, res) => {
  const { name, breed, age, description, image } = req.body;

  console.log('📨 Incoming new pet:', { name, breed, age, description, image });

  try {
    if (!image) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const pet = new Pet({
      name,
      breed,
      age,
      description,
      image // already a URL from Cloudinary
    });

    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    console.error('❌ Error in POST /api/pets:', err);
    res.status(500).json({
      message: 'Server error while adding pet',
      error: err.message || 'Unknown error'
    });
  }
});

module.exports = router;