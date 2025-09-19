const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/admin-login', authController.adminLogin);
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password', authController.resetPassword);
router.get('/logout', authController.logout);


module.exports = router;
