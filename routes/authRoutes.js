const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.patch('/update-passsword',authController.updatePassword);
module.exports = router;
