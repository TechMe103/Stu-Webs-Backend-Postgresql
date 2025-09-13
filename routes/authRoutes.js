const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Example protected route
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: `Hello student ${req.student.stuID}` });
});

module.exports = router;
