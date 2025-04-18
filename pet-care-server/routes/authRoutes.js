const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const User = require('../models/User');

// 🔐 Auth Routes
router.post('/signup', signup);
router.post('/login', login);

// 👤 Get All Users (for Admin Dashboard)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 }); // Exclude password
    res.status(200).json(users);
  } catch (err) {
    console.error('❌ Failed to fetch users:', err);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

module.exports = router;